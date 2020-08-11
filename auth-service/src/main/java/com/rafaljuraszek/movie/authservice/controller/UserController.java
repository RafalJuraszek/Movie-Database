package com.rafaljuraszek.movie.authservice.controller;

import com.rafaljuraszek.movie.authservice.exception.BadRequestException;
import com.rafaljuraszek.movie.authservice.exception.EmailAlreadyExistsException;
import com.rafaljuraszek.movie.authservice.exception.ResourceNotFoundException;
import com.rafaljuraszek.movie.authservice.exception.UsernameAlreadyExistsException;
import com.rafaljuraszek.movie.authservice.model.MovieUserDetails;
import com.rafaljuraszek.movie.authservice.model.Profile;
import com.rafaljuraszek.movie.authservice.model.User;
import com.rafaljuraszek.movie.authservice.payload.JwtAuthenticationResponse;
import com.rafaljuraszek.movie.authservice.payload.LoginRequest;
import com.rafaljuraszek.movie.authservice.payload.SignUpRequest;
import com.rafaljuraszek.movie.authservice.payload.UserInfo;
import com.rafaljuraszek.movie.authservice.service.JwtTokenProvider;
import com.rafaljuraszek.movie.authservice.service.UserService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
public class UserController {


    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        System.out.println("LOG");

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }


    @PostMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createUser(@Valid @RequestBody SignUpRequest payload) {
        log.info("creating user {}", payload.getUsername());

        User user = User
                .builder()
                .username(payload.getUsername())
                .email(payload.getEmail())
                .password(payload.getPassword())
                .userProfile(Profile
                        .builder()
                        .displayName(payload.getName())
                        .build())
                .build();

        try {
            userService.registerUser(user);
        } catch (UsernameAlreadyExistsException | EmailAlreadyExistsException e) {
            throw new BadRequestException(e.getMessage());
        }

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(user.getUsername()).toUri();

        return ResponseEntity
                .created(location)
                .build();
    }


    @GetMapping(value = "/users/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findUser(@PathVariable("username") String username) {
        log.info("retrieving user {}", username);

        return  userService
                .findByUsername(username)
                .map(user -> ResponseEntity.ok(user))
                .orElseThrow(() -> new ResourceNotFoundException(username));
    }

    @GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findAll() {
        log.info("retrieving all users");

        return ResponseEntity
                .ok(userService.findAll());
    }



    @GetMapping(value = "/users/me", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public UserInfo getCurrentUser(@AuthenticationPrincipal MovieUserDetails userDetails, @AuthenticationPrincipal Jwt jwt) {

        if(userDetails==null) {
            System.out.println(jwt.getClaims());
            User user = userService.createAndGetUser(jwt.getClaim("email"), jwt.getClaim("given_name"), jwt.getClaim("name"));
            return UserInfo.builder().id(user.getId()).username(user.getUsername()).name(user.getUserProfile().getDisplayName()).build();
        }
        else {
            return UserInfo
                    .builder()
                    .id(userDetails.getId())
                    .username(userDetails.getUsername())
                    .name(userDetails.getUserProfile().getDisplayName())
                    .profilePicture(userDetails.getUserProfile().getProfilePictureUrl())
                    .build();
        }
    }

    @GetMapping(value = "/users/summary/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserSummary(@PathVariable("username") String username) {
        log.info("retrieving user {}", username);

        return  userService
                .findByUsername(username)
                .map(user -> ResponseEntity.ok(convertTo(user)))
                .orElseThrow(() -> new ResourceNotFoundException(username));
    }

    @PostMapping(value = "/users/summary/in", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserSummaries(@RequestBody List<String> usernames) {
        log.info("retrieving summaries for {} usernames", usernames.size());

        List<UserInfo> summaries =
                userService
                        .findByUsernameIn(usernames)
                        .stream()
                        .map(user -> convertTo(user))
                        .collect(Collectors.toList());

        return ResponseEntity.ok(summaries);

    }
	
	
	@GetMapping(value = "/users/summary", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUsers() {

        List<UserInfo> summaries =
                userService
                        .findAll()
                        .stream()
                        .map(user -> convertTo(user))
                        .collect(Collectors.toList());

        return ResponseEntity.ok(summaries);

    }

    private UserInfo convertTo(User user) {
        return UserInfo
                .builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getUserProfile().getDisplayName())
                .profilePicture(user.getUserProfile().getProfilePictureUrl())
                .build();
    }
}
