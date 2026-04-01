package com.church.contact;

import com.church.contact.dto.ContactRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void send(@Valid @RequestBody ContactRequest request) {
        service.send(request);
    }

    @GetMapping
    public List<ContactMessage> findAll() {
        return service.findAll();
    }

    @PatchMapping("/{id}/read")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void markAsRead(@PathVariable UUID id) {
        service.markAsRead(id);
    }
}
