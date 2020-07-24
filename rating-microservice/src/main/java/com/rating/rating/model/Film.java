package com.rating.rating.model;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class Film {

    private String id;

    private String title;

    private String description;

    private String imageUrl;

    private String direction;

    private String type;

    private String production;

    private int year;
}
