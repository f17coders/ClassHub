package com.f17coders.classhub.module.domain.lecture.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record LectureReadRes(
	int lectureId,
	String lectureName,
	String instructor,
	String image,
	String level,
	String siteType,
	String siteLink,
	int priceOriginal,
	int priceSale,
	int totalTime,
	String curriculum,
	int categoryId,
	String categoryName,
	List<String> tagList,
	int lectureLikeCount,
	float combinedRating,
	int combinedRatingCount,
	float reviewRating,
	int reviewCount,
	float siteReviewRating,
	int siteReviewCount,
	String gptReviewGood,
	String gptReviewBad,
	String descriptionSummary,  // 한줄요약
	String summary, // 배울내용
	String descriptionDetail

) {

}
