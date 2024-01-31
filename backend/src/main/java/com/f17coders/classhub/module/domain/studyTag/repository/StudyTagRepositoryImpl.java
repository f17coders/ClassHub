package com.f17coders.classhub.module.domain.studyTag.repository;

import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

import static com.f17coders.classhub.module.domain.studyTag.QStudyTag.studyTag;
import static com.f17coders.classhub.module.domain.tag.QTag.tag;

@Repository
public class StudyTagRepositoryImpl implements StudyTagRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public StudyTagRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Transactional
    @Override
    public void deleteStudyTagsByStudyId(int studyId) {
        queryFactory.delete(studyTag)
            .where(studyTag.study.studyId.eq(studyId))
            .execute();
    }
}
