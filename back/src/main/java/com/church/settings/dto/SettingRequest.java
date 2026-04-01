package com.church.settings.dto;

import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record SettingRequest(
        @NotNull Map<String, Object> value
) {}
