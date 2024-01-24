package com.f17coders.classhub.module.domain.studyTag.repository;

import com.f17coders.classhub.module.domain.tag.Tag;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.f17coders.classhub.module.domain.studyTag.QStudyTag.studyTag;
import static com.f17coders.classhub.module.domain.tag.QTag.tag;

@Repository
public class StudyTagRepositoryImpl implements StudyTagRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public StudyTagRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }
    @Override
    public List<Tag> findTagsByStudyIdFetchJoinStudyTag(int study_id) {
        return queryFactory
                .selectFrom(tag)
                .join(studyTag.tag, tag).fetchJoin()
                .where(studyTag.study.studyId.eq(study_id))
                .fetch();
    }
}
