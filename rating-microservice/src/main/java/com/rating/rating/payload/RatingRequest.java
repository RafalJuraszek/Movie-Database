package com.rating.rating.payload;


import lombok.Data;

@Data
public class RatingRequest {

    private int stars;
    private String description;
    private String filmId;
}
