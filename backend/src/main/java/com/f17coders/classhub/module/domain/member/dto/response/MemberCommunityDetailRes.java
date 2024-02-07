package com.f17coders.classhub.module.domain.member.dto.response;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record MemberCommunityDetailRes(
    int communityId,
    String title,
    String content,
    LocalDateTime createdAt
) {

}