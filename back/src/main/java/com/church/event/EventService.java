package com.church.event;

import com.church.common.exception.ResourceNotFoundException;
import com.church.event.dto.EventRequest;
import com.church.event.dto.EventResponse;
import com.church.ministry.Ministry;
import com.church.ministry.MinistryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository repository;
    private final MinistryRepository ministryRepository;

    public List<EventResponse> findUpcoming(EventType type) {
        List<Event> events;
        if (type != null) {
            events = repository.findByActiveTrueAndTypeAndStartDateAfterOrderByStartDateAsc(type, ZonedDateTime.now());
        } else {
            events = repository.findByActiveTrueAndStartDateAfterOrderByStartDateAsc(ZonedDateTime.now());
        }
        return events.stream().map(EventResponse::from).toList();
    }

    public List<EventResponse> findByMonth(int year, int month) {
        return repository.findByMonth(year, month)
                .stream().map(EventResponse::from).toList();
    }

    public EventResponse findById(UUID id) {
        return repository.findById(id)
                .map(EventResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Evento", id));
    }

    @Transactional
    public EventResponse create(EventRequest request) {
        Event event = new Event();
        applyFields(event, request);
        return EventResponse.from(repository.save(event));
    }

    @Transactional
    public EventResponse update(UUID id, EventRequest request) {
        Event event = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento", id));
        applyFields(event, request);
        return EventResponse.from(repository.save(event));
    }

    @Transactional
    public void delete(UUID id) {
        Event event = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento", id));
        event.setActive(false);
        repository.save(event);
    }

    private void applyFields(Event event, EventRequest request) {
        event.setTitle(request.title());
        event.setDescription(request.description());
        event.setType(request.type());
        event.setImageUrl(request.imageUrl());
        event.setStartDate(request.startDate());
        event.setEndDate(request.endDate());
        event.setLocation(request.location());
        event.setFeatured(request.featured());

        if (request.ministryId() != null) {
            Ministry ministry = ministryRepository.findById(request.ministryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ministério", request.ministryId()));
            event.setMinistry(ministry);
        } else {
            event.setMinistry(null);
        }
    }
}
