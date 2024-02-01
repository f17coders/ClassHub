package com.f17coders.classhub.module.domain.lectureLike.repository;

import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.lectureLike.LectureLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureLikeRepository extends JpaRepository<LectureLike, Integer> {
//    CommunityLike findByCommunity_CommunityIdAndMember_MemberId(int communityId, int memberId);
//    CommunityLike findFirstByCommunity_CommunityId(int communityId); // TODO : 시큐리티 적용 후 삭제
//
//    int countByCommunity_CommunityId(int communityId);
}
