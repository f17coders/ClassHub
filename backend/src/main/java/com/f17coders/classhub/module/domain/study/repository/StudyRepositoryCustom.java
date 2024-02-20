package com.f17coders.classhub.module.domain.study.repository;

import com.f17coders.classhub.module.domain.study.dto.response.StudyBaseRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadRes;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface StudyRepositoryCustom {

    StudyReadRes findStudyByStudyIdFetchJoinLecture(int studyId);

    List<StudyReadRes> findStudyByKeywordFetchJoinLecture
        (String keyword, int recuritment, Pageable pageable);

    int countStudyByKeywordAndRecuritment(String keyword, int recuritment);

    int findEnterCodeByStudyId(int studyId);

    List<StudyBaseRes> findStudyFetchJoinStudyMemberByMemberId(int memberId);
}
