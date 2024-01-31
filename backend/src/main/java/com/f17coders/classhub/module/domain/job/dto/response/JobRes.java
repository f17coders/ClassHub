package com.f17coders.classhub.module.domain.job.dto.response;

import lombok.Builder;

@Builder
public record JobRes(
    int jobId,
    String name
) {

}
