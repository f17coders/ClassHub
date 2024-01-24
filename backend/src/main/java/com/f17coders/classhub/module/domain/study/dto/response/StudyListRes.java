package com.f17coders.classhub.module.domain.study.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record StudyListRes (
    List<StudyListDetailRes> studyList,
    int totalPages
){}
