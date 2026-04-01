package com.church.auth.dto;

public record LoginResponse(
        String accessToken,
        String refreshToken
) {}
