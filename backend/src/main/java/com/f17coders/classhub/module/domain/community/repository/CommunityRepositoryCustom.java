package com.f17coders.classhub.module.domain.community.repository;

import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.tag.Tag;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface CommunityRepositoryCustom {

    Community findCommunityByCommunityIdForCommunityReadRes(
        int communityId);

    Community findCommunityByCommunityIdForCommunityListRes(
        int communityId);

    Community findByCommunityIdFetchJoinCommunityTag(int communityId);

    public List<Integer> getCommunityIdList(List<Tag> tagList, String keyword, Pageable pageable);
}
