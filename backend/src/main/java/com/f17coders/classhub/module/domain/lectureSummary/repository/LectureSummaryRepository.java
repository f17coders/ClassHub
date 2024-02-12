package com.f17coders.classhub.module.domain.lectureSummary.repository;

import com.f17coders.classhub.module.domain.lectureSummary.LectureSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LectureSummaryRepository extends JpaRepository<LectureSummary, Integer>,
        LectureSummaryRepositoryCustom {

}
