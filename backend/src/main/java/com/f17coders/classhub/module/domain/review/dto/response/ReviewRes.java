package com.f17coders.classhub.module.domain.review.dto.response;

import com.f17coders.classhub.module.domain.member.dto.response.MemberNickNameImageRes;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record ReviewRes(
	int reviewId,
	int lectureId,
	MemberNickNameImageRes member,
	LocalDateTime createTime,
	Float score,
	String content

) {

}
