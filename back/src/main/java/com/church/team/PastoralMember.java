package com.church.team;

import com.church.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pastoral_team")
@Getter
@Setter
@NoArgsConstructor
public class PastoralMember extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 200)
    private String role;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(length = 200)
    private String email;

    @ElementCollection
    @CollectionTable(name = "pastoral_member_expertise", joinColumns = @JoinColumn(name = "member_id"))
    @Column(name = "expertise")
    private List<String> expertise = new ArrayList<>();

    @Column(name = "office_hours", length = 200)
    private String officeHours;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 0;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;
}
