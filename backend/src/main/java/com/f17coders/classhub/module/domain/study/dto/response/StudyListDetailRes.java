package com.f17coders.classhub.module.domain.study.dto.response;

import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import lombok.Builder;

@Builder
public record StudyListDetailRes(
    int studyId,
    String title,
    long currentMembers,
    int capacity,

    int studyReaderId,
    String description,
    boolean isPublic,
    TagRes tag

) {

}
