package com.f17coders.classhub.module.domain.community.dto.response;

import com.f17coders.classhub.module.domain.comment.dto.response.CommentDetailRes;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record CommunityReadRes(
    int communityId,
    String title,
    String content,
    String memberNickname,
    List<TagRes> tagList,
    List<CommentDetailRes> commentList,
    int viewCount,
    int commentCount,
    boolean canUpdate,
    boolean canLike,
    boolean canScrap,
    LocalDateTime createdAt
) {

}
