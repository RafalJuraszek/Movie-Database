package com.rating.rating.controller;

import com.rating.rating.exception.RatingNotFoundException;
import com.rating.rating.model.Rating;
import com.rating.rating.payload.RatingRequest;
import com.rating.rating.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @GetMapping
    public List<Rating> findRatingsFilmId(@RequestParam(required = false) Optional<String> id) {

        return id.map(ratingService::findRatingsByFilmId)
                .orElseGet(ratingService::findAllRatings);
    }

    @GetMapping("/rating")
    public Rating findRatingByFilmIdAndUsername(@RequestParam String id, @AuthenticationPrincipal Authentication auth) {
        return ratingService.finRatingByFilmIdAndUsername(id, auth.getName()).map(rating -> rating).orElseThrow(
                () -> new RatingNotFoundException("Rating not found")
        );
    }

    @PostMapping
    public Rating createRating(@RequestBody RatingRequest ratingRequest) {

        return ratingService.createRating(ratingRequest);
    }
}
