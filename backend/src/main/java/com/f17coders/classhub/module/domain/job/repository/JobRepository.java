package com.f17coders.classhub.module.domain.job.repository;

import com.f17coders.classhub.module.domain.job.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Integer>, JobRepositoryCustom {

}
