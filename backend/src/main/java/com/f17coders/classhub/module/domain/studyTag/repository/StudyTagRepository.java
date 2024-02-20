package com.f17coders.classhub.module.domain.studyTag.repository;

import com.f17coders.classhub.module.domain.studyTag.StudyTag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyTagRepository extends JpaRepository<StudyTag, Integer>,
    StudyTagRepositoryCustom {

    StudyTag findByStudy_StudyIdAndTag_TagId(int studyId, int tagId);
}
