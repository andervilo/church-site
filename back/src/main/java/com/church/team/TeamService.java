package com.church.team;

import com.church.common.exception.ResourceNotFoundException;
import com.church.team.dto.MemberRequest;
import com.church.team.dto.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final PastoralMemberRepository repository;

    public List<MemberResponse> findAllActive() {
        return repository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream().map(MemberResponse::from).toList();
    }

    public MemberResponse findById(UUID id) {
        return repository.findById(id)
                .map(MemberResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Membro", id));
    }

    @Transactional
    public MemberResponse create(MemberRequest request) {
        PastoralMember member = new PastoralMember();
        applyFields(member, request);
        return MemberResponse.from(repository.save(member));
    }

    @Transactional
    public MemberResponse update(UUID id, MemberRequest request) {
        PastoralMember member = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Membro", id));
        applyFields(member, request);
        return MemberResponse.from(repository.save(member));
    }

    @Transactional
    public void delete(UUID id) {
        PastoralMember member = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Membro", id));
        member.setActive(false);
        repository.save(member);
    }

    private void applyFields(PastoralMember member, MemberRequest request) {
        member.setName(request.name());
        member.setRole(request.role());
        member.setBio(request.bio());
        member.setPhotoUrl(request.photoUrl());
        member.setEmail(request.email());
        member.setExpertise(request.expertise() != null ? request.expertise() : List.of());
        member.setOfficeHours(request.officeHours());
        member.setDisplayOrder(request.displayOrder());
    }
}
