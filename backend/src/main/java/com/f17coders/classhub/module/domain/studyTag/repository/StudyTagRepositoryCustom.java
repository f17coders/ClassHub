package com.f17coders.classhub.module.domain.studyTag.repository;

import com.f17coders.classhub.module.domain.tag.Dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.Tag;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public interface StudyTagRepositoryCustom {

    List<TagRes> findTagsByStudyIdFetchJoinStudyTag(int studyId);

    @Transactional
    void deleteStudyTagsByStudyId(int studyId);
}
