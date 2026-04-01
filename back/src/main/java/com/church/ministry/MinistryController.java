package com.church.ministry;

import com.church.ministry.dto.MinistryRequest;
import com.church.ministry.dto.MinistryResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ministries")
@RequiredArgsConstructor
public class MinistryController {

    private final MinistryService service;

    @GetMapping
    public List<MinistryResponse> findAll() {
        return service.findAllActive();
    }

    @GetMapping("/{slug}")
    public MinistryResponse findBySlug(@PathVariable String slug) {
        return service.findBySlug(slug);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MinistryResponse create(@Valid @RequestBody MinistryRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public MinistryResponse update(@PathVariable UUID id, @Valid @RequestBody MinistryRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}
