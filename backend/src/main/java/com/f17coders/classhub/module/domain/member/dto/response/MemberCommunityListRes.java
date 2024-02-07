package com.f17coders.classhub.module.domain.member.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record MemberCommunityListRes(
    List<MemberCommunityDetailRes> communityList,
    long totalPages
) {

}
