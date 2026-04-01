package com.church.ministry.dto;

import com.church.ministry.Ministry;

import java.time.LocalTime;
import java.util.UUID;

public record MinistryResponse(
        UUID id,
        String slug,
        String name,
        String description,
        String shortDescription,
        String imageUrl,
        String leaderName,
        String meetingDay,
        LocalTime meetingTime
) {
    public static MinistryResponse from(Ministry m) {
        return new MinistryResponse(
                m.getId(), m.getSlug(), m.getName(), m.getDescription(),
                m.getShortDescription(), m.getImageUrl(), m.getLeaderName(),
                m.getMeetingDay(), m.getMeetingTime());
    }
}
