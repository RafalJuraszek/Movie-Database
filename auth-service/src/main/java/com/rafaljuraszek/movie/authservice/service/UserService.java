package com.rafaljuraszek.movie.authservice.service;

import com.rafaljuraszek.movie.authservice.exception.EmailAlreadyExistsException;
import com.rafaljuraszek.movie.authservice.exception.ResourceNotFoundException;
import com.rafaljuraszek.movie.authservice.exception.UsernameAlreadyExistsException;
import com.rafaljuraszek.movie.authservice.model.Role;
import com.rafaljuraszek.movie.authservice.model.User;
import com.rafaljuraszek.movie.authservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Slf4j
public class UserService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;

    }

    public List<User> findAll() {
        log.info("retrieving all users");
        return userRepository.findAll();
    }

    public Optional<User> findByUsername(String username) {
        log.info("retrieving user {}", username);
        return userRepository.findByUsername(username);
    }

    public List<User> findByUsernameIn(List<String> usernames) {
        return userRepository.findByUsernameIn(usernames);
    }

    public User registerUser(User user) {

        log.info("registering user {}", user.getUsername());

        if(userRepository.existsByUsername(user.getUsername())) {
            log.warn("username {} already exists.", user.getUsername());

            throw new UsernameAlreadyExistsException(
                    String.format("username %s already exists", user.getUsername()));
        }

        if(userRepository.existsByEmail(user.getEmail())) {
            log.warn("email {} already exists.", user.getEmail());

            throw new EmailAlreadyExistsException(
                    String.format("email %s already exists", user.getEmail()));
        }
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(new HashSet<Role>() {{
            add(Role.USER);
        }});

        User savedUser = userRepository.save(user);

        return savedUser;

    }

    @Transactional
    public User createAndGetUser(String email, String username) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent()) {
            return user.get();
        }
        else {
            User newUser = User.builder().email(email).username(username).roles(new HashSet<Role>() {{
                add(Role.USER);
            }}).password("ala").build();
            userRepository.save(newUser);
            return newUser;
        }
    }

    public User updateProfilePicture(String uri, String id) {
        log.info("update profile picture {} for user {}", uri, id);

        return userRepository
                .findById(id)
                .map(user -> {
                    String oldProfilePic = user.getUserProfile().getProfilePictureUrl();
                    user.getUserProfile().setProfilePictureUrl(uri);
                    User savedUser = userRepository.save(user);


                    return savedUser;
                })
                .orElseThrow(() ->
                        new ResourceNotFoundException(String.format("user id %s not found", id)));
    }
}
