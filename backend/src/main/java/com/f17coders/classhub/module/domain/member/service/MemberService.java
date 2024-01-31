package com.f17coders.classhub.module.domain.member.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.request.MemberAddInfoReq;
import com.f17coders.classhub.module.domain.member.dto.request.MemberUpdateInfoReq;
import com.f17coders.classhub.module.domain.member.dto.response.MemberGetInfoRes;
import java.io.IOException;

public interface MemberService {

    public int registerMember(String nickname) throws BaseExceptionHandler, IOException;

    public MemberGetInfoRes getInformation(Member member) throws BaseExceptionHandler, IOException;

    public void addInformation(MemberAddInfoReq memberAddInfoReq, Member member)
        throws BaseExceptionHandler, IOException;

    public void updateInformation(MemberUpdateInfoReq memberUpdateInfoReq, Member member)
        throws BaseExceptionHandler, IOException;
}
