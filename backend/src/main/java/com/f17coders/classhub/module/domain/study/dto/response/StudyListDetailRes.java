package com.f17coders.classhub.module.domain.study.dto.response;

import com.f17coders.classhub.module.domain.tag.Tag;
import lombok.Builder;

import java.util.List;

@Builder
public record StudyListDetailRes (
    int studyId,
    String title,
    Integer currentMembers,
    Integer capacity,
    String description,
    boolean isPublic,

    List<Tag> tagList
){}
