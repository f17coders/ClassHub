package com.f17coders.classhub.module.domain.community.repository;

import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Integer>,
    CommunityRepositoryCustom {

    Long countByMember(Member member);
}
