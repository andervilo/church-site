package com.church.ministry;

import com.church.common.exception.ResourceNotFoundException;
import com.church.ministry.dto.MinistryRequest;
import com.church.ministry.dto.MinistryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MinistryService {

    private final MinistryRepository repository;

    public List<MinistryResponse> findAllActive() {
        return repository.findByActiveTrueOrderByNameAsc()
                .stream().map(MinistryResponse::from).toList();
    }

    public MinistryResponse findBySlug(String slug) {
        return repository.findBySlugAndActiveTrue(slug)
                .map(MinistryResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Ministério", slug));
    }

    @Transactional
    public MinistryResponse create(MinistryRequest request) {
        Ministry ministry = new Ministry();
        applyFields(ministry, request);
        return MinistryResponse.from(repository.save(ministry));
    }

    @Transactional
    public MinistryResponse update(UUID id, MinistryRequest request) {
        Ministry ministry = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ministério", id));
        applyFields(ministry, request);
        return MinistryResponse.from(repository.save(ministry));
    }

    @Transactional
    public void delete(UUID id) {
        Ministry ministry = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ministério", id));
        ministry.setActive(false);
        repository.save(ministry);
    }

    private void applyFields(Ministry ministry, MinistryRequest request) {
        ministry.setSlug(request.slug());
        ministry.setName(request.name());
        ministry.setDescription(request.description());
        ministry.setShortDescription(request.shortDescription());
        ministry.setImageUrl(request.imageUrl());
        ministry.setLeaderName(request.leaderName());
        ministry.setMeetingDay(request.meetingDay());
        ministry.setMeetingTime(request.meetingTime());
    }
}
