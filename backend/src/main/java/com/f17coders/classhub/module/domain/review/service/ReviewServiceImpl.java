package com.f17coders.classhub.module.domain.review.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.lectureBuy.repository.LectureBuyRepository;
import com.f17coders.classhub.module.domain.lectureLike.repository.LectureLikeRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.response.MemberNickNameImageRes;
import com.f17coders.classhub.module.domain.review.Review;
import com.f17coders.classhub.module.domain.review.dto.response.MyReviewStatusRes;
import com.f17coders.classhub.module.domain.review.dto.response.ReviewListRes;
import com.f17coders.classhub.module.domain.review.dto.request.ReviewRegisterReq;
import com.f17coders.classhub.module.domain.review.dto.response.ReviewRes;
import com.f17coders.classhub.module.domain.review.dto.response.SiteReviewListRes;
import com.f17coders.classhub.module.domain.review.dto.response.SiteReviewRes;
import com.f17coders.classhub.module.domain.review.repository.ReviewRepository;
import com.f17coders.classhub.module.domain.review.repository.SiteReviewRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Transactional
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewRepository reviewRepository;
	private final SiteReviewRepository siteReviewRepository;
	private final LectureRepository lectureRepository;
	private final LectureBuyRepository lectureBuyRepository;

	@Override
	public ReviewListRes getReviewList(int lectureId, String order, Pageable pageable) {
		List<ReviewRes> reviewList = reviewRepository.findReviewsByLectureIdJoinMemberId(lectureId,
			order,
			pageable);

		int totalPages = (int) Math.ceil(
			(double) reviewRepository.countReviewByLectureId(lectureId) / pageable.getPageSize());

		return ReviewListRes.builder()
			.reviewResList(reviewList)
			.totalPages(totalPages)
			.build();
	}

	@Override
	public SiteReviewListRes getSiteReviewList(int lectureId, String order, Pageable pageable) {
		List<SiteReviewRes> siteReviewList = siteReviewRepository.findSiteReviewsByLectureId(
			lectureId, order,
			pageable);

		int totalPages = (int) Math.ceil(
			(double) siteReviewRepository.countSiteReviewByLectureId(lectureId)
				/ pageable.getPageSize());

		return SiteReviewListRes.builder()
			.siteReviewResList(siteReviewList)
			.totalPages(totalPages)
			.build();
	}

	@Override
	public int registerReview(int lectureId, ReviewRegisterReq reviewRegisterReq, Member member) {
		Lecture lecture = lectureRepository.findById(lectureId)
			.orElseThrow(
				() -> new BaseExceptionHandler("lectureId=" + lectureId + " 강의를 DB에서 찾을수없습니다.",
					ErrorCode.NOT_FOUND_ITEM_EXCEPTION));

		Optional<Review> isReviewExist = reviewRepository.findByMember_MemberIdAndLecture_LectureId(
			member.getMemberId(), lectureId);
		if (isReviewExist.isPresent()) {
			// 엔티티가 존재하면 이미 리뷰가 있는데 또 요청하는것이다.
			throw new BaseExceptionHandler("해당 사용자는 해당 강의의 리뷰가 이미 존재합니다.",
				ErrorCode.INTERNAL_SERVER_ERROR);
		}
		// 엔티티가 존재하지 않으면 새로운 Review 엔티티를 생성
		Review review = Review.createReview(reviewRegisterReq.score(), reviewRegisterReq.content(),
			member, lecture);
		Review saveReview = reviewRepository.save(review);

		return saveReview.getReviewId();
	}

	@Override
	public int updateReview(int lectureId, ReviewRegisterReq reviewRegisterReq, Member member) {
		Lecture lecture = lectureRepository.findById(lectureId)
			.orElseThrow(
				() -> new BaseExceptionHandler("lectureId=" + lectureId + " 강의를 DB에서 찾을수없습니다.",
					ErrorCode.NOT_FOUND_ITEM_EXCEPTION));

		Optional<Review> isReviewExist = reviewRepository.findByMember_MemberIdAndLecture_LectureId(
			member.getMemberId(), lectureId);

		if (!isReviewExist.isPresent()) {
			throw new BaseExceptionHandler("해당 유저의 리뷰를 찾을수 없습니다.",
				ErrorCode.NOT_FOUND_ITEM_EXCEPTION);
			// reviewRepository.save(existingReview); // 이 부분은 필요하지 않을 수 있음
		}

		Review existingReview = isReviewExist.get();
		existingReview.setContent(reviewRegisterReq.content());
		existingReview.setScore(reviewRegisterReq.score());

		return existingReview.getReviewId();
	}

	@Override
	public void deleteReview(int lectureId, int memberId) {
		Optional<Review> isReviewExist = reviewRepository.findByMember_MemberIdAndLecture_LectureId(
			memberId, lectureId);
		if (!isReviewExist.isPresent()) {
			// 엔티티가 존재하지 않네. 사고다.
			throw new BaseExceptionHandler("해당 리뷰가 존재하지 않습니다.",
				ErrorCode.INTERNAL_SERVER_ERROR);
		}

		Review review = isReviewExist.get();

		reviewRepository.delete(review);
	}

	@Override
	public MyReviewStatusRes getMyLectureReview(int lectureId, Member member) {

		if (lectureBuyRepository.countByMember_MemberIdAndLecture_LectureId(member.getMemberId(),
			lectureId) == 0) {
			// 구매하지 않음.
			return MyReviewStatusRes.builder()
				.isBuyed(false)
				.isExist(false)
				.build();
		}

		// 구매했음
		Optional<Review> isReviewExist = reviewRepository.findByMember_MemberIdAndLecture_LectureId(
			member.getMemberId(), lectureId);
		if (!isReviewExist.isPresent()) {
			// 아직 작성한 리뷰가 없다.
			return MyReviewStatusRes.builder()
				.isBuyed(true)
				.isExist(false)
				.build();
		}

		// 구매 및 작성 리뷰 존재

		Review review = isReviewExist.get();
		String replacedImageUrl = "https://simage-kr.uniqlo.com/goods/31/11/77/82/414920_COL_COL99_1000.jpg";
		return MyReviewStatusRes.builder()
			.isBuyed(true)
			.isExist(true)
			.reviewRes(
				ReviewRes.builder()
					.reviewId(review.getReviewId())
					.reviewId(review.getLecture().getLectureId())
					.member(MemberNickNameImageRes.builder()
						.nickname(member.getNickname())
						.profileImage(
							member.getProfileImage() == null ? replacedImageUrl
								: member.getProfileImage())
						.build())
					.createTime(review.getUpdateTime())
					.score(review.getScore())
					.content(review.getContent())
					.build()
			)
			.build();
	}
}
