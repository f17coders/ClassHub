package com.f17coders.classhub.module.domain.category.Dto.resource;

import lombok.Builder;

import java.util.List;

@Builder
public record CategoryListRes (
        List<CategoryRes> categoryList
){}
