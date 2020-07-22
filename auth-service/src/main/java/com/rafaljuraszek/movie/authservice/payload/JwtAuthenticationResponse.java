package com.rafaljuraszek.movie.authservice.payload;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@RequiredArgsConstructor
public class JwtAuthenticationResponse {

    @NotNull
    private String accessToken;

    private String tokenType = "Bearer";

    public JwtAuthenticationResponse(@NotNull String accessToken) {
        this.accessToken = accessToken;
    }
}
