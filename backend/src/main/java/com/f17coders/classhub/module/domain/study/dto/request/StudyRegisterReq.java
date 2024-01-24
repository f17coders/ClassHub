package com.f17coders.classhub.module.domain.study.dto.request;

import com.f17coders.classhub.module.domain.tag.Tag;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record StudyRegisterReq(
    @NotBlank(message = "제목은 필수 입니다!")
    String title,

    @Max(value = 10)
    Integer capacity,
    Integer lectureId,

    boolean isPublic,

    String description,
    List<Integer> tagList
) {}
