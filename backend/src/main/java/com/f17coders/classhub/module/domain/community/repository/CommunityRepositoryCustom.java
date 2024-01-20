package com.f17coders.classhub.module.domain.community.repository;

import com.f17coders.classhub.module.domain.community.Community;

public interface CommunityRepositoryCustom {
    Community findCommunityByCommunityIdFetchJoinComment(int communityId);
}
