package com.rafaljuraszek.movie.authservice.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfo {

    private String id;
    private String username;
    private String name;
    private String profilePicture;
}