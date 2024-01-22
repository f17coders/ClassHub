package com.f17coders.classhub.module.domain.comment.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CommentDetailRes(
        int commentId,
        String content,
        String memberNickname,
        String memberProfileImg,
        boolean canUpdate,
        LocalDateTime createdAt
) {
}
