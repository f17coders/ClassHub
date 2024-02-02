package com.f17coders.classhub.module.domain.member.repository;

import static com.f17coders.classhub.module.domain.job.QJob.job;
import static com.f17coders.classhub.module.domain.member.QMember.member;
import static com.f17coders.classhub.module.domain.study.QStudy.study;
import static com.f17coders.classhub.module.domain.studyMember.QStudyMember.studyMember;

import com.f17coders.classhub.module.domain.job.dto.response.JobRes;
import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<MemberStudyInfoRes> findMemberFetchJoinStudyMemberByStudyId(
        int studyId) {

        return queryFactory
            .select(Projections.constructor(MemberStudyInfoRes.class,
                member.memberId,
                member.nickname,
                member.profileImage,
                Projections.constructor(JobRes.class,
                    job.jobId,
                    job.name
                )
            ))
            .from(studyMember)
            .join(studyMember.member, member)
            .join(member.job, job)
            .where(studyMember.study.studyId.eq(studyId))
            .fetch();
    }
}
