package com.f17coders.classhub.module.domain.community.repository;

import static com.f17coders.classhub.module.domain.comment.QComment.comment;
import static com.f17coders.classhub.module.domain.community.QCommunity.community;
import static com.f17coders.classhub.module.domain.communityLike.QCommunityLike.communityLike;
import static com.f17coders.classhub.module.domain.communityScrap.QCommunityScrap.communityScrap;
import static com.f17coders.classhub.module.domain.communityTag.QCommunityTag.communityTag;
import static com.f17coders.classhub.module.domain.member.QMember.member;
import static com.f17coders.classhub.module.domain.tag.QTag.tag;

import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.tag.Tag;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.data.domain.Pageable;

public class CommunityRepositoryImpl implements CommunityRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public CommunityRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Community findCommunityByCommunityIdForCommunityReadRes(int communityId) {
        return queryFactory
            .selectFrom(community)
            .leftJoin(community.member, member).fetchJoin()
            .leftJoin(community.commentList, comment).fetchJoin()
            .leftJoin(community.communityTagSet, communityTag).fetchJoin()
            .leftJoin(communityTag.tag, tag).fetchJoin()
            .where(community.communityId.eq(communityId))
            .fetchOne();
    }

    @Override
    public Community findCommunityByCommunityIdForCommunityListRes(int communityId) {
        return queryFactory
            .selectFrom(community)
            .leftJoin(community.member, member).fetchJoin()
            .leftJoin(community.communityTagSet, communityTag).fetchJoin()
            .leftJoin(communityTag.tag, tag).fetchJoin()
            .leftJoin(community.commentList, comment).fetchJoin()
            .leftJoin(community.communityLikeSet, communityLike).fetchJoin()
            .leftJoin(community.communityScrapSet, communityScrap).fetchJoin()
            .where(community.communityId.eq(communityId))
            .fetchOne();
    }

    @Override
    public Community findByCommunityIdFetchJoinCommunityTag(int communityId) {
        return queryFactory
            .selectFrom(community)
            .leftJoin(community.communityTagSet, communityTag).fetchJoin()
            .where(community.communityId.eq(communityId))
            .fetchOne();
    }

    @Override
    public List<Integer> getCommunityIdList(List<Tag> tagList, String keyword, Pageable pageable) {
        return queryFactory
            .select(community.communityId)
            .from(community)
//            .leftJoin(community.communityTagSet, communityTag).fetchJoin()
//            .leftJoin(communityTag.tag, tag).fetchJoin()
            .where(containsKeyword(keyword))
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();
    }

    private BooleanExpression containsKeyword(String keyword) {
        return keyword != null ? community.title.contains(keyword)
            .or(community.content.contains(keyword)) : null;
    }
}
