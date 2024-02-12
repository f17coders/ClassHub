package com.f17coders.classhub.module.domain.review.repository;

import static com.f17coders.classhub.module.domain.lecture.QLecture.lecture;
import static com.f17coders.classhub.module.domain.member.QMember.member;
import static com.f17coders.classhub.module.domain.review.QReview.review;
import static com.f17coders.classhub.module.domain.review.QSiteReview.siteReview;

import com.f17coders.classhub.module.domain.member.dto.response.MemberNickNameImageRes;
import com.f17coders.classhub.module.domain.review.dto.response.LectureReviewCountRes;
import com.f17coders.classhub.module.domain.review.dto.response.ReviewRes;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewRepositoryImpl implements ReviewRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public ReviewRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	public List<ReviewRes> findReviewsByLectureIdJoinMemberId(int lectureId, String order, Pageable pageable) {

		return queryFactory.select(Projections.constructor(ReviewRes.class,
				review.reviewId,
				review.lecture.lectureId,
				Projections.constructor(MemberNickNameImageRes.class,
					member.nickname,
					Expressions.stringTemplate(
						"COALESCE({0}, 'https://simage-kr.uniqlo.com/goods/31/11/77/82/414920_COL_COL99_1000.jpg')",
						member.profileImage).as("profileImage")),
				review.updateTime,
				Expressions.numberTemplate(Float.class, "ROUND({0}, 1)",
					review.score).as("score"),
				review.content
			))
			.from(review)
			.innerJoin(member)
			.on(review.member.memberId.eq(member.memberId))
			.where(review.lecture.lectureId.eq(lectureId).and(review.content.ne("")))
			.orderBy(orderExpression(order))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	@Override
	public int countReviewByLectureId(int lectureId) {
		return Math.toIntExact(queryFactory
			.select(review.count())
			.from(review)
			.where(review.lecture.lectureId.eq(lectureId).and(review.content.ne("")))
			.fetchFirst());
	}

	@Override
	public List<LectureReviewCountRes> getLectureReviewCounts() {
		List<LectureReviewCountRes> reviewCountList = queryFactory.select(Projections.constructor(LectureReviewCountRes.class,
						lecture.lectureId,
						review.lecture.lectureId.count().castToNum(Integer.class)
				))
				.from(review)
				.groupBy(review.lecture.lectureId)
				.fetch();
		return reviewCountList;
	}

	private OrderSpecifier orderExpression(String order) {
		if (order.equals("lowest-ranking")) {
			return review.score.asc();
		} else if (order.equals("latest")) {
			return review.updateTime.desc();
		}
		return review.score.desc();

	}

}
