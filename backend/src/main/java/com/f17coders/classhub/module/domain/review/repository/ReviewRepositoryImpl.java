package com.f17coders.classhub.module.domain.review.repository;

import static com.f17coders.classhub.module.domain.member.QMember.member;
import static com.f17coders.classhub.module.domain.review.QReview.review;

import com.f17coders.classhub.module.domain.member.dto.response.MemberNickNameImageRes;
import com.f17coders.classhub.module.domain.review.dto.response.ReviewRes;
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

	public List<ReviewRes> findReviewsByLectureIdJoinMemberId(int lectureId, Pageable pageable) {

		return queryFactory.select(Projections.constructor(ReviewRes.class,
				review.reviewId,
				review.lecture.lectureId,
				Projections.constructor(MemberNickNameImageRes.class,
					member.nickname,
					Expressions.stringTemplate(
						"COALESCE({0}, 'https://simage-kr.uniqlo.com/goods/31/11/77/82/414920_COL_COL99_1000.jpg')",
						member.profileImage).as("profileImage")),
				Expressions.numberTemplate(Float.class, "ROUND({0}, 1)",
					review.score).as("score"),
				review.content
			))
			.from(review)
			.innerJoin(member)
			.on(review.member.memberId.eq(member.memberId))
			.where(review.lecture.lectureId.eq(lectureId))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	@Override
	public int countReviewByLectureId(int lectureId) {
		return Math.toIntExact(queryFactory
			.select(review.count())
			.from(review)
			.where(review.lecture.lectureId.eq(lectureId))
			.fetchFirst());
	}
}
