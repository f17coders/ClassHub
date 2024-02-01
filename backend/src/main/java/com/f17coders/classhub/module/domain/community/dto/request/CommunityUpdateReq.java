package com.f17coders.classhub.module.domain.community.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record CommunityUpdateReq(
    @NotBlank(message = "제목은 필수 입니다!")
    String title,
    String content,
    List<Integer> tagList
) {

}