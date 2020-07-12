package com.film.filmmicroservice.film;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FilmNotFoundException extends RuntimeException {

    FilmNotFoundException(String message) {
        super(message);
    }
}
