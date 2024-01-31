package com.f17coders.classhub.module.domain.member.dto.request;

import java.util.List;

public record MemberAddInfoReq(
    List<Integer> tagList,
    int jobId
) {
}
