package com.f17coders.classhub.module.domain.review.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record SiteReviewListRes(
	List<SiteReviewRes> siteReviewResList,
	int totalPages
) {

}
