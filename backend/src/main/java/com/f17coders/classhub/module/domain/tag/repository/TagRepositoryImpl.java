package com.f17coders.classhub.module.domain.tag.repository;

import com.f17coders.classhub.module.domain.tag.Dto.response.TagRes;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

import static com.f17coders.classhub.module.domain.tag.QTag.tag;
import static com.f17coders.classhub.module.domain.lectureTag.QLectureTag.lectureTag;
import static com.f17coders.classhub.module.domain.communityTag.QCommunityTag.communityTag;

public class TagRepositoryImpl implements TagRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    public TagRepositoryImpl(EntityManager em) {this.queryFactory = new JPAQueryFactory(em);}
    public List<TagRes> findTagByKeywordJoinLectureTagOrderByCntLimit10(String tags) {
        return queryFactory
                .select(Projections.constructor(TagRes.class, tag.tagId, tag.name))
                .from(tag)
                .leftJoin(lectureTag)
                .on(tag.tagId.eq(lectureTag.tag.tagId))
                .where(tagNameContain(tags))
                .groupBy(tag.tagId, tag.name)
                .orderBy(lectureTag.lecture.lectureId.count().desc())
                .limit(10)
                .fetch();
    }



    public List<TagRes> findTagByKeywordJoinCommnunityTagOrderByCntLimit10(String tags) {
        return queryFactory
                .select(Projections.constructor(TagRes.class, tag.tagId, tag.name))
                .from(tag)
                .leftJoin(communityTag)
                .on(tag.tagId.eq(communityTag.tag.tagId))
                .where(tagNameContain(tags))
                .groupBy(tag.tagId, tag.name)
                .orderBy(communityTag.community.communityId.count().desc())
                .limit(10)
                .fetch();
    }
    private BooleanExpression tagNameContain(String tags) {
        return tags != null ? tag.name.contains(tags) : null;
    }
}
