package com.f17coders.classhub.module.domain.lecture.dto.response;

import com.f17coders.classhub.module.domain.category.Category;
import com.f17coders.classhub.module.domain.category.dto.resource.CategoryRes;
import com.f17coders.classhub.module.domain.lecture.Level;
import com.f17coders.classhub.module.domain.lecture.SiteType;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import java.util.List;
import lombok.Builder;

@Builder
public record LectureReadRes(
	int lectureId,
	String lectureName,
	String instructor,
	String image,
	Level level,
	SiteType siteType,
	String siteLink,
	int priceOriginal,
	int priceSale,
	Integer totalTime, // null인경우는 프론트에서 숨긴다.
	String curriculum,
	CategoryRes category,
	List<TagRes> tagList,
	int lectureLikeCount,
	float combinedRating,
	int combinedRatingCount,
	float reviewRating,
	int reviewCount,
	float siteReviewRating,
	int siteReviewCount,
	int siteStudentCount,
	String gptReview,
	String descriptionSummary,  // 한줄요약
	List<String> summary, // 배울내용
	String descriptionDetail,
	boolean canBuy

) {

}
