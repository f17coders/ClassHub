package com.f17coders.classhub.module.domain.community.repository;

import com.f17coders.classhub.module.domain.community.Community;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import static com.f17coders.classhub.module.domain.comment.QComment.comment;
import static com.f17coders.classhub.module.domain.community.QCommunity.community;

public class CommunityRepositoryImpl implements CommunityRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public CommunityRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Community findCommunityByCommunityIdFetchJoinComment(int communityId) {
        return queryFactory
                .selectFrom(community)
                .leftJoin(community.commentList, comment).fetchJoin()
                .where(community.communityId.eq(communityId))
                .fetchOne();
    }
}
