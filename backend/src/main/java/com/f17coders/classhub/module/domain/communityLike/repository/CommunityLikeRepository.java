package com.f17coders.classhub.module.domain.communityLike.repository;

import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.member.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Integer> {

    Optional<CommunityLike> findByCommunityAndMember(Community community, Member member);

    Optional<CommunityLike> findByCommunity_CommunityIdAndMember(int communityId, Member member);

    int countByCommunity(Community community);
}
