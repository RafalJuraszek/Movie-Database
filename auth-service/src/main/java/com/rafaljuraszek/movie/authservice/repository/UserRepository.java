package com.rafaljuraszek.movie.authservice.repository;


import com.rafaljuraszek.movie.authservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    List<User> findByUsernameIn(List<String> usernames);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
