package com.f17coders.classhub.module.domain.review.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record ReviewListRes(
	List<ReviewRes> reviewResList,
	int totalPages
) {

}
