package com.f17coders.classhub.module.domain.communityLike.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.member.Member;

import java.io.IOException;

public interface CommunityLikeService {
    void likeCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException;    // TODO : CommunityLikeService에 위치하는게 맞는가?

    void unlikeCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException;

    boolean canLike(Community community, Member member);
}
