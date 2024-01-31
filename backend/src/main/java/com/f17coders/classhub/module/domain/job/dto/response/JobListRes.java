package com.f17coders.classhub.module.domain.job.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record JobListRes(
    List<JobRes> jobList
) {

}
