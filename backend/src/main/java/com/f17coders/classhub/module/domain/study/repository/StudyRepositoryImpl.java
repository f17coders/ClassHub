package com.f17coders.classhub.module.domain.study.repository;

import com.f17coders.classhub.module.domain.lecture.dto.response.LectureBaseRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyBaseRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadRes;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.f17coders.classhub.module.domain.lecture.QLecture.lecture;
import static com.f17coders.classhub.module.domain.study.QStudy.study;
import static com.f17coders.classhub.module.domain.studyMember.QStudyMember.studyMember;

@Repository
public class StudyRepositoryImpl implements StudyRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public StudyRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public StudyReadRes findStudyByStudyIdFetchJoinLecture(int studyId) {
        // 현재 인원을 구하기 위한 서브쿼리
        SubQueryExpression<Long> subQuery = getCurrentMembers();

        return queryFactory
            .select(Projections.constructor(StudyReadRes.class,
                study.studyId
                , study.title
                , subQuery
                , study.capacity
                , study.studyLeader.memberId.as("studyLeaderId")
                , study.description
                , study.isPublic
                , Projections.constructor(LectureBaseRes.class,
                    lecture.lectureId,
                    lecture.name,
                    lecture.instructor)
            ))
            .from(study)
            .leftJoin(study.lecture, lecture)
            .where(study.studyId.eq(studyId))
            .fetchFirst();
    }


    @Override
    public List<StudyReadRes> findStudyByKeywordFetchJoinLecture(String keyword, int recuritment,
        Pageable pageable) {

        // 현재 인원을 구하기 위한 서브쿼리
        SubQueryExpression<Long> subQuery = getCurrentMembers();

        List<StudyReadRes> studyReadResList =
            queryFactory
                .select(Projections.constructor(StudyReadRes.class,
                    study.studyId
                    , study.title
                    , subQuery
                    , study.capacity
                    , study.studyLeader.memberId.as("studyLeaderId")
                    , study.description
                    , study.isPublic
                    , Projections.constructor(LectureBaseRes.class,
                        lecture.lectureId,
                        lecture.name,
                        lecture.instructor)
                ))
                .from(study)
                .leftJoin(study.lecture, lecture)
                .where(studyTitleOrDescriptionContain(keyword).and(
                    capacityExpresson(recuritment, subQuery)))
                .orderBy(study.createTime.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return studyReadResList;
    }

    @Override
    public int countStudyByKeywordAndRecuritment(String keyword, int recuritment) {
        // 현재 인원을 구하기 위한 서브쿼리
        SubQueryExpression<Long> subQuery = getCurrentMembers();

        return Math.toIntExact(queryFactory
            .select(study.count())
            .from(study)
            .where(studyTitleOrDescriptionContain(keyword).and(
                capacityExpresson(recuritment, subQuery)))
            .fetchFirst());
    }

    @Override
    public int findEnterCodeByStudyId(int studyId) {
        return queryFactory
            .select(study.enterCode)
            .from(study)
            .where(study.studyId.eq(studyId))
            .fetchFirst();
    }

    @Override
    public List<StudyBaseRes> findStudyFetchJoinStudyMemberByMemberId(int memberId) {
        return queryFactory
            .select(Projections.constructor(StudyBaseRes.class,
                study.studyId,
                study.title
            ))
            .from(study)
            .innerJoin(study.studyMemberList, studyMember)
            .where(studyMember.member.memberId.eq(memberId))
            .orderBy(study.createTime.desc())
            .fetch();
    }

    private SubQueryExpression<Long> getCurrentMembers() {
        return JPAExpressions
            .select(studyMember.member.memberId.count().as("currentMembers"))
            .from(studyMember)
            .where(study.studyId.eq(studyMember.study.studyId))
            .groupBy(study.studyId);
    }

    private BooleanExpression studyTitleOrDescriptionContain(String keyword) {
        if (keyword != null) {
            return study.title.contains(keyword).or(study.description.contains(keyword))
                .or(lecture.name.contains(keyword));
        } else {
            return null;
        }
    }

    private BooleanExpression capacityExpresson(int recuritment,
        SubQueryExpression<Long> currrentMembers) {
        // recuritment => 0 전체 1 모집중 2 모집완료
        if (recuritment == 1) {
            return study.capacity.gt(currrentMembers);
        } else if (recuritment == 2) {
            return study.capacity.loe(currrentMembers);
        } else {
            return null;
        }
    }
}
