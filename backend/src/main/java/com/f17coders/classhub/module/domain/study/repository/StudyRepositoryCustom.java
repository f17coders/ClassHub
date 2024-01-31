package com.f17coders.classhub.module.domain.study.repository;

import com.f17coders.classhub.module.domain.study.dto.response.StudyBaseRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadRes;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface StudyRepositoryCustom {

    StudyReadRes findStudyByStudyIdFetchJoinLecture(int studyId);

    List<StudyReadRes> findStudyByKeywordFetchJoinLecture
        (String keyword, Pageable pageable);

    int countStudyByKeyword(String keyword);

    int findEnterCodeByStudyId(int studyId);

    List<StudyBaseRes> findStudyFetchJoinStudyMemberByMemberId(int memberId);
}
