package com.f17coders.classhub.module.domain.community.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.dto.request.CreateCommunityReq;
import com.f17coders.classhub.module.domain.member.Member;

import java.io.IOException;

public interface CommunityService {
    int registerCommunity(CreateCommunityReq createCommunityReq, Member member) throws BaseExceptionHandler, IOException;

    Community searchCommunity(int communityId) throws BaseExceptionHandler, IOException;
}
