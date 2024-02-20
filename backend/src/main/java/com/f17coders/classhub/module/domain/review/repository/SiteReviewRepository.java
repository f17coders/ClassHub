package com.f17coders.classhub.module.domain.review.repository;

import com.f17coders.classhub.module.domain.review.Review;
import com.f17coders.classhub.module.domain.review.SiteReview;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteReviewRepository extends JpaRepository<SiteReview, Integer>, SiteReviewRepositoryCustom {
	List<Review> findByLecture_LectureId(int lectureId, Pageable pageable);
}
