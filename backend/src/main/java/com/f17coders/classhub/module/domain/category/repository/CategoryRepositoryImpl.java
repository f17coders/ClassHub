package com.f17coders.classhub.module.domain.category.repository;

import com.f17coders.classhub.module.domain.category.Dto.resource.CategoryRes;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

import static com.f17coders.classhub.module.domain.category.QCategory.category;

public class CategoryRepositoryImpl implements CategoryRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    public CategoryRepositoryImpl(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    @Override
    public List<CategoryRes> findCategory() {
        return queryFactory
                .select(Projections.constructor(CategoryRes.class, category.categoryId, category.categoryName))
                .from(category)
                .fetch();
    }
}
