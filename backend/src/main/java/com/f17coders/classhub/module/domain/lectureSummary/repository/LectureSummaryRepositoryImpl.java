package com.f17coders.classhub.module.domain.lectureSummary.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

@Repository
public class LectureSummaryRepositoryImpl {
    private final JPAQueryFactory queryFactory;

    public LectureSummaryRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }



}
