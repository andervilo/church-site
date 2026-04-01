package com.church.ministry;

import com.church.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Table(name = "ministries")
@Getter
@Setter
@NoArgsConstructor
public class Ministry extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "leader_name", length = 200)
    private String leaderName;

    @Column(name = "meeting_day", length = 50)
    private String meetingDay;

    @Column(name = "meeting_time")
    private LocalTime meetingTime;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;
}
