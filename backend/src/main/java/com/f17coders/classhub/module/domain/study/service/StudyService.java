package com.f17coders.classhub.module.domain.study.service;


import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.study.dto.request.StudyRegisterReq;
import com.f17coders.classhub.module.domain.study.dto.request.StudyUpdateReq;
import com.f17coders.classhub.module.domain.study.dto.response.StudyListRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadRes;
import org.springframework.data.domain.Pageable;


import java.io.IOException;
import java.util.List;

public interface StudyService {
    int registerStudy(StudyRegisterReq studyRegisterReq, Member member) throws BaseExceptionHandler, IOException;
    StudyReadRes readStudy(int studyId) throws BaseExceptionHandler, IOException;
    StudyListRes getStudyList(Pageable pageable) throws BaseExceptionHandler, IOException;
    void updateStudy(StudyUpdateReq studyUpdateReq) throws BaseExceptionHandler, IOException;
    void deleteStudy(int studyId) throws BaseExceptionHandler, IOException;


}