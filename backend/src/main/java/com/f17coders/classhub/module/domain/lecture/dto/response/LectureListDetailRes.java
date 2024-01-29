package com.f17coders.classhub.module.domain.lecture.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record LectureListDetailRes(
	int lectureId,
	String lectureName,
	String siteType,
	String instructor,
	String image,
	String level,
	float combinedRating,
	int combinedRatingCount,
	int priceOriginal,
	int priceSale,
	String descriptionSummary,  // 한줄요약
	int totalTime,
	String categoryId,
	String categoryName,
	List<String> tagList,
	int lectureLikeCount
) {

}
