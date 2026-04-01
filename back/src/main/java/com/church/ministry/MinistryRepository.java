package com.church.ministry;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MinistryRepository extends JpaRepository<Ministry, UUID> {
    List<Ministry> findByActiveTrueOrderByNameAsc();
    Optional<Ministry> findBySlugAndActiveTrue(String slug);
}
