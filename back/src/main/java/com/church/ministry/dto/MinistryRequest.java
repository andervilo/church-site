package com.church.ministry.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalTime;

public record MinistryRequest(
        @NotBlank @Size(max = 100) String slug,
        @NotBlank @Size(max = 200) String name,
        String description,
        @Size(max = 500) String shortDescription,
        String imageUrl,
        @Size(max = 200) String leaderName,
        @Size(max = 50) String meetingDay,
        LocalTime meetingTime
) {}
