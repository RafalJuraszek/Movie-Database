package com.gateway.gatewayserver.config;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class OAuthBearerToken implements BearerTokenResolver {

    @Override
    public String resolve(HttpServletRequest http) {
        Boolean isOAuth = (Boolean)http.getAttribute("isOAuth");
        String token = (String) http.getAttribute("token");
        if(isOAuth !=null && isOAuth) {
            return  token;
        }
        else {
            return null;
        }
    }
}
