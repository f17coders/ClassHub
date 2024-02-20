package com.f17coders.classhub.module.domain.member.repository;

import static com.f17coders.classhub.module.domain.job.QJob.job;
import static com.f17coders.classhub.module.domain.member.QMember.member;
import static com.f17coders.classhub.module.domain.studyMember.QStudyMember.studyMember;

import com.f17coders.classhub.module.domain.job.dto.response.JobRes;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Optional<Member> findByIdFetchJoinJob(int memberId) {
        Member memberEntity = queryFactory
            .selectFrom(member)
            .leftJoin(member.job, job).fetchJoin()
            .where(member.memberId.eq(memberId))
            .fetchOne();

        return Optional.ofNullable(memberEntity);
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
            .leftJoin(member.job, job)
            .where(studyMember.study.studyId.eq(studyId))
            .fetch();
    }

    @Override
    public MemberStudyInfoRes findMemberStudyInfoResByMemberId(int memberId) {
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
            .from(member)
            .leftJoin(member.job, job)
            .where(member.memberId.eq(memberId))
            .fetchFirst();
    }
}
