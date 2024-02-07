package com.f17coders.classhub.module.domain.communityScrap.repository;

import com.f17coders.classhub.module.domain.communityScrap.CommunityScrap;
import com.f17coders.classhub.module.domain.member.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityScrapRepository extends JpaRepository<CommunityScrap, Integer> {

    Optional<CommunityScrap> findByCommunity_CommunityIdAndMember(int communityId, Member member);

    long countByMember(Member member);
}
