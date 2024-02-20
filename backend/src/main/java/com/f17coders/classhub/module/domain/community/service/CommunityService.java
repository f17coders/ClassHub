package com.f17coders.classhub.module.domain.community.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityRegisterReq;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityUpdateReq;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityListRes;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityReadRes;
import com.f17coders.classhub.module.domain.member.Member;
import java.io.IOException;
import org.springframework.data.domain.Pageable;

public interface CommunityService {

    int registerCommunity(CommunityRegisterReq communityRegisterReq, Member member) // check commit
        throws BaseExceptionHandler, IOException;

    CommunityReadRes readCommunity(int id, Member member) throws BaseExceptionHandler, IOException;

    CommunityListRes getCommunityList(String tags, String keyword, Pageable pageable)
        throws BaseExceptionHandler, IOException;

    void updateCommunity(int id, CommunityUpdateReq communityUpdateReq, Member member)
        throws BaseExceptionHandler, IOException;

    void deleteCommunity(int id, Member member) throws BaseExceptionHandler, IOException;

    void likeCommunity(int communityId, Member member) throws BaseExceptionHandler;

    void unlikeCommunity(int communityId, Member member) throws BaseExceptionHandler;

    void scrapCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException;

    void unscrapCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException;
}
