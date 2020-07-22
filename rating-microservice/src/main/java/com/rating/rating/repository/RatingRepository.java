package com.rating.rating.repository;

import com.rating.rating.model.Rating;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends MongoRepository<Rating, String> {
    List<Rating> findRatingsByFilmId(String filmId);
    Optional<Rating> findByFilmIdAndUsername(String filmId, String username);
}
