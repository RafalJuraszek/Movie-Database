package com.film.filmmicroservice.film;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
public class FilmService {

    @Autowired
    private FilmRepository filmRepository;

    public List<Film> findAllFilms() {
        return filmRepository.findAll();
    }

    public Film findFilmById(Long filmId) {
        return filmRepository.findById(filmId).orElseThrow(() -> new FilmNotFoundException("Film not found. ID: " + filmId));
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Film createFilm(Film film) {
        final Film newFilm = new Film();
        newFilm.setDescription(film.getDescription());
        newFilm.setImageUrl(film.getImageUrl());
        newFilm.setTitle(film.getTitle());
        return filmRepository.save(newFilm);
    }
}
