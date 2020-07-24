package com.rating.rating.client;


import com.rating.rating.model.Film;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(serviceId = "FILM-SERVICE")
public interface FilmClient {

    @RequestMapping(method = RequestMethod.POST, value="/films/in")
    ResponseEntity<List<Film>> findFilmsByIdIn(
            @RequestHeader("Authorization") String token,
            @RequestBody List<String> ids
    );
}
