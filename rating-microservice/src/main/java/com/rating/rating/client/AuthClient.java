package com.rating.rating.client;

import com.rating.rating.payload.JwtAuthenticationResponse;
import com.rating.rating.payload.ServiceLoginRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(serviceId = "AUTH")
public interface AuthClient {

    @RequestMapping(method = RequestMethod.POST, value = "signin")
    ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody ServiceLoginRequest request);

}
