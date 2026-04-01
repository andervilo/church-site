package com.church.team.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record MemberRequest(
        @NotBlank @Size(max = 200) String name,
        @Size(max = 200) String role,
        String bio,
        String photoUrl,
        @Email @Size(max = 200) String email,
        List<String> expertise,
        @Size(max = 200) String officeHours,
        int displayOrder
) {}
