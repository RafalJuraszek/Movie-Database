package com.rating.rating.service;

import com.rating.rating.model.Film;
import com.rating.rating.model.Rating;
import com.rating.rating.payload.RatingFilmResponse;
import com.rating.rating.payload.RatingRequest;
import com.rating.rating.repository.RatingRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private FilmService filmService;
    @Autowired
    private AuthService authService;

    public List<Rating> findAllRatings() {
        return ratingRepository.findAll();
    }

    public List<Rating> findRatingsByFilmId(String filmId) {
        return ratingRepository.findRatingsByFilmId(filmId);
    }

    public Optional<Rating> finRatingByFilmIdAndUsername(String filmId, String username) {
        return ratingRepository.findByFilmIdAndUsername(filmId, username);
    }

    public List<RatingFilmResponse> findRatingsAndFilmsByUsername(String username) {
        List<Rating> ratings = ratingRepository.findRatingsByUsername(username);
        List<String> filmIds = ratings.stream().map(rating -> rating.getFilmId()).collect(Collectors.toList());

        String token = authService.getAccessToken();
        List<Film> films = filmService.findFilmsIn(token, filmIds);

        return ratings.stream().map(rating -> {
            Film ratedFilm = films.stream()
                    .filter(film -> film.getId().equals(rating.getFilmId()))
                    .findAny()
                    .orElse(null);
            return new RatingFilmResponse(ratedFilm, rating);
        }).collect(Collectors.toList());


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
