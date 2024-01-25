package com.f17coders.classhub.module.domain.tag.repository;

import com.f17coders.classhub.module.domain.tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer>, TagRepositoryCustom {
}
