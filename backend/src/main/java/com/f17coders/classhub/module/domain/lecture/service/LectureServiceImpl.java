package com.f17coders.classhub.module.domain.lecture.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.job.Job;
import com.f17coders.classhub.module.domain.job.dto.response.JobRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.*;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.lectureBuy.repository.LectureBuyRepository;
import com.f17coders.classhub.module.domain.lectureSummary.service.LectureSummaryService;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import com.f17coders.classhub.module.domain.memberTag.repository.MemberTagRepository;
import com.f17coders.classhub.module.domain.tag.Tag;
import com.f17coders.classhub.module.domain.tag.dto.response.TagListRes;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional
public class LectureServiceImpl implements LectureService {

	private final LectureRepository lectureRepository;
	private final TagRepository tagRepository;
	private final MemberRepository memberRepository;
	private final LectureBuyRepository lectureBuyRepository;

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
			.curriculum(lectureReadLectureLikeCountRes.curriculum()) // 수정필요
			.category(lectureReadLectureLikeCountRes.category())
			.tagList(tagList)
			.lectureLikeCount(lectureReadLectureLikeCountRes.lectureLikeCount())
			.combinedRating(lectureReadLectureLikeCountRes.combinedRating())
			.combinedRatingCount(lectureReadLectureLikeCountRes.combinedRatingCount())
			.reviewRating(lectureReadLectureLikeCountRes.reviewRating())
			.siteReviewRating(lectureReadLectureLikeCountRes.siteReviewRating())
			.siteReviewCount(lectureReadLectureLikeCountRes.siteReviewCount())
			.siteStudentCount(lectureReadLectureLikeCountRes.siteStudentCount())
			.gptReview(lectureReadLectureLikeCountRes.gptReview())
			.descriptionSummary(lectureReadLectureLikeCountRes.descriptionSummary())
			.summary(lectureReadLectureLikeCountRes.summary())
			.descriptionDetail(lectureReadLectureLikeCountRes.descriptionDetail())
			.build();

	}

	@Override
	public LectureListRes getLecturesList(Integer categoryId, String tags, String keyword,
		String level,
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


	// member가 만약 관심있어하는 태그가 없다면(사실 그러면 사고) 그래도 예외처리 필요
	@Override
	public LectureListTagRes getTop5LecturesByTag(int tagId) {
		List<LectureListDetailLectureLikeCountRes> lectures = lectureRepository.findTop5LecturesWithTagId(
			tagId);

		Tag tag = tagRepository.findTagByTagId(tagId);

		return LectureListTagRes
			.builder()
			.lectureList(lectures)
			.tag(
				TagRes.builder()
					.tagId(tag.getTagId())
					.name(tag.getName()).build()
			)
			.build();
	}

	@Override
	public LectureListJobRes getLecturesByFamousJob() {
		List<Job> jobs = memberRepository.findRandomFamousJobIds()
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ITEM_EXCEPTION));

		if (jobs.isEmpty()) {
			throw new BaseExceptionHandler(ErrorCode.NOT_FOUND_ITEM_EXCEPTION);
		}

		int randomIndex = new Random().nextInt(jobs.size());
		Job job = jobs.get(randomIndex);

		List<LectureListDetailLectureLikeCountRes> lectures = lectureRepository.findTop5LecturesWithJobId(
			job.getJobId());

		return LectureListJobRes.builder()
			.lectureList(lectures)
			.job(
				JobRes.builder()
					.jobId(job.getJobId())
					.name(job.getName()).build()
			)
			.build();
	}

	@Override
	public LectureListJobRes getLecturesByDesiredJob(int memberId) {

		Job job = memberRepository.findJobIdByMemberId(memberId);
			if (job == null) {
			return getLecturesByFamousJob();
		}

		List<LectureListDetailLectureLikeCountRes> lectures = lectureRepository.findTop5LecturesWithJobId(
			job.getJobId());

		return LectureListJobRes.builder()
			.lectureList(lectures)
			.job(
				JobRes.builder()
					.jobId(job.getJobId())
					.name(job.getName()).build()
			)
			.build();
	}



}
