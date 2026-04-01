package com.church.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class EventCleanupTask {

    private final EventRepository repository;

    @Scheduled(cron = "0 0 2 * * MON")
    @Transactional
    public void deactivatePastEvents() {
        int count = repository.deactivateEventsBeforeDate(ZonedDateTime.now());
        log.info("Eventos desativados: {}", count);
    }
}
