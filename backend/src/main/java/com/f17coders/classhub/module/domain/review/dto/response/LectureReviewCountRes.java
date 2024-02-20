package com.f17coders.classhub.module.domain.review.dto.response;

import lombok.Builder;

@Builder
public record LectureReviewCountRes(
        int lectureId,
        int reviewCount
) {
}
