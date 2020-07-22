package com.rating.rating.service;

import com.rating.rating.model.Rating;
import com.rating.rating.payload.RatingRequest;
import com.rating.rating.repository.RatingRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public List<Rating> findAllRatings() {
        return ratingRepository.findAll();
    }

    public List<Rating> findRatingsByFilmId(String filmId) {
        return ratingRepository.findRatingsByFilmId(filmId);
    }

    public Optional<Rating> finRatingByFilmIdAndUsername(String filmId, String username) {
        return ratingRepository.findByFilmIdAndUsername(filmId, username);
    }

    public Rating createRating(RatingRequest ratingRequest) {

        log.info("creating rating {}", ratingRequest);

        Rating newRating = new Rating(ratingRequest.getFilmId(), ratingRequest.getStars());
        newRating.setDescription(ratingRequest.getDescription());
        newRating = ratingRepository.save(newRating);

        log.info("rating {} is saved successfully for user {}",
                newRating.getId(), newRating.getUsername());


        return newRating;
    }
}
