package com.f17coders.classhub.module.domain.memberTag.repository;

import static com.f17coders.classhub.module.domain.memberTag.QMemberTag.memberTag;

import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;

public class MemberTagRepositoryImpl implements MemberTagRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MemberTagRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<MemberTag> findByMemberIdFetchJoinMemberAndFetchJoinTag(int memberId) {
        return queryFactory
            .selectFrom(memberTag)
            .leftJoin(memberTag.member).fetchJoin()
            .leftJoin(memberTag.tag).fetchJoin()
            .where(memberTag.member.memberId.eq(memberId))
            .fetch();
    }
}
