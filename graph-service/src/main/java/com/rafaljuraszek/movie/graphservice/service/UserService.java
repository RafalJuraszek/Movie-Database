package com.rafaljuraszek.movie.graphservice.service;

import com.rafaljuraszek.movie.graphservice.model.Following;
import com.rafaljuraszek.movie.graphservice.model.NodeDegree;
import com.rafaljuraszek.movie.graphservice.model.User;
import com.rafaljuraszek.movie.graphservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Service
@Slf4j
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {

        if(userRepository.findByUsername(user.getUsername()).isPresent()) {
            String message = String.format("username %s already exists", user.getUsername());
            log.warn(message);

            throw new RuntimeException(message);
        }

        User saveUser = userRepository.save(user);

        log.info("user {} save successfully", saveUser.getUsername());

        return saveUser;
    }

    @Transactional
    public User follow(User follower, User following) {
        log.info("user {} will follow {}",
                follower.getUsername(), following.getUsername());

        User savedFollower = userRepository
                .findByUserId(follower.getUserId())
                .orElseGet(() -> {
                    log.info("user {} not exists, creating it", follower.getUsername());
                    return this.addUser(follower);
                });

        User savedFollowing = userRepository
                .findByUserId(following.getUserId())
                .orElseGet(() -> {
                    log.info("user {} not exits, creating it", following.getUsername());
                    return this.addUser(following);
                });

        if(savedFollower.getFollowings() == null) {
            savedFollower.setFollowings(new HashSet<>());
        }

        savedFollower
                .getFollowings()
                .add(Following.builder()
                        .startNode(savedFollower)
                        .endNode(savedFollowing)
                        .build());

        return userRepository.save(savedFollower);
    }


    public boolean isFollowing(String userA, String userB) {
        return userRepository.isFollowing(userA, userB);
    }

    public NodeDegree findNodeDegree(String username) {
        log.info("fetching degree for user {}", username);

        long out = userRepository.findOutDegree(username);
        long in = userRepository.findInDegree(username);

        log.info("found {} outdegree and {} indegree for user {}", out, in, username);

        return NodeDegree
                .builder()
                .outDegree(out)
                .inDegree(in)
                .build();
    }

    public List<User> findFollowers(String username) {
        List<User> followers = userRepository.findFollowers(username);
        log.info("found {} followers for user {}", followers.size(), username);

        return followers;
    }


    public List<User> findFollowing(String username) {
        List<User> following = userRepository.findFollowing(username);
        log.info("found {} that user {} is following", following.size(), username);

        return following;
    }

}
