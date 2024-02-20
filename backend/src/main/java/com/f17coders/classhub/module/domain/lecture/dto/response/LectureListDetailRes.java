package com.f17coders.classhub.module.domain.lecture.dto.response;

import com.f17coders.classhub.module.domain.category.dto.resource.CategoryRes;
import com.f17coders.classhub.module.domain.lecture.Level;
import com.f17coders.classhub.module.domain.lecture.SiteType;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import lombok.Builder;

import java.util.List;

@Builder
public record LectureListDetailRes(
	int lectureId,
	String lectureName,
	SiteType siteType,
	String instructor,
	String image,
	Level level,
	float combinedRating,
	int combinedRatingCount,
	int priceOriginal,
	int priceSale,
	String descriptionSummary,  // 한줄요약
	int totalTime,
	CategoryRes category,
	List<TagRes> tagList,
	int lectureLikeCount
) {

}
