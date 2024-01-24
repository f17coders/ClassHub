package com.f17coders.classhub.module.domain.study.repository;

import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadRes;

import java.util.List;


public interface StudyRepositoryCustom {
    Study findStudyByStudyIdFetchJoinLecture(int studyId);
//    StudyTag findStudyByStudyIdFetchJoinTagFetJoinStudyTag(int studyId);
}
