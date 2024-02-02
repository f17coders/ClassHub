package com.f17coders.classhub.module.domain.review.repository;

import static com.f17coders.classhub.module.domain.review.QSiteReview.siteReview;

import com.f17coders.classhub.module.domain.review.dto.response.SiteReviewRes;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class SiteReviewRepositoryImpl implements SiteReviewRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public SiteReviewRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}


	@Override
	public List<SiteReviewRes> findSiteReviewsByLectureId(int lectureId, Pageable pageable) {
		return queryFactory.select(Projections.constructor(SiteReviewRes.class,
				siteReview.siteReviewId,
				siteReview.lecture.lectureId,
				Expressions.numberTemplate(Float.class, "ROUND({0}, 1)",
					siteReview.score).as("score"),
				siteReview.content
			))
			.from(siteReview)
			.where(siteReview.lecture.lectureId.eq(lectureId))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	@Override
	public int countSiteReviewByLectureId(int lectureId) {
		return Math.toIntExact(queryFactory
			.select(siteReview.count())
			.from(siteReview)
			.where(siteReview.lecture.lectureId.eq(lectureId))
			.fetchFirst());
	}
}
