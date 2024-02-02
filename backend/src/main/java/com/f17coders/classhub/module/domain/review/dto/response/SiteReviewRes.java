package com.f17coders.classhub.module.domain.review.dto.response;

import lombok.Builder;

@Builder
public record SiteReviewRes(
	int siteReviewId,
	int lectureId,
	Float score,
	String content

) {

}
