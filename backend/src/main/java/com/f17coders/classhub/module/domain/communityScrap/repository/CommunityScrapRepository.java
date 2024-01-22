package com.f17coders.classhub.module.domain.communityScrap.repository;

import com.f17coders.classhub.module.domain.communityScrap.CommunityScrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityScrapRepository extends JpaRepository<CommunityScrap, Integer> {
    CommunityScrap findByCommunity_CommunityIdAndMember_MemberId(int communityId, int memberId);
    int countByCommunity_CommunityId(int communityId);
}
