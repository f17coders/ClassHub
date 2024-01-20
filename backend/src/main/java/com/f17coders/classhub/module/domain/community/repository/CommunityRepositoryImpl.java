package com.f17coders.classhub.module.domain.community.repository;

import com.f17coders.classhub.module.domain.comment.QComment;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.QCommunity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.Query;

import static com.f17coders.classhub.module.domain.comment.QComment.*;
import static com.f17coders.classhub.module.domain.community.QCommunity.*;

public class CommunityRepositoryImpl implements CommunityRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public CommunityRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Community findCommunityByCommunityIdFetchJoinComment(int communityId) {
        return queryFactory
                .selectFrom(community)
                .join(community.commentList, comment).fetchJoin()
                .where(community.communityId.eq(communityId))
                .fetchOne();
    }
}
