package com.f17coders.classhub.module.domain.study.repository;

import com.f17coders.classhub.module.domain.study.Study;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StudyRepository extends JpaRepository<Study, UUID> {
}
