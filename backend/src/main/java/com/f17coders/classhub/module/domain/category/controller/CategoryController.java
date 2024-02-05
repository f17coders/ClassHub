package com.f17coders.classhub.module.domain.category.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.category.dto.resource.CategoryListRes;
import com.f17coders.classhub.module.domain.category.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name ="category", description = "카테고리 API")
@RestController
@RequestMapping("/api/category/v0")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "카테고리 조회 API")
    @GetMapping
    public ResponseEntity<BaseResponse<CategoryListRes>> getCategoryList() {
        CategoryListRes categoryListRes = categoryService.getCategoryList();

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, categoryListRes);
    }
}
