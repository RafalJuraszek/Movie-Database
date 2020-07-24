package com.rating.rating.controller;

import com.rating.rating.config.UserInfo;
import com.rating.rating.exception.RatingNotFoundException;
import com.rating.rating.model.Rating;
import com.rating.rating.payload.RatingFilmResponse;
import com.rating.rating.payload.RatingRequest;
import com.rating.rating.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private UserInfo userInfo;

    @GetMapping
    public List<Rating> findRatingsFilmId(@RequestParam(required = false) Optional<String> id) {

        return id.map(ratingService::findRatingsByFilmId)
                .orElseGet(ratingService::findAllRatings);
    }

    @GetMapping("/{username}")
    public Rating findRatingByFilmIdAndUsername(@RequestParam String id, @PathVariable String username) {
        return ratingService.finRatingByFilmIdAndUsername(id, username).map(rating -> rating).orElseThrow(
                () -> new RatingNotFoundException("Rating not found")
        );
    }

    @GetMapping("/{username}/in")
    public ResponseEntity<List<RatingFilmResponse>> findRatingsAndFilmsByUsername(@PathVariable String username) {

        return ResponseEntity.status(200).body(ratingService.findRatingsAndFilmsByUsername(username));
    }



    @PostMapping
    public Rating createRating(@RequestBody RatingRequest ratingRequest, @AuthenticationPrincipal Jwt auth) {

        if(auth ==null) {
            userInfo.setUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        }
        else {

            userInfo.setUsername(auth.getClaim("given_name"));
        }


        return ratingService.createRating(ratingRequest);
    }
}
