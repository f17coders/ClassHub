package com.f17coders.classhub.module.domain.studyMember.service;


import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.studyMember.StudyMember;
import com.f17coders.classhub.module.domain.studyMember.repository.StudyMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyMemberServiceImpl implements StudyMemberService {

    private final StudyRepository studyRepository;
    private final StudyMemberRepository studyMemberRepository;

    @Override
    public void enterStudy(int studyId, Member member) {

        Study study = studyRepository.findByStudyId(studyId);

        StudyMember studyMember = StudyMember.createStudyMember();
        studyMember.putMember(member);
        studyMember.putStudy(study);

        studyMemberRepository.save(studyMember);
    }

    @Override
    public void exitStudy(int studyId, Member member) {
        StudyMember studyMember = studyMemberRepository.findByStudy_StudyIdAndMember_MemberId(
            studyId, member.getMemberId());

        studyMemberRepository.delete(studyMember);
    }
}
