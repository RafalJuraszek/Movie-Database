package com.rafaljuraszek.movie.graphservice.controller;


import com.rafaljuraszek.movie.graphservice.model.User;
import com.rafaljuraszek.movie.graphservice.payload.FollowRequest;
import com.rafaljuraszek.movie.graphservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users/followers")
    public ResponseEntity<?> follow(@RequestBody FollowRequest request) {

        log.info("received a follow request follow {} following {}",
                request.getFollower().getUsername(),
                request.getFollowing().getUsername());


        userService.follow(
                User.builder()
                        .userId(request.getFollower().getId())
                        .username(request.getFollower().getUsername())
                        .name(request.getFollower().getName())
                        .build(),

                User.builder()
                        .userId(request.getFollowing().getId())
                        .username(request.getFollowing().getUsername())
                        .name(request.getFollowing().getName())
                        .build()
        );

        String message = String.format("user %s is following user %s",
                request.getFollower().getUsername(),
                request.getFollowing().getUsername());

        log.info(message);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{username}/degree")
    public ResponseEntity<?> findNodeDegree(@PathVariable String username) {
        log.info("received request to get node degree for {}", username);

        return ResponseEntity.ok(userService.findNodeDegree(username));
    }

    @GetMapping("/users/{usernameA}/following/{usernameB}")
    public ResponseEntity<?> isFollwoing(@PathVariable String usernameA, @PathVariable String usernameB) {
        log.info("received request to check is user {} is following {}"
                , usernameA, usernameB);

        return ResponseEntity.ok(userService.isFollowing(usernameA, usernameB));
    }

    @GetMapping("/users/{username}/followers")
    public ResponseEntity<?> findFollowers(@PathVariable String username) {
        return ResponseEntity.ok(userService.findFollowers(username));
    }

    @GetMapping("/users/{username}/following")
    public ResponseEntity<?> findFollowing(@PathVariable String username) {
        return ResponseEntity.ok(userService.findFollowing(username));
    }
}
