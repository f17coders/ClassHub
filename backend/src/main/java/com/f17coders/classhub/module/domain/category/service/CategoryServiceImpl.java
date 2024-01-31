package com.f17coders.classhub.module.domain.category.service;

import com.f17coders.classhub.module.domain.category.dto.resource.CategoryListRes;
import com.f17coders.classhub.module.domain.category.dto.resource.CategoryRes;
import com.f17coders.classhub.module.domain.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    @Override
    public CategoryListRes getCategoryList() {
        List<CategoryRes> categoryResList = categoryRepository.findCategory();

        return CategoryListRes.builder()
                .categoryList(categoryResList)
                .build();
    }
}
