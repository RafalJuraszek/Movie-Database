package com.film.filmmicroservice.film.controller;


import com.film.filmmicroservice.film.service.FilmService;
import com.film.filmmicroservice.film.model.Film;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.Response;
import java.util.List;

@RestController
@RequestMapping("/films")
public class FilmController {

    @Autowired
    private FilmService filmService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Film> findAllFilms() {
        return filmService.findAllFilms();
    }

    @GetMapping("/{filmId}")
    public Film findFilm(@PathVariable String filmId) {
        return filmService.findFilmById(filmId);
    }

    @PostMapping
    public Film createFilm(@RequestBody Film film) {
        return filmService.createFilm(film);
    }

    @PostMapping("/in")
    public ResponseEntity<List<Film>> getFilmsByIds(@RequestBody List<String> ids) {
        return ResponseEntity.ok(filmService.findByIdIn(ids));
    }



}
