package com.f17coders.classhub.module.domain.study.repository;

import com.f17coders.classhub.module.domain.study.dto.response.StudyListDetailRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadRes;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface StudyRepositoryCustom {

    List<StudyReadRes> findStudyByStudyIdFetchJoinLectureJoinTag(int studyId);

    List<StudyListDetailRes> findStudyByStudyIdFetchJoinTag
        (String keyword, Pageable pageable);

    int countStudyByKeyword(String keyword);

    int findEnterCodeByStudyId(int studyId);

}
