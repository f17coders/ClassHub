package com.f17coders.classhub.module.domain.review.repository;

import com.f17coders.classhub.module.domain.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, Integer>, ReviewRepositoryCustom {

}
