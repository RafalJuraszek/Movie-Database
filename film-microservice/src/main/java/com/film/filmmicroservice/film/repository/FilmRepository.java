package com.film.filmmicroservice.film.repository;

import com.film.filmmicroservice.film.model.Film;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface FilmRepository extends MongoRepository<Film, String> {
}
