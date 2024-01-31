package com.f17coders.classhub.module.domain.lecture.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailLectureLikeCountRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadRes;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class LectureServiceImpl implements LectureService {

	private final LectureRepository lectureRepository;
	private final TagRepository tagRepository;

	@Override
	public LectureReadRes readLecture(int lectureId) throws BaseExceptionHandler, IOException {
		Lecture lecture = lectureRepository.findByLectureId(lectureId);

		float reviewRating;
		// 총계, 혹은 합계가 0이면 0이다.
		if (lecture.getReviewCount().equals(0) || lecture.getReviewSum().equals(0)) {
			reviewRating = 0;
		} else {
			reviewRating = lecture.getReviewSum() / lecture.getReviewCount();
		}

		// combinedRating: 우리사이트리뷰개수<10인경우 가중치0.2, 아닌경우 가중치0.5
		int combinedRatingCount = getCombinedRatingCount(lecture.getSiteReviewCount(),
			lecture.getReviewCount());
		float combinedRating = getCombinedRating(lecture.getSiteReviewCount(),
			lecture.getSiteReviewRating(), lecture.getReviewCount(), reviewRating);

		// tag repo 구현 이전까지는 더미를 반환
		List<String> tempTagList = new ArrayList<>();
		tempTagList.add("임시 태그1");
		tempTagList.add("임시 태그2");

		return LectureReadRes.builder()
			.lectureId(lectureId)
			.lectureName(lecture.getName())
			.instructor(lecture.getInstructor())
			.image(lecture.getImage())
			.level(String.valueOf(lecture.getLevel()))
			.siteType(String.valueOf(lecture.getSiteType()))
			.siteLink(lecture.getSiteLink())
			.priceOriginal(lecture.getPriceOriginal())
			.priceSale(lecture.getPriceSale())
			.totalTime(lecture.getTotalTime())
			.curriculum(lecture.getCurriculum())
			.categoryId(lecture.getCategory().getCategoryId())
			.categoryName(lecture.getCategory().getCategoryName())
			.tagList(tempTagList) // 가라에요 수정 필요!
			.lectureLikeCount(Integer.valueOf(30)) // 가라에요 수정 필요!
			.combinedRating(combinedRating)
			.combinedRatingCount(combinedRatingCount)
			.reviewRating(reviewRating)
			.siteReviewRating(lecture.getSiteReviewRating())
			.siteReviewCount(lecture.getSiteReviewCount())
			.gptReviewGood(lecture.getGptReviewGood())
			.gptReviewBad(lecture.getGptReviewBad())
			.descriptionSummary(lecture.getDescriptionSummary())
			.summary(lecture.getSummary())
			.descriptionDetail(lecture.getDescriptionDetail())
			.build();

	}

	@Override
	public LectureListRes getLecturesList(String categoryName, String keyword, String level,
		String site, String order, Pageable pageable)
		throws BaseExceptionHandler, IOException {

		List<LectureListDetailRes> lectureListDetailResList = new ArrayList<>();

		List<LectureListDetailLectureLikeCountRes> lectureListDetailLectureLikeCountRes = lectureRepository.findLecturesBySearchCond(
			categoryName, keyword, level, site, order, pageable);

		for (LectureListDetailLectureLikeCountRes lecture : lectureListDetailLectureLikeCountRes) {
			int lectureId = lecture.lectureId();

			List<TagRes> tagList = tagRepository.findTagsByLectureIdFetchJoinLectureTag(lectureId);

			lectureListDetailResList.add(
				LectureListDetailRes.builder()
					.lectureId(lecture.lectureId())
					.lectureName(lecture.lectureName())
					.siteType(lecture.siteType())
					.instructor(lecture.instructor())
					.image(lecture.image())
					.level(lecture.level())
					.combinedRating(lecture.combinedRating())
					.combinedRatingCount(lecture.combinedRatingCount())
					.priceOriginal(lecture.priceOriginal())
					.priceSale(lecture.priceSale())
					.descriptionSummary(lecture.descriptionSummary())  // 한줄요약
					.totalTime(lecture.totalTime())
					.category(lecture.category())
					.tagList(tagList)
					.lectureLikeCount(lecture.lectureLikeCount())
					.build()
			);
		}

		int totalPages = (int) Math.ceil(
			(double) lectureRepository.countLectureBySearchCond(categoryName,
				keyword, level, site) / pageable.getPageSize());

		return LectureListRes
			.builder()
			.lectureList(lectureListDetailResList)
			.totalPages(totalPages)
			.build();
	}

	public int getCombinedRatingCount(int siteReviewCount, int reviewCount) {
		return siteReviewCount + reviewCount;
	}

	public float getCombinedRating(int siteReviewCount, float siteReviewRating, int reviewCount,
		float reviewRating) {
		// 각 사이트 가중치 설정
		float siteWeight, weight;
		if (reviewCount < 10) {
			weight = 0.2f;
			siteWeight = (1 - weight);
		} else {
			weight = 0.5f;
			siteWeight = 1 - weight;
		}

		float combinedRating;
		try {
			combinedRating = (siteReviewRating * siteWeight * siteReviewCount
				+ reviewRating * weight * reviewCount) / (siteWeight * siteReviewCount
				+ weight * reviewCount);
		} catch (ArithmeticException e) {
			combinedRating = 0;
		}
		return combinedRating;

	}
}
