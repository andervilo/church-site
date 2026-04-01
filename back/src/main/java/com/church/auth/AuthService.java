package com.church.auth;

import com.church.auth.dto.LoginRequest;
import com.church.auth.dto.LoginResponse;
import com.church.auth.dto.RefreshRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AdminUserDetailsService userDetailsService;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        UserDetails user = userDetailsService.loadUserByUsername(request.email());
        return new LoginResponse(
                jwtService.generateAccessToken(user),
                jwtService.generateRefreshToken(user));
    }

    public LoginResponse refresh(RefreshRequest request) {
        String email = jwtService.extractUsername(request.refreshToken());
        UserDetails user = userDetailsService.loadUserByUsername(email);

        if (!jwtService.isTokenValid(request.refreshToken(), user)) {
            throw new IllegalArgumentException("Refresh token inválido");
        }

        return new LoginResponse(
                jwtService.generateAccessToken(user),
                jwtService.generateRefreshToken(user));
    }
}
