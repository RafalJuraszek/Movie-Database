package com.rating.rating.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static java.util.stream.Collectors.toList;

public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

    private final JwtConfig jwtConfig;

    public JwtTokenAuthenticationFilter(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String header = request.getHeader(jwtConfig.getHeader());


        if(header == null || !header.startsWith(jwtConfig.getPrefix())) {
            chain.doFilter(request, response);
            return;
        }


        String token = header.replace(jwtConfig.getPrefix(), "");
        request.setAttribute("isOAuth", true);
        try {


            Claims claims = Jwts.parser()
                    .setSigningKey(jwtConfig.getSecret().getBytes())
                    .parseClaimsJws(token)
                    .getBody();

            String username = claims.getSubject();
            if(username != null) {
                List<String> authorities = (List<String>) claims.get("authorities");


                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(username, null,
                                authorities
                                        .stream()
                                        .map(SimpleGrantedAuthority::new)
                                        .collect(toList()));


                SecurityContextHolder.getContext().setAuthentication(auth);

                request.setAttribute("isOAuth", false);

            }


        } catch (Exception e) {

            SecurityContextHolder.clearContext();
        }

        request.setAttribute("token", token);

        chain.doFilter(request, response);
    }
}