package com.church.settings;

import com.church.common.exception.ResourceNotFoundException;
import com.church.settings.dto.SettingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SettingsService {

    private final SiteSettingRepository repository;

    public List<SiteSetting> findAll() {
        return repository.findAll();
    }

    public SiteSetting findByKey(String key) {
        return repository.findByKey(key)
                .orElseThrow(() -> new ResourceNotFoundException("Configuração", key));
    }

    @Transactional
    public SiteSetting update(String key, SettingRequest request) {
        SiteSetting setting = repository.findByKey(key)
                .orElseGet(() -> {
                    SiteSetting s = new SiteSetting();
                    s.setKey(key);
                    return s;
                });
        setting.setValue(request.value());
        return repository.save(setting);
    }
}
