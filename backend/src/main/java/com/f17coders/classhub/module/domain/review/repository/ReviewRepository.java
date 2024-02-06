package com.f17coders.classhub.module.domain.review.repository;

import com.f17coders.classhub.module.domain.review.Review;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, Integer>, ReviewRepositoryCustom {

	Optional<Review> findByMember_MemberIdAndLecture_LectureId(int memberId, int lectureId);
}
