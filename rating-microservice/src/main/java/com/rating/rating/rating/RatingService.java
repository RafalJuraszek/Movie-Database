package com.rating.rating.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public List<Rating> findAllRatings() {
        return ratingRepository.findAll();
    }

    public List<Rating> findRatingsByFilmId(Long filmId) {
        return ratingRepository.findRatingsByFilmId(filmId);
    }


    @Transactional(propagation = Propagation.REQUIRED)
    public Rating createRating(Rating rating) {
        Rating newRating = new Rating();
        newRating.setFilmId(rating.getFilmId());
        newRating.setStars(rating.getStars());
        newRating.setDescription(rating.getDescription());
        Rating persisted = ratingRepository.save(newRating);
        return persisted;
    }
}
