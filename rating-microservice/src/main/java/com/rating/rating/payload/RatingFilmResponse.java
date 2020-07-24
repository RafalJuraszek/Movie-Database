package com.rating.rating.payload;

import com.rating.rating.model.Film;
import com.rating.rating.model.Rating;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RatingFilmResponse {

    private Film film;
    private Rating rating;
}
