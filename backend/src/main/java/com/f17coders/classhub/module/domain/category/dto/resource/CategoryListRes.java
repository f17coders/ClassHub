package com.f17coders.classhub.module.domain.category.dto.resource;

import lombok.Builder;

import java.util.List;

@Builder
public record CategoryListRes (
        List<CategoryRes> categoryList
){}
