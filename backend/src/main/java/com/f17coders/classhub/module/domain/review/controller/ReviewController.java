package com.f17coders.classhub.module.domain.review.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.review.dto.response.ReviewListRes;
import com.f17coders.classhub.module.domain.review.dto.response.SiteReviewListRes;
import com.f17coders.classhub.module.domain.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Tag(name = "review", description = "리뷰 API")
@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReviewController {

	//	private final LectureService lectureService;
	private final ReviewService reviewService;

	@Operation(summary = "우리 사이트 리뷰 조회 - sort사용금지")
	@GetMapping("/v0/{lectureId}/classhub")
	public ResponseEntity<BaseResponse<ReviewListRes>> getReviewList(
		@PathVariable("lectureId") int lectureId,
		@RequestParam(value = "order", required = false) String order,
		Pageable pageable) throws IOException {

		ReviewListRes reviewListRes = reviewService.getReviewList(lectureId, pageable);

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, reviewListRes);
	}

	@Operation(summary = "외부 사이트 리뷰 조회 - sort사용금지")
	@GetMapping("/v0/{lectureId}/site")
	public ResponseEntity<BaseResponse<SiteReviewListRes>> getSiteReviewList(
		@PathVariable("lectureId") int lectureId,
		@RequestParam(value = "order", required = false) String order,
		Pageable pageable) throws IOException {

		SiteReviewListRes siteReviewListRes = reviewService.getSiteReviewList(lectureId, pageable);

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, siteReviewListRes);
	}

}
