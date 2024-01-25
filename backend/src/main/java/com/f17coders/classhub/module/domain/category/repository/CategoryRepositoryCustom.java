package com.f17coders.classhub.module.domain.category.repository;

import com.f17coders.classhub.module.domain.category.Dto.resource.CategoryRes;

import java.util.List;

public interface CategoryRepositoryCustom{
    List<CategoryRes> findCategory();
}
