package com.f17coders.classhub.module.domain.review.repository;

import com.f17coders.classhub.module.domain.review.dto.response.ReviewRes;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ReviewRepositoryCustom {

	List<ReviewRes> findReviewsByLectureIdJoinMemberId(int lectureId, Pageable pageable);
	int countReviewByLectureId(int lectureId);
}
