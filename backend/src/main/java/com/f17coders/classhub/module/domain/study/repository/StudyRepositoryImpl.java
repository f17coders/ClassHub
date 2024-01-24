package com.f17coders.classhub.module.domain.study.repository;

import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadRes;
import com.f17coders.classhub.module.domain.studyTag.StudyTag;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.expression.spel.ast.Projection;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

import static com.f17coders.classhub.module.domain.lecture.QLecture.lecture;
import static com.f17coders.classhub.module.domain.study.QStudy.study;
import static com.f17coders.classhub.module.domain.studyTag.QStudyTag.studyTag;
import static com.f17coders.classhub.module.domain.tag.QTag.tag;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.types.Projections.list;

@Repository
public class StudyRepositoryImpl implements StudyRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public StudyRepositoryImpl(EntityManager em) {this.queryFactory = new JPAQueryFactory(em);}
    @Override
    public Study findStudyByStudyIdFetchJoinLecture(int studyId) {
        return queryFactory
                .selectFrom(study)
                .leftJoin(study.lecture, lecture).fetchJoin()
                .where(study.studyId.eq(studyId))
                .fetchOne();
    }

//    @Override
//    public List<StudyTag> findStudyByStudyIdFetchJoinTagFetJoinStudyTag(int studyId) {
//        return queryFactory
//                .selectFrom(studyTag)
//                .leftJoin(studyTag.study, study)
//                .leftJoin(studyTag.tag, tag)
//                .distinct()
//                .where(study.studyId.eq(studyId))
//                .fetchOne();
//    }
}
