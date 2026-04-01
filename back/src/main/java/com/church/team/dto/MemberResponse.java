package com.church.team.dto;

import com.church.team.PastoralMember;

import java.util.List;
import java.util.UUID;

public record MemberResponse(
        UUID id,
        String name,
        String role,
        String bio,
        String photoUrl,
        String email,
        List<String> expertise,
        String officeHours,
        int displayOrder
) {
    public static MemberResponse from(PastoralMember m) {
        return new MemberResponse(
                m.getId(), m.getName(), m.getRole(), m.getBio(),
                m.getPhotoUrl(), m.getEmail(), m.getExpertise(),
                m.getOfficeHours(), m.getDisplayOrder());
    }
}
