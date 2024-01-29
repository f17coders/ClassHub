package com.f17coders.classhub.module.domain.lecture.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record LectureCompareRes(
	int lectureId,
	String lectureName,
	String siteType,
	String siteLink,
	String instructor,
	float combinedRating,
	int combinedRatingCount,
	int priceOriginal,
	int priceSale,
	int discountRate,
	int siteStudentCount,
	int lectureLikeCount,
	String gptReviewGood,
	String gptReviewBad,
	String curriculum,
	List<String> tagList

) {

}
