package com.church.event.dto;

import com.church.event.Event;
import com.church.event.EventType;

import java.time.ZonedDateTime;
import java.util.UUID;

public record EventResponse(
        UUID id,
        String title,
        String description,
        EventType type,
        String imageUrl,
        ZonedDateTime startDate,
        ZonedDateTime endDate,
        String location,
        UUID ministryId,
        String ministryName,
        boolean featured
) {
    public static EventResponse from(Event e) {
        return new EventResponse(
                e.getId(), e.getTitle(), e.getDescription(), e.getType(),
                e.getImageUrl(), e.getStartDate(), e.getEndDate(), e.getLocation(),
                e.getMinistry() != null ? e.getMinistry().getId() : null,
                e.getMinistry() != null ? e.getMinistry().getName() : null,
                e.isFeatured());
    }
}
