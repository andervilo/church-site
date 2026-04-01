package com.church.settings;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SiteSettingRepository extends JpaRepository<SiteSetting, UUID> {
    Optional<SiteSetting> findByKey(String key);
}
