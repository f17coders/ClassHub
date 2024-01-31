package com.f17coders.classhub.module.domain.tag.dto.response;

import lombok.*;


@Builder
public record TagRes (

    int tagId,
    String name
) {}
