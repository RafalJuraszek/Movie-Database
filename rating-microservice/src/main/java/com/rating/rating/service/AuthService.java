package com.rating.rating.service;

import com.rating.rating.client.AuthClient;
import com.rating.rating.config.JwtConfig;
import com.rating.rating.payload.JwtAuthenticationResponse;
import com.rating.rating.payload.ServiceLoginRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private AuthClient authClient;
    @Autowired
    private ServiceLoginRequest serviceLoginRequest;
    @Autowired
    private JwtConfig jwtConfig;

    public String getAccessToken() {

        ResponseEntity<JwtAuthenticationResponse> response =
                authClient.signin(serviceLoginRequest);

        if (!response.getStatusCode().is2xxSuccessful()) {
            String message = String.format("unable to get access token for service account, %s",
                    response.getStatusCode());

            log.error(message);
            throw new RuntimeException(message);
        }

        return response.getBody().getAccessToken();
    }
}
