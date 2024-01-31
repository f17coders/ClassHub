package com.f17coders.classhub.module.domain.lecture.repository;

import static com.f17coders.classhub.module.domain.category.QCategory.category;
import static com.f17coders.classhub.module.domain.lecture.QLecture.lecture;
import static com.f17coders.classhub.module.domain.lectureLike.QLectureLike.lectureLike;

import com.f17coders.classhub.module.domain.category.dto.resource.CategoryRes;
import com.f17coders.classhub.module.domain.lecture.Level;
import com.f17coders.classhub.module.domain.lecture.SiteType;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailLectureLikeCountRes;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
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
	public int countLectureBySearchCond(String categoryName,
		String keyword, String level, String site) {
		return Math.toIntExact(queryFactory
			.select(lecture.count())
			.from(lecture)
			.where(searchCond(categoryName, keyword, level, site))
			.fetchFirst());
	}

	public List<LectureListDetailLectureLikeCountRes> findLecturesBySearchCond(String categoryName,
		String keyword, String level, String site, String order, Pageable pageable) {
		List<LectureListDetailLectureLikeCountRes> lectureListDetailLectureLikeCountRes = queryFactory.select(
				Projections.constructor(LectureListDetailLectureLikeCountRes.class,
					lecture.lectureId,
					lecture.name,
					lecture.siteType,
					lecture.instructor,
					lecture.image,
					lecture.level,
					Expressions.numberTemplate(Float.class,
						"CASE WHEN {1} < 10 THEN ({0} * 0.2 + {2} * {3} * 0.8) / ({1} * 0.2 + {3} * 0.8) "
							+
							"ELSE ({0} * 0.5 + {2} * {3} * 0.5) / ({1} * 0.5 + {3} * 0.5) END",
						lecture.reviewSum, lecture.reviewCount, lecture.siteReviewRating,
						lecture.siteReviewCount).as("combinedRating"),
					Expressions.numberTemplate(Integer.class, "{0} + {1}", lecture.reviewCount,
						lecture.siteReviewCount).as("combinedRatingCount"),
					lecture.priceOriginal,
					lecture.priceSale,
					lecture.descriptionSummary,
					lecture.totalTime,
					Projections.constructor(CategoryRes.class,
						category.categoryId,
						category.categoryName
					),
					Expressions.numberTemplate(Integer.class, "{0}",
						JPAExpressions
							.select(lectureLike.lecture.lectureId.count())
							.from(lectureLike)
							.where(lecture.lectureId.eq(lectureLike.lecture.lectureId))
							.groupBy(lecture.lectureId)).as("lectureLikeCount")
				))
			.from(lecture)
			.where(searchCond(categoryName, keyword, level, site))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

//		for (LectureListDetailLectureLikeCountRes ll : lectureListDetailLectureLikeCountRes) {
//			System.out.println(ll);
//			break;
//		}

		return lectureListDetailLectureLikeCountRes;


	}

	private BooleanExpression categoryNameEq(String categoryName) {
		return StringUtils.hasText(categoryName) ? lecture.category.categoryName.eq(categoryName)
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


	// BooleanBuilder
	private BooleanBuilder searchCond(String categoryName, String keyword, String level,
		String site) {
		BooleanBuilder builder = new BooleanBuilder();

		return builder
			.and(siteEq(site))
			.and(levelEq(level))
			.and(categoryNameEq(categoryName))
			.and(keywordLike(keyword));
	}

}
