package com.church.settings;

import com.church.settings.dto.SettingRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsService service;

    @GetMapping
    public List<SiteSetting> findAll() {
        return service.findAll();
    }

    @GetMapping("/{key}")
    public SiteSetting findByKey(@PathVariable String key) {
        return service.findByKey(key);
    }

    @PutMapping("/{key}")
    public SiteSetting update(@PathVariable String key, @Valid @RequestBody SettingRequest request) {
        return service.update(key, request);
    }
}
