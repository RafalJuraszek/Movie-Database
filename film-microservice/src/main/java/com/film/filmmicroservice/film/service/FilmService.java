package com.film.filmmicroservice.film.service;

import com.film.filmmicroservice.film.exception.FilmNotFoundException;
import com.film.filmmicroservice.film.model.Film;
import com.film.filmmicroservice.film.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FilmService {

    @Autowired
    private FilmRepository filmRepository;

    public List<Film> findAllFilms() {
        return filmRepository.findAll();
    }

    public Film findFilmById(String filmId) {
        return filmRepository.findById(filmId).orElseThrow(() -> new FilmNotFoundException("Film not found. ID: " + filmId));
    }

    public Film createFilm(Film film) {
        return filmRepository.save(film);
    }
}
