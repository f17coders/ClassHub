package com.f17coders.classhub.module.domain.review.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.review.dto.response.ReviewListRes;
import com.f17coders.classhub.module.domain.review.dto.request.ReviewRegisterReq;
import com.f17coders.classhub.module.domain.review.dto.response.ReviewRes;
import com.f17coders.classhub.module.domain.review.dto.response.SiteReviewListRes;
import com.f17coders.classhub.module.domain.review.service.ReviewService;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Tag(name = "review", description = "리뷰 API")
@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReviewController {

	private final ReviewService reviewService;

	private final MemberRepository memberRepository;

	@Operation(summary = "우리 사이트 리뷰 조회")
	@GetMapping("/v0/{lectureId}/classhub")
	public ResponseEntity<BaseResponse<ReviewListRes>> getReviewList(
		@PathVariable("lectureId") int lectureId,
		@RequestParam(value = "order", required = false) String order,
		Pageable pageable) throws IOException {

		ReviewListRes reviewListRes = reviewService.getReviewList(lectureId, order, pageable);

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, reviewListRes);
	}

	@Operation(summary = "외부 사이트 리뷰 조회 - sort사용금지")
	@GetMapping("/v0/{lectureId}/site")
	public ResponseEntity<BaseResponse<SiteReviewListRes>> getSiteReviewList(
		@PathVariable("lectureId") int lectureId,
		@RequestParam(value = "order", required = false) String order,
		Pageable pageable) throws IOException {

		SiteReviewListRes siteReviewListRes = reviewService.getSiteReviewList(lectureId, order, pageable);

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, siteReviewListRes);
	}

	@Operation(summary = "해당 강의에 내가 작성한 리뷰가 있다면 가져옵니다.")
	@GetMapping("/v1/{lectureId}")
	public ResponseEntity<BaseResponse<ReviewRes>> getMyLectureReview(
		@PathVariable("lectureId") int lectureId,
		@AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
		Member member = memberRepository.findById(memberSecurityDTO.getMemberId())
			.orElseThrow(() -> new BaseExceptionHandler(
				"memberId=" + memberSecurityDTO.getMemberId() + " 인 사용자를 DB에서 찾을수없습니다.",
				ErrorCode.NOT_FOUND_USER_EXCEPTION));

		ReviewRes review = reviewService.getMyLectureReview(lectureId, member);

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, review);
	}

	@Operation(summary = "리뷰 등록")
	@PostMapping("/v1/{lectureId}")
	public ResponseEntity<BaseResponse<Integer>> registerReview(
		@PathVariable("lectureId") int lectureId,
		@RequestBody ReviewRegisterReq reviewRegisterReq,
		@AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
		Member member = memberRepository.findById(memberSecurityDTO.getMemberId())
			.orElseThrow(() -> new BaseExceptionHandler(
				"memberId=" + memberSecurityDTO.getMemberId() + " 인 사용자를 DB에서 찾을수없습니다.",
				ErrorCode.NOT_FOUND_USER_EXCEPTION));

		int reviewId = reviewService.registerReview(lectureId, reviewRegisterReq, member);

		return BaseResponse.success(SuccessCode.INSERT_SUCCESS, reviewId);
	}

	@Operation(summary = "리뷰 삭제")
	@DeleteMapping("/v1/{lectureId}")
	public ResponseEntity<BaseResponse<Integer>> deleteReview(
		@PathVariable("lectureId") int lectureId,
		@AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
		Member member = memberRepository.findById(memberSecurityDTO.getMemberId())
			.orElseThrow(() -> new BaseExceptionHandler(
				"memberId=" + memberSecurityDTO.getMemberId() + " 인 사용자를 DB에서 찾을수없습니다.",
				ErrorCode.NOT_FOUND_USER_EXCEPTION));

		reviewService.deleteReview(lectureId, member.getMemberId());

		return BaseResponse.success(SuccessCode.DELETE_SUCCESS, lectureId);
	}

	@Operation(summary = "리뷰 수정")
	@PatchMapping("/v1/{lectureId}")
	public ResponseEntity<BaseResponse<Integer>> updateReview(
		@PathVariable("lectureId") int lectureId,
		@RequestBody ReviewRegisterReq reviewRegisterReq,
		@AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
		Member member = memberRepository.findById(memberSecurityDTO.getMemberId())
			.orElseThrow(() -> new BaseExceptionHandler(
				"memberId=" + memberSecurityDTO.getMemberId() + " 인 사용자를 DB에서 찾을수없습니다.",
				ErrorCode.NOT_FOUND_USER_EXCEPTION));

		int reviewId = reviewService.updateReview(lectureId, reviewRegisterReq, member);

		return BaseResponse.success(SuccessCode.INSERT_SUCCESS, reviewId);
	}

}
