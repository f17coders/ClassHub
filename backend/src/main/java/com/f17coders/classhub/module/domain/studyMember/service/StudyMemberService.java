package com.f17coders.classhub.module.domain.studyMember.service;


import com.f17coders.classhub.module.domain.member.Member;

public interface StudyMemberService {
    void enterStudy(int studyId, Member member);
    void exitStudy(int studyId, Member member);
}
