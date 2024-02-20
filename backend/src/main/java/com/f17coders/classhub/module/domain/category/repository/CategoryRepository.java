package com.f17coders.classhub.module.domain.category.repository;

import com.f17coders.classhub.module.domain.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer>, CategoryRepositoryCustom {
}
