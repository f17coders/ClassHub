package com.f17coders.classhub.module.domain.community.repository;

import static com.f17coders.classhub.module.domain.comment.QComment.comment;
import static com.f17coders.classhub.module.domain.community.QCommunity.community;
import static com.f17coders.classhub.module.domain.communityLike.QCommunityLike.communityLike;
import static com.f17coders.classhub.module.domain.communityScrap.QCommunityScrap.communityScrap;
import static com.f17coders.classhub.module.domain.communityTag.QCommunityTag.communityTag;
import static com.f17coders.classhub.module.domain.member.QMember.member;
import static com.f17coders.classhub.module.domain.tag.QTag.tag;

import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.QMember;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class CommunityRepositoryImpl implements CommunityRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public CommunityRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Community findCommunityByCommunityIdForCommunityReadRes(
        int communityId) {   // TODO : 최적화 반드시 필요
        return queryFactory
            .selectFrom(community)
            .leftJoin(community.member, member).fetchJoin()
            .leftJoin(community.communityTagList, communityTag).fetchJoin()
            .leftJoin(communityTag.tag, tag).fetchJoin()
            .where(community.communityId.eq(communityId))
            .fetchOne();
    }

    @Override
    public Community findCommunityByCommunityIdForCommunityListRes(int communityId) {
        return queryFactory
            .selectFrom(community)
            .leftJoin(community.member, member).fetchJoin()
            .leftJoin(community.communityTagList, communityTag).fetchJoin()
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
            .leftJoin(community.communityTagList, communityTag).fetchJoin()
            .where(community.communityId.eq(communityId))
            .fetchOne();
    }

    @Override
    public List<Community> findAllByMemberWithPaging(Member member, Pageable pageable) {
        return queryFactory
            .selectFrom(community)
            .where(community.member.eq(member))
            .orderBy(community.createTime.desc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();
    }

    @Override
    public Long countPageByKeywordAndTagIdListJoinCommunityTagJoinTag(List<Integer> tagIdList,
        String keyword) {
        return queryFactory
            .select(community).distinct()
            .from(community)
            .leftJoin(community.communityTagList, communityTag)
            .leftJoin(communityTag.tag, tag)
            .where(containsKeyword(keyword), inTagIdList(tagIdList))
            .fetchCount();
    }

    @Override
    public List<Community> findPageByKeywordAndTagIdListJoinCommunityTagJoinTag(
        List<Integer> tagIdList, String keyword, Pageable pageable) {
        JPAQuery<Community> query = queryFactory
            .select(community)
            .from(community)
            .leftJoin(community.communityTagList, communityTag).fetchJoin()
            .leftJoin(communityTag.tag, tag).fetchJoin()
            .where(containsKeyword(keyword), inTagIdList(tagIdList))
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize());

        for (Sort.Order o : pageable.getSort()) {
            PathBuilder pathBuilder = new PathBuilder(community.getType(), community.getMetadata());
            OrderSpecifier orderSpecifier = new OrderSpecifier(
                o.isAscending() ? Order.ASC : Order.DESC, pathBuilder.get(o.getProperty()));
            query.orderBy(orderSpecifier);
        }

        return query.fetch();
    }


    @Override
    public Long countDistinctFromCommentByMemberJoinCommunity(Member member) {
        return queryFactory
            .select(community.countDistinct())
            .from(comment)
            .leftJoin(comment.community, community)
            .where(comment.member.eq(member))
            .fetchOne();
    }

    @Override
    public List<Community> findPageFromCommentByMemberJoinCommunity(Member member,
        Pageable pageable) {
        return queryFactory
            .select(community).distinct()
            .from(comment)
            .leftJoin(comment.community, community)
            .where(comment.member.eq(member))
            .orderBy(comment.createTime.desc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();
    }

    @Override
    public List<Community> findPageFromCommunityScrapByMemberJoinCommunity(Member member,
        Pageable pageable) {
        return queryFactory
            .select(community)
            .from(communityScrap)
            .leftJoin(communityScrap.community, community)
            .where(communityScrap.member.eq(member))
            .orderBy(communityScrap.createTime.desc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();
    }

    private BooleanExpression containsKeyword(String keyword) {
        return keyword != null ? community.title.contains(keyword)
            .or(community.content.contains(keyword)) : null;
    }

    private BooleanExpression inTagIdList(List<Integer> tagIdList) {
        return tagIdList.size() != 0 ? tag.tagId.in(tagIdList) : null;
    }

    //0rderSpecifier 구현
    private List<OrderSpecifier> getOrderSpecifier(Sort sort) {
        List<OrderSpecifier> orders = new ArrayList<>();

        // Sort
        sort.stream().forEach(order -> {
            Order direction = order.isAscending() ? Order.ASC : Order.DESC;
            String prop = order.getProperty();
            PathBuilder orderByExpression = new PathBuilder(Community.class, "community");
            orders.add(new OrderSpecifier(direction, orderByExpression.get(prop)));
        });
        return orders;
    }
}
