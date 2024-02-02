package com.f17coders.classhub.module.domain.review.repository;

import com.f17coders.classhub.module.domain.review.dto.response.SiteReviewRes;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface SiteReviewRepositoryCustom {

	List<SiteReviewRes> findSiteReviewsByLectureId(int lectureId, Pageable pageable);
	int countSiteReviewByLectureId(int lectureId);
}
