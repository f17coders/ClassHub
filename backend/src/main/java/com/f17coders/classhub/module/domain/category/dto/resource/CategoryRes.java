package com.f17coders.classhub.module.domain.category.dto.resource;

import lombok.Builder;

@Builder
public record CategoryRes (
    int categoryId,
    String categoryName

){}
