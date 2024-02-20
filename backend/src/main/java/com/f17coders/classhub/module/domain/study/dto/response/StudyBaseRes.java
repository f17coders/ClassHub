package com.f17coders.classhub.module.domain.study.dto.response;

import lombok.Builder;

@Builder
public record StudyBaseRes(

    int studyId,
    String title

) {

}
