package com.church.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {

    List<Event> findByActiveTrueAndStartDateAfterOrderByStartDateAsc(ZonedDateTime date);

    List<Event> findByActiveTrueAndTypeAndStartDateAfterOrderByStartDateAsc(EventType type, ZonedDateTime date);

    @Query("SELECT e FROM Event e WHERE e.active = true AND YEAR(e.startDate) = :year AND MONTH(e.startDate) = :month ORDER BY e.startDate")
    List<Event> findByMonth(int year, int month);

    @Modifying
    @Query("UPDATE Event e SET e.active = false WHERE e.endDate < :date AND e.active = true")
    int deactivateEventsBeforeDate(ZonedDateTime date);
}
