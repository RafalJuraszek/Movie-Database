package com.rating.rating.service;

import com.rating.rating.client.FilmClient;
import com.rating.rating.config.JwtConfig;
import com.rating.rating.model.Film;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class FilmService {

    @Autowired
    private FilmClient filmServiceClient;
    @Autowired private JwtConfig jwtConfig;

    public List<Film> findFilmsIn(String token, List<String> ids) {
        log.info("finding films for ids {}", ids);

        ResponseEntity<List<Film>> response =
                filmServiceClient.findFilmsByIdIn(jwtConfig.getPrefix() + token, ids);

        if(response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new RuntimeException(
                    String.format("unable to get posts for ids", ids));
        }
    }
}