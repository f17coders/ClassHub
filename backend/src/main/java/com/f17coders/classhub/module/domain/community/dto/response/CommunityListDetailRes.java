package com.f17coders.classhub.module.domain.community.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record CommunityListDetailRes(
        int communityId,
        String title,
        String content,
        String memberNickname,
        List<String> tagList,
        int commentCount,
        int likeCount,
        int scrapCount,
        LocalDateTime createdAt // TODO : 날짜 어떠한 형식으로 프론트에 전달할 지 상의 필요
) {
}