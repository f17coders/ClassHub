package com.f17coders.classhub.module.domain.studyTag.repository;

import com.f17coders.classhub.module.domain.tag.Tag;

import java.util.List;

public interface StudyTagRepositoryCustom {
    List<Tag> findTagsByStudyIdFetchJoinStudyTag(int study_id);
}
