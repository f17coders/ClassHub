package com.f17coders.classhub.module.domain.communityScrap.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.member.Member;

import java.io.IOException;

public interface CommunityScrapService {
    void scrapCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException;

    void unscrapCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException;

    boolean canScrap(Community community, Member member);
}
