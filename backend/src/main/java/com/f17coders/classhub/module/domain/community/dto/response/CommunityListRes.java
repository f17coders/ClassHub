package com.f17coders.classhub.module.domain.community.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record CommunityListRes(
        List<CommunityListDetailRes> communityList,
        int totalPages
) {
}
