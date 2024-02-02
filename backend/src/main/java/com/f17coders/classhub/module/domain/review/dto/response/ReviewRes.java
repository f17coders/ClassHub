package com.f17coders.classhub.module.domain.review.dto.response;

import com.f17coders.classhub.module.domain.member.dto.response.MemberNickNameImageRes;
import lombok.Builder;

@Builder
public record ReviewRes(
	int reviewId,
	int lectureId,
	MemberNickNameImageRes member,
	Float score,
	String content

) {

}
