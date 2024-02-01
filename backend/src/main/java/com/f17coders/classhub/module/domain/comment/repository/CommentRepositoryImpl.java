package com.f17coders.classhub.module.domain.comment.repository;

import static com.f17coders.classhub.module.domain.comment.QComment.comment;
import static com.f17coders.classhub.module.domain.community.QCommunity.community;
import static com.f17coders.classhub.module.domain.communityLike.QCommunityLike.communityLike;
import static com.f17coders.classhub.module.domain.communityScrap.QCommunityScrap.communityScrap;
import static com.f17coders.classhub.module.domain.communityTag.QCommunityTag.communityTag;
import static com.f17coders.classhub.module.domain.member.QMember.member;
import static com.f17coders.classhub.module.domain.tag.QTag.tag;

import com.f17coders.classhub.module.domain.comment.Comment;
import com.f17coders.classhub.module.domain.comment.QComment;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.tag.Tag;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.data.domain.Pageable;

public class CommentRepositoryImpl implements CommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public CommentRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }
}
