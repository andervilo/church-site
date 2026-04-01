package com.church.event.dto;

import com.church.event.EventType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.ZonedDateTime;
import java.util.UUID;

public record EventRequest(
        @NotBlank @Size(max = 300) String title,
        String description,
        @NotNull EventType type,
        String imageUrl,
        @NotNull ZonedDateTime startDate,
        ZonedDateTime endDate,
        @Size(max = 300) String location,
        UUID ministryId,
        boolean featured
) {}
