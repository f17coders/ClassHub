package com.f17coders.classhub.module.domain.tag.dto.response;

import lombok.*;

import java.util.List;

@Builder
public record TagListRes(
        List<TagRes> tagList
) {}
