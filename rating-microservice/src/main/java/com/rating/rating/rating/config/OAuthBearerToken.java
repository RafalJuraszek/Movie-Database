package com.rating.rating.rating.config;

import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;

import javax.servlet.http.HttpServletRequest;

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
