package com.f17coders.classhub.module.domain.tag.repository;

import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

import static com.f17coders.classhub.module.domain.memberTag.QMemberTag.*;
import static com.f17coders.classhub.module.domain.studyTag.QStudyTag.studyTag;
import static com.f17coders.classhub.module.domain.tag.QTag.tag;
import static com.f17coders.classhub.module.domain.lectureTag.QLectureTag.lectureTag;
import static com.f17coders.classhub.module.domain.communityTag.QCommunityTag.communityTag;

public class TagRepositoryImpl implements TagRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public TagRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<TagRes> findTagJoinLectureTagOrderByCnt() {
        return queryFactory
            .select(Projections.constructor(TagRes.class, tag.tagId, tag.name))
            .from(tag)
            .leftJoin(lectureTag)
            .on(tag.tagId.eq(lectureTag.tag.tagId))
            .groupBy(tag.tagId, tag.name)
            .orderBy(lectureTag.lecture.lectureId.count().desc())
            .fetch();
    }


    public List<TagRes> findTagJoinCommnunityTagOrderByCnt() {
        return queryFactory
            .select(Projections.constructor(TagRes.class, tag.tagId, tag.name))
            .from(tag)
            .leftJoin(communityTag)
            .on(tag.tagId.eq(communityTag.tag.tagId))
            .groupBy(tag.tagId, tag.name)
            .orderBy(communityTag.community.communityId.count().desc())
            .fetch();
    }

    public List<TagRes> findTagJoinMemberTagOrderByCnt() {
        return queryFactory
            .select(Projections.constructor(TagRes.class, tag.tagId, tag.name))
            .from(tag)
            .leftJoin(memberTag)
            .on(tag.tagId.eq(memberTag.tag.tagId))
            .groupBy(tag.tagId, tag.name)
            .orderBy(memberTag.member.memberId.count().desc())
            .fetch();
    }

    @Override
    public List<TagRes> findTagByStudyIdFetchJoinStudyTag(int studyId) {
        return queryFactory
            .select(Projections.constructor(TagRes.class, tag.tagId, tag.name))
            .from(tag)
            .join(studyTag)
            .on(studyTag.tag.tagId.eq(tag.tagId))
            .where(studyTag.study.studyId.eq(studyId))
            .fetch();
    }
}
