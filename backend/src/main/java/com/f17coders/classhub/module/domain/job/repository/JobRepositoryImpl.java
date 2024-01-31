package com.f17coders.classhub.module.domain.job.repository;

import static com.f17coders.classhub.module.domain.job.QJob.job;
import static com.f17coders.classhub.module.domain.member.QMember.member;

import com.f17coders.classhub.module.domain.job.Job;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;

public class JobRepositoryImpl implements JobRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public JobRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<Job> findJobByKeywordFetchJoinMemberOrderByMemberSize(String keyword) {
        return queryFactory
            .selectFrom(job)
            .leftJoin(job.memberList, member).fetchJoin()
            .where(jobNameContain(keyword))
            .orderBy(job.memberList.size().desc())
            .fetch();
    }

    private BooleanExpression jobNameContain(String keyword) {
        return keyword != null ? job.name.contains(keyword) : null;
    }
}
