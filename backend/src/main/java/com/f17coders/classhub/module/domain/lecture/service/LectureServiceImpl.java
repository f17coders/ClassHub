package com.f17coders.classhub.module.domain.lecture.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadRes;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.tag.Tag;
import jakarta.validation.constraints.Null;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class LectureServiceImpl implements LectureService {

	private final LectureRepository lectureRepository;


	@Override
	public LectureReadRes readLecture(int lectureId) throws BaseExceptionHandler, IOException {
		Lecture lecture = lectureRepository.findByLectureId(lectureId);
		// combinedRating 지표 논의 필요
		float reviewRating;
		try {
			reviewRating = lecture.getReviewSum() / lecture.getReviewCount();
		} catch (Exception e) {
//			log.error("e 발생 review");
			reviewRating = 0;
		}

//		int combinedRatingCount = getCombinedRatingCount(lecture.getSiteReviewCount(),
//			lecture.getReviewCount());
//		float combinedRating = (lecture.getSiteReviewRating() + reviewRating) / 2;

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
			.combinedRating(Float.valueOf(3.8f))
			.combinedRatingCount(Integer.valueOf(38))
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

	// 둘 다 null 허용이니 검사를 해줘야할까요?
//	public int getCombinedRatingCount(Integer siteReviewCount, Integer reviewCount) {
//		if (siteReviewCount== null && siteReviewCount== null) {
//			siteReviewCount = Integer.valueOf(0);
//		} else if (reviewCount) {
//
//		}
//		reviewCount == null) {
//			return
//		}
//		return siteReviewCount + reviewCount;
//	}
}
