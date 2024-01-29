package com.f17coders.classhub.module.domain.studyTag.repository;

import com.f17coders.classhub.module.domain.tag.Dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.Tag;
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

    @Override
    public List<TagRes> findTagsByStudyIdFetchJoinStudyTag(int studyId) {
        return queryFactory
            .select(Projections.constructor(TagRes.class, tag.tagId, tag.name))
            .from(tag)
            .join(studyTag)
            .on(studyTag.tag.tagId.eq(tag.tagId))
            .where(studyTag.study.studyId.eq(studyId))
            .fetch();
    }

    @Transactional
    @Override
    public void deleteStudyTagsByStudyId(int studyId) {
        queryFactory.delete(studyTag)
            .where(studyTag.study.studyId.eq(studyId))
            .execute();
    }
}
