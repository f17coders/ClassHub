package com.f17coders.classhub.module.domain.communityScrap.repository;

import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.communityScrap.CommunityScrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityScrapRepository extends JpaRepository<CommunityScrap, Integer> {
    CommunityScrap findByCommunity_CommunityIdAndMember_MemberId(int communityId, int memberId);
    CommunityScrap findFirstByCommunity_CommunityId(int communityId); // TODO : 시큐리티 적용 후 삭제

    int countByCommunity_CommunityId(int communityId);
}
