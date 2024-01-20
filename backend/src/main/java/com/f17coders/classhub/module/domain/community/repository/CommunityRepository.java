package com.f17coders.classhub.module.domain.community.repository;

import com.f17coders.classhub.module.domain.community.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface CommunityRepository extends JpaRepository<Community, UUID>, CommunityRepositoryCustom {
    Community findByCommunityId(int communityId);

//    @Query("select c from Community c left join fetch c.commentList where c.communityId = :communityId")
//    Community findCommunityByCommunityIdFetchJoinComment(int communityId);    //    QueryDsl 으로 해당 메서드 대체
}
