package com.f17coders.classhub.module.domain.studyTag.repository;

import org.springframework.transaction.annotation.Transactional;

public interface StudyTagRepositoryCustom {

    @Transactional
    void deleteStudyTagsByStudyId(int studyId);
}
