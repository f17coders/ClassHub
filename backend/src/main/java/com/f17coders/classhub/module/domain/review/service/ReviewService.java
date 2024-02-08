package com.f17coders.classhub.module.domain.review.service;

import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.review.dto.response.MyReviewStatusRes;
import com.f17coders.classhub.module.domain.review.dto.response.ReviewListRes;
import com.f17coders.classhub.module.domain.review.dto.request.ReviewRegisterReq;
import com.f17coders.classhub.module.domain.review.dto.response.ReviewRes;
import com.f17coders.classhub.module.domain.review.dto.response.SiteReviewListRes;
import org.springframework.data.domain.Pageable;

public interface ReviewService {

	ReviewListRes getReviewList(int lectureId, String order, Pageable pageable);

	SiteReviewListRes getSiteReviewList(int lectureId, String order, Pageable pageable);

	int registerReview(int lectureId, ReviewRegisterReq reviewRegisterReq, Member member);

	int updateReview(int lectureId, ReviewRegisterReq reviewRegisterReq, Member member);

	void deleteReview(int lectureId, int memberId);

	MyReviewStatusRes getMyLectureReview(int lectureId, Member member);


}
