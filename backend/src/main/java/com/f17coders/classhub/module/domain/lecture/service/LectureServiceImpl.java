package com.f17coders.classhub.module.domain.lecture.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailLectureLikeCountRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadLectureLikeCountRes;
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
		LectureReadLectureLikeCountRes lectureReadLectureLikeCountRes = lectureRepository.findLectureByLectureId(
			lectureId);

		List<TagRes> tagList = tagRepository.findTagsByLectureIdFetchJoinLectureTag(lectureId);

		return LectureReadRes.builder()
			.lectureId(lectureId)
			.lectureName(lectureReadLectureLikeCountRes.lectureName())
			.instructor(lectureReadLectureLikeCountRes.instructor())
			.image(lectureReadLectureLikeCountRes.image())
			.level(lectureReadLectureLikeCountRes.level())
			.siteType(lectureReadLectureLikeCountRes.siteType())
			.siteLink(lectureReadLectureLikeCountRes.siteLink())
			.priceOriginal(lectureReadLectureLikeCountRes.priceOriginal())
			.priceSale(lectureReadLectureLikeCountRes.priceSale())
			.totalTime(lectureReadLectureLikeCountRes.totalTime())
			.curriculum(lectureReadLectureLikeCountRes.curriculum())
			.category(lectureReadLectureLikeCountRes.category())
			.tagList(tagList)
			.lectureLikeCount(lectureReadLectureLikeCountRes.lectureLikeCount())
			.combinedRating(lectureReadLectureLikeCountRes.combinedRating())
			.combinedRatingCount(lectureReadLectureLikeCountRes.combinedRatingCount())
			.reviewRating(lectureReadLectureLikeCountRes.reviewRating())
			.siteReviewRating(lectureReadLectureLikeCountRes.siteReviewRating())
			.siteReviewCount(lectureReadLectureLikeCountRes.siteReviewCount())
			.siteStudentCount(lectureReadLectureLikeCountRes.siteStudentCount())
			.gptReviewGood(lectureReadLectureLikeCountRes.gptReviewGood())
			.gptReviewBad(lectureReadLectureLikeCountRes.gptReviewBad())
			.descriptionSummary(lectureReadLectureLikeCountRes.descriptionSummary())
			.summary(lectureReadLectureLikeCountRes.summary())
			.descriptionDetail(lectureReadLectureLikeCountRes.descriptionDetail())
			.build();

	}

	@Override
	public LectureListRes getLecturesList(Integer categoryId, String tags, String keyword, String level,
		String site, String order, Pageable pageable)
		throws BaseExceptionHandler, IOException {

		List<LectureListDetailRes> lectureListDetailResList = new ArrayList<>();

		List<LectureListDetailLectureLikeCountRes> lectureListDetailLectureLikeCountRes = lectureRepository.findLecturesBySearchCond(
			categoryId, tags, keyword, level, site, order, pageable);

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
			(double) lectureRepository.countLectureBySearchCond(categoryId, tags,
				keyword, level, site) / pageable.getPageSize());

		return LectureListRes
			.builder()
			.lectureList(lectureListDetailResList)
			.totalPages(totalPages)
			.build();
	}

}
