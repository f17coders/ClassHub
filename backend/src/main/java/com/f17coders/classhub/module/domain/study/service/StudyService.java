package com.f17coders.classhub.module.domain.study.service;


import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.study.dto.request.StudyRegisterReq;
import com.f17coders.classhub.module.domain.study.dto.request.StudyUpdateReq;
import com.f17coders.classhub.module.domain.study.dto.response.StudyListRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyMemberListRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadTagRes;
import org.springframework.data.domain.Pageable;


import java.io.IOException;

public interface StudyService {

    int registerStudy(StudyRegisterReq studyRegisterReq, Member member)
            throws BaseExceptionHandler, IOException;

    StudyReadTagRes readStudy(int studyId) throws BaseExceptionHandler, IOException;

    StudyListRes getStudyList(String keyword, int recruitment, Pageable pageable)
            throws BaseExceptionHandler;

    void updateStudy(StudyUpdateReq studyUpdateReq, Member member) throws BaseExceptionHandler;

    void deleteStudy(int studyId, int memberId) throws BaseExceptionHandler;

    int getEnterCodeLeader(int studyId, int memberId) throws BaseExceptionHandler;

    boolean isValidEnterCode(int studyId, int enterCode) throws BaseExceptionHandler;

    StudyMemberListRes getStudyMemberList(int studyId) throws BaseExceptionHandler;
}
