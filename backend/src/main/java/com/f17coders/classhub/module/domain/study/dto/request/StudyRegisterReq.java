package com.f17coders.classhub.module.domain.study.dto.request;

import com.f17coders.classhub.module.domain.tag.Tag;
import jakarta.validation.constraints.*;

import java.util.List;

public record StudyRegisterReq(
        @NotBlank(message = "제목은 필수 입니다!")
        String title,

        @Max(value = 10)
        @Min(value = 1)
        int capacity,

        int lectureId,

        boolean isPublic,

        @NotBlank(message = "설명은 필수 입니다!")
        String description,

        @NotNull(message = "태그는 필수 입니다!")
        @Size(min = 1)
        List<Integer> tagList
) {

}
