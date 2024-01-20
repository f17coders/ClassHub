package com.f17coders.classhub.module.domain.community.dto.response;

import com.f17coders.classhub.module.domain.comment.dto.response.CommentDetailRes;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record CommunityReadRes(
        String title,
        String content,
        String memberNickname,
        List<String> tagList,
        List<CommentDetailRes> commentList,
        int viewCount,
        int commentCount,
        boolean canUpdate,
        boolean canLike,
        boolean canScrap,
        LocalDateTime createdAt // TODO : 날짜 어떠한 형식으로 프론트에 전달할 지 상의 필요
) {
}
