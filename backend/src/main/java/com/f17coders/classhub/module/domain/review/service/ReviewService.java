package com.f17coders.classhub.module.domain.review.service;

import com.f17coders.classhub.module.domain.review.dto.response.ReviewListRes;
import com.f17coders.classhub.module.domain.review.dto.response.SiteReviewListRes;
import org.springframework.data.domain.Pageable;

public interface ReviewService {

	ReviewListRes getReviewList(int lectureId, Pageable pageable);
	SiteReviewListRes getSiteReviewList(int lectureId, Pageable pageable);


}
