package com.rating.rating.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @GetMapping
    public List<Rating> findRatingsByBookId(@RequestParam(required = false) Optional<Long> id, Authentication auth, @AuthenticationPrincipal Principal userInfo) {
        return id.map(ratingService::findRatingsByFilmId)
                .orElseGet(ratingService::findAllRatings);
    }

    @PostMapping
    public Rating createRating(@RequestBody Rating rating, @AuthenticationPrincipal Principal userInfo) {
        System.out.println(userInfo.getName());
        return ratingService.createRating(rating);
    }
}
