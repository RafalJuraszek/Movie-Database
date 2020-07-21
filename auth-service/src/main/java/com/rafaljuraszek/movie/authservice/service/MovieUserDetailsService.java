package com.rafaljuraszek.movie.authservice.service;

import com.rafaljuraszek.movie.authservice.model.MovieUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MovieUserDetailsService implements UserDetailsService {
    private UserService userService;

    public MovieUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        System.out.println("Movie user service");

        return userService
                .findByUsername(username)
                .map(MovieUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
    }
}