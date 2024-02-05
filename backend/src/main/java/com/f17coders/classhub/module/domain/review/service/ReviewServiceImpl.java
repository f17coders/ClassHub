package com.f17coders.classhub.module.domain.review.service;

import com.f17coders.classhub.module.domain.review.dto.response.ReviewListRes;
import com.f17coders.classhub.module.domain.review.dto.response.ReviewRes;
import com.f17coders.classhub.module.domain.review.dto.response.SiteReviewListRes;
import com.f17coders.classhub.module.domain.review.dto.response.SiteReviewRes;
import com.f17coders.classhub.module.domain.review.repository.ReviewRepository;
import com.f17coders.classhub.module.domain.review.repository.SiteReviewRepository;
import com.f17coders.classhub.module.domain.study.service.StudyService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewRepository reviewRepository;
	private final SiteReviewRepository siteReviewRepository;

	@Override
	public ReviewListRes getReviewList(int lectureId, Pageable pageable) {
		List<ReviewRes> reviewList = reviewRepository.findReviewsByLectureIdJoinMemberId(lectureId,
			pageable);

		int totalPages = (int) Math.ceil(
			(double) reviewRepository.countReviewByLectureId(lectureId) / pageable.getPageSize());

		return ReviewListRes.builder()
			.reviewResList(reviewList)
			.totalPages(totalPages)
			.build();
	}

	@Override
	public SiteReviewListRes getSiteReviewList(int lectureId, Pageable pageable) {
		List<SiteReviewRes> siteReviewList = siteReviewRepository.findSiteReviewsByLectureId(
			lectureId,
			pageable);

		int totalPages = (int) Math.ceil(
			(double) siteReviewRepository.countSiteReviewByLectureId(lectureId)
				/ pageable.getPageSize());

		return SiteReviewListRes.builder()
			.siteReviewResList(siteReviewList)
			.totalPages(totalPages)
			.build();
	}
}
