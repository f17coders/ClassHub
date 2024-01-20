package com.f17coders.classhub.module.domain.community.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CommunityUpdateReq(
        @NotBlank(message = "제목은 필수 입니다!")
        String title,
        String content,
        String tagList
) {
}