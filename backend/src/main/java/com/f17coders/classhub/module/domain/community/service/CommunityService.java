package com.f17coders.classhub.module.domain.community.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityRegisterReq;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityUpdateReq;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityListRes;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityReadRes;
import com.f17coders.classhub.module.domain.member.Member;

import java.io.IOException;

public interface CommunityService {
    int registerCommunity(CommunityRegisterReq communityRegisterReq, Member member) throws BaseExceptionHandler, IOException;

    CommunityReadRes readCommunity(int id, Member member) throws BaseExceptionHandler, IOException;

    CommunityListRes getCommunityList(String order, String tags, String keyword) throws BaseExceptionHandler, IOException;

    void updateCommunity(int id, CommunityUpdateReq communityUpdateReq, Member member) throws BaseExceptionHandler, IOException;

    void deleteCommunity(int id, Member member) throws BaseExceptionHandler, IOException;


}
