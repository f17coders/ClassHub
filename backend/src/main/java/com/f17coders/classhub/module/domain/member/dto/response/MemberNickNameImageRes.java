package com.f17coders.classhub.module.domain.member.dto.response;

import lombok.Builder;

@Builder
public record MemberNickNameImageRes(
	String nickname,
	String profileImage
) {

}
