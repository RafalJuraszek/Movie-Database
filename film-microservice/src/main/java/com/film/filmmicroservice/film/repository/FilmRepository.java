package com.film.filmmicroservice.film.repository;

import com.film.filmmicroservice.film.model.Film;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface FilmRepository extends MongoRepository<Film, String> {

    List<Film> findByIdIn(List<String> ids);
}
