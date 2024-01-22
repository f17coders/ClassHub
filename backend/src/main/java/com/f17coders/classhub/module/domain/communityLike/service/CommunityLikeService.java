package com.f17coders.classhub.module.domain.communityLike.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.Member;

import java.io.IOException;

public interface CommunityLikeService {
    void likeCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException;

    void unlikeCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException;

}
