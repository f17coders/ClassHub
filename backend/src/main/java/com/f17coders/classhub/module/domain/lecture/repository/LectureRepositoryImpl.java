package com.f17coders.classhub.module.domain.lecture.repository;

import static com.f17coders.classhub.module.domain.category.QCategory.category;
import static com.f17coders.classhub.module.domain.lecture.QLecture.lecture;
import static com.f17coders.classhub.module.domain.lectureBuy.QLectureBuy.lectureBuy;
import static com.f17coders.classhub.module.domain.lectureSummary.QLectureSummary.lectureSummary;
import static com.f17coders.classhub.module.domain.member.QMember.member;
import static com.f17coders.classhub.module.domain.lectureLike.QLectureLike.lectureLike;
import static com.f17coders.classhub.module.domain.lectureTag.QLectureTag.lectureTag;

import com.f17coders.classhub.module.domain.category.dto.resource.CategoryRes;
import com.f17coders.classhub.module.domain.lecture.Level;
import com.f17coders.classhub.module.domain.lecture.SiteType;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailLectureLikeCountRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadLectureLikeCountRes;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
public class LectureRepositoryImpl implements LectureRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public LectureRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public int countLectureBySearchCond(Integer categoryId, String tags,
		String keyword, String level, String site) {
		return Math.toIntExact(queryFactory
			.select(lecture.count())
			.from(lecture)
			.where(searchCond(categoryId, tags, keyword, level, site))
			.fetchFirst());
	}

	// select안의 Projections 중복사용된다. 리팩토링 필요
	@Override
	public LectureReadLectureLikeCountRes findLectureByLectureId(Integer lectureId) {
		return queryFactory.select(
				Projections.constructor(LectureReadLectureLikeCountRes.class,
					lecture.lectureId,
					lecture.name,
					lecture.instructor,
					Expressions.stringTemplate(
						"COALESCE({0}, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791187395027.jpg')",
						lecture.image).as("image"),
					lecture.level,
					lecture.siteType,
					lecture.siteLink,
					lecture.priceOriginal,
					lecture.priceSale,
					lecture.totalTime,
					lecture.curriculum,
					Projections.constructor(CategoryRes.class,
						category.categoryId,
						category.categoryName
					),
					lectureSummary.lectureLikeCount,
					lectureSummary.combinedRating,
					lectureSummary.combinedRatingCount,
					Expressions.numberTemplate(Float.class,
						"CASE WHEN {1}=0 OR {0}=0 THEN 0 "
							+
							"ELSE ROUND( {0} / {1}, 1) END", lecture.reviewSum,
						lecture.reviewCount).as("reviewRating"),
					lecture.reviewCount,
					Expressions.numberTemplate(Float.class, "ROUND({0}, 1)",
						lecture.siteReviewRating).as("siteReviewRating"),
					lecture.siteReviewCount,
					lecture.siteStudentCount,
					lecture.gptReview,
					lecture.descriptionSummary,
					lecture.summary,
					lecture.descriptionDetail
				))
			.from(lecture)
			.innerJoin(lectureSummary)
			.on(lecture.lectureId.eq(lectureSummary.lectureId))
			.where(lecture.lectureId.eq(lectureId))
			.fetchOne();
	}

	public List<LectureListDetailLectureLikeCountRes> findLecturesBySearchCond(Integer categoryId,
		String tags, String keyword, String level, String site, String order, Pageable pageable) {

		List<LectureListDetailLectureLikeCountRes> lectureListDetailLectureLikeCountRes = queryFactory.select(
				Projections.constructor(LectureListDetailLectureLikeCountRes.class,
					lecture.lectureId,
					lecture.name,
					lecture.siteType,
					lecture.instructor,
					Expressions.stringTemplate(
						"COALESCE({0}, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791187395027.jpg')",
						lecture.image).as("image"),
					lecture.level,
					lectureSummary.combinedRating,
					lectureSummary.combinedRatingCount,
					lecture.priceOriginal,
					lecture.priceSale,
					lecture.descriptionSummary,
					lecture.totalTime,
					Projections.constructor(CategoryRes.class,
						category.categoryId,
						category.categoryName
					),
					lectureSummary.lectureLikeCount)
			)
			.from(lecture)
			.innerJoin(lectureSummary)
			.on(lecture.lectureId.eq(lectureSummary.lectureId))
			.where(searchCond(categoryId, tags, keyword, level, site))
			.orderBy(orderExpression(order))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		return lectureListDetailLectureLikeCountRes;


	}

	@Override
	public List<LectureListDetailLectureLikeCountRes> findTop5LecturesWithTagId(int tagId) {
		List<LectureListDetailLectureLikeCountRes> lectureListDetailLectureLikeCountRes = queryFactory.select(
				Projections.constructor(LectureListDetailLectureLikeCountRes.class,
					lecture.lectureId,
					lecture.name,
					lecture.siteType,
					lecture.instructor,
					Expressions.stringTemplate(
						"COALESCE({0}, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791187395027.jpg')",
						lecture.image).as("image"),
					lecture.level,
					lectureSummary.combinedRating,
					lectureSummary.combinedRatingCount,
					lecture.priceOriginal,
					lecture.priceSale,
					lecture.descriptionSummary,
					lecture.totalTime,
					Projections.constructor(CategoryRes.class,
						category.categoryId,
						category.categoryName
					),
					lectureSummary.lectureLikeCount
				))
			.from(lecture)
			.innerJoin(lectureSummary)
			.on(lecture.lectureId.eq(lectureSummary.lectureId))
			.innerJoin(lecture.category, category)
			.where(lecture.lectureId.in(
				JPAExpressions
					.select(lectureTag.lecture.lectureId)
					.from(lectureTag)
					.where(lectureTag.tag.tagId.eq(tagId))
			))
			.groupBy(lecture.lectureId)
			.orderBy(lecture.count().desc())
			.limit(5)
			.fetch();

		return lectureListDetailLectureLikeCountRes;
	}

	@Override
	public List<LectureListDetailLectureLikeCountRes> findTop5LecturesWithJobId(int jobId) {

		List<LectureListDetailLectureLikeCountRes> lectureListJobResList = queryFactory.select(
				Projections.constructor(LectureListDetailLectureLikeCountRes.class,
					lecture.lectureId,
					lecture.name,
					lecture.siteType,
					lecture.instructor,
					Expressions.stringTemplate(
						"COALESCE({0}, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791187395027.jpg')",
						lecture.image).as("image"),
					lecture.level,
					lectureSummary.combinedRating,
					lectureSummary.combinedRatingCount,
					lecture.priceOriginal,
					lecture.priceSale,
					lecture.descriptionSummary,
					lecture.totalTime,
					Projections.constructor(CategoryRes.class,
						category.categoryId,
						category.categoryName
					),
					lectureSummary.lectureLikeCount
				))
			.from(lecture)
			.innerJoin(lectureSummary)
			.on(lecture.lectureId.eq(lectureSummary.lectureId))
			.innerJoin(lectureLike)
			.on(lecture.lectureId.eq(lectureLike.lecture.lectureId))
			.innerJoin(lectureLike.member, member)
			.innerJoin(lecture.category, category)
			.where(member.job.jobId.eq(jobId))
			.groupBy(lectureLike.lecture)
			.orderBy(lectureLike.lecture.lectureId.count().desc())
			.limit(5)
			.fetch();

		return lectureListJobResList;
	}

	@Override
	public List<LectureListDetailLectureLikeCountRes> findLecturesByMemberJoinLectureBuy(
		int memberId,
		Pageable pageable) {

		List<LectureListDetailLectureLikeCountRes> lectureListDetailLectureLikeCountRes = queryFactory.select(
				Projections.constructor(LectureListDetailLectureLikeCountRes.class,
					lecture.lectureId,
					lecture.name,
					lecture.siteType,
					lecture.instructor,
					Expressions.stringTemplate(
						"COALESCE({0}, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791187395027.jpg')",
						lecture.image).as("image"),
					lecture.level,
						lectureSummary.combinedRating,
						lectureSummary.combinedRatingCount,
					lecture.priceOriginal,
					lecture.priceSale,
					lecture.descriptionSummary,
					lecture.totalTime,
					Projections.constructor(CategoryRes.class,
						category.categoryId,
						category.categoryName
					),
					lectureSummary.lectureLikeCount
				)
			)
			.from(lecture)
			.innerJoin(lectureSummary)
			.on(lecture.lectureId.eq(lectureSummary.lectureId))
			.where(lecture.lectureId.in(JPAExpressions
				.select(lectureBuy.lecture.lectureId)
				.from(lectureBuy)
				.where(lectureBuy.member.memberId.eq(memberId))
				.orderBy(lectureBuy.updateTime.desc())
			))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		return lectureListDetailLectureLikeCountRes;
	}

	@Override
	public List<LectureListDetailLectureLikeCountRes> findLecturesByMemberJoinLectureLike(
		int memberId,
		Pageable pageable) {

		List<LectureListDetailLectureLikeCountRes> lectureListDetailLectureLikeCountRes = queryFactory.select(
				Projections.constructor(LectureListDetailLectureLikeCountRes.class,
					lecture.lectureId,
					lecture.name,
					lecture.siteType,
					lecture.instructor,
					Expressions.stringTemplate(
						"COALESCE({0}, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791187395027.jpg')",
						lecture.image).as("image"),
					lecture.level,
					lectureSummary.combinedRating,
					lectureSummary.combinedRatingCount,
					lecture.priceOriginal,
					lecture.priceSale,
					lecture.descriptionSummary,
					lecture.totalTime,
					Projections.constructor(CategoryRes.class,
						category.categoryId,
						category.categoryName
					),
					lectureSummary.lectureLikeCount
				)
			)
			.from(lecture)
			.innerJoin(lectureSummary)
			.on(lecture.lectureId.eq(lectureSummary.lectureId))
			.where(lecture.lectureId.in(JPAExpressions
				.select(lectureLike.lecture.lectureId)
				.from(lectureLike)
				.where(lectureLike.member.memberId.eq(memberId))
				.orderBy(lectureLike.updateTime.desc())
			))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		return lectureListDetailLectureLikeCountRes;
	}

	@Override
	public int countLectureBuyByMember(int memberId) {
		return Math.toIntExact(queryFactory
			.select(lecture.count())
			.from(lecture)
			.where(lecture.lectureId.in(JPAExpressions
				.select(lectureBuy.lecture.lectureId)
				.from(lectureBuy)
				.where(lectureBuy.member.memberId.eq(memberId))
			))
			.fetchFirst());
	}

	@Override
	public int countLectureLikeByMember(int memberId) {
		return Math.toIntExact(queryFactory
			.select(lecture.count())
			.from(lecture)
			.where(lecture.lectureId.in(JPAExpressions
				.select(lectureLike.lecture.lectureId)
				.from(lectureLike)
				.where(lectureLike.member.memberId.eq(memberId))
			))
			.fetchFirst());
	}

	private OrderSpecifier<?>[] orderExpression(String order) {
		if (order.equals("ranking")) {
			return new OrderSpecifier[] {lectureSummary.combinedRating.desc(), lectureSummary.combinedRatingCount.desc()};
		} else if (order.equals("highest-price")) {
			return new OrderSpecifier[] {lecture.priceSale.desc(), lectureSummary.combinedRating.desc()};
		} else if (order.equals("lowest-price")) {
			return new OrderSpecifier[] {lecture.priceSale.asc(), lectureSummary.combinedRating.desc()};
		} else {
			return new OrderSpecifier[] {lectureSummary.weight.desc()
			};
		}

	}

	private BooleanExpression categoryIdEq(Integer categoryId) {
		return categoryId != null ? lecture.category.categoryId.eq(categoryId)
			: null;
	}

	private BooleanExpression keywordLike(String keyword) {
		return StringUtils.hasText(keyword) ? lecture.name.contains(keyword)
			.or(lecture.instructor.contains(keyword)) : null;
	}

	private BooleanExpression levelEq(String level) {
		return StringUtils.hasText(level) ? lecture.level.eq(Level.valueOf(level)) : null;
	}

	private BooleanExpression siteEq(String site) {
		return StringUtils.hasText(site) ? lecture.siteType.eq(SiteType.valueOf(site)) : null;
	}


	private List<Integer> getIntegerListFromString(String text) {
		if (StringUtils.hasText(text)) {
			String[] array = text.split("\\|\\|");
			List<Integer> integerList = Arrays.stream(array)
				.map(Integer::parseInt)
				.collect(Collectors.toList());
			return integerList;
		}
		return new ArrayList<>();
	}

	private BooleanExpression tagsCond(String tags) {
		List<Integer> tagsList = getIntegerListFromString(tags);
		return tagsList.isEmpty() ? null : lecture.lectureId.in(
			JPAExpressions
				.select(lectureTag.lecture.lectureId)
				.from(lectureTag)
				.where(lectureTag.tag.tagId.in(tagsList)));
	}

	private BooleanBuilder searchCond(Integer categoryId, String tags, String keyword, String level,
		String site) {
		BooleanBuilder builder = new BooleanBuilder();

		return builder
			.and(tagsCond(tags))
			.and(siteEq(site))
			.and(levelEq(level))
			.and(categoryIdEq(categoryId))
			.and(keywordLike(keyword));
	}

}
