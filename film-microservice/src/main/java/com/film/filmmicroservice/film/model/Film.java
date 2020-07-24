package com.film.filmmicroservice.film.model;


import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Data
@Document
@RequiredArgsConstructor
public class Film {

    @Id
    private String id;

    @NonNull
    private String title;

    @NonNull
    private String description;

    @NonNull
    @Field("imageUrl")
    private String imageUrl;

    @NonNull
    private String direction;

    @NonNull
    private String type;

    @NonNull
    private String production;

    @NonNull
    private int year;
}
