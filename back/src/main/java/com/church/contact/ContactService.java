package com.church.contact;

import com.church.common.exception.ResourceNotFoundException;
import com.church.contact.dto.ContactRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository repository;
    private final ApplicationEventPublisher eventPublisher;

    public List<ContactMessage> findAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public ContactMessage send(ContactRequest request) {
        ContactMessage message = new ContactMessage();
        message.setName(request.name());
        message.setEmail(request.email());
        message.setPhone(request.phone());
        message.setSubject(request.subject());
        message.setMessage(request.message());

        ContactMessage saved = repository.save(message);
        eventPublisher.publishEvent(new ContactMessageCreatedEvent(this, saved));
        return saved;
    }

    @Transactional
    public void markAsRead(UUID id) {
        ContactMessage message = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mensagem", id));
        message.setRead(true);
        repository.save(message);
    }
}
