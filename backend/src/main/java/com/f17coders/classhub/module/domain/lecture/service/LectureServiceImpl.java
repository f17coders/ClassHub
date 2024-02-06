package com.f17coders.classhub.module.domain.lecture.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.job.Job;
import com.f17coders.classhub.module.domain.job.dto.response.JobRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailLectureLikeCountRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListJobRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListTagRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadLectureLikeCountRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadRes;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import com.f17coders.classhub.module.domain.memberTag.repository.MemberTagRepository;
import com.f17coders.classhub.module.domain.tag.Tag;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;
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
	private final MemberTagRepository memberTagRepository;
	private final MemberRepository memberRepository;

	@Override
	public LectureReadRes readLecture(int lectureId) throws BaseExceptionHandler, IOException {
		LectureReadLectureLikeCountRes lectureReadLectureLikeCountRes = lectureRepository.findLectureByLectureId(
			lectureId);
		List<TagRes> tagList = tagRepository.findTagsByLectureIdFetchJoinLectureTag(lectureId);
		String curriculum = "{\"curriculum\": [{\"time\": 8, \"item_count\": 3, \"title\": \"Introduction\", \"items\": [{\"title\": \"Introduction\", \"time\": \"01:24\"}, {\"title\": \"How to submit an assignment\", \"time\": \"01:41\"}, {\"title\": \"Understanding Databases\", \"time\": \"05:02\"}]}, {\"time\": 0, \"item_count\": 0, \"title\": \"Create and Manage a Database\", \"items\": [{\"title\": \"2013\", \"time\": \"1 question\"}, {\"title\": \"2029\", \"time\": \"1 question\"}, {\"title\": \"2085\", \"time\": \"1 question\"}, {\"title\": \"2150\", \"time\": \"1 question\"}, {\"title\": \"2159\", \"time\": \"1 question\"}, {\"title\": \"2247\", \"time\": \"1 question\"}, {\"title\": \"2250\", \"time\": \"1 question\"}, {\"title\": \"2254\", \"time\": \"1 question\"}, {\"title\": \"2804\", \"time\": \"1 question\"}]}, {\"time\": 0, \"item_count\": 0, \"title\": \"Build Tables\", \"items\": [{\"title\": \"2004\", \"time\": \"1 question\"}, {\"title\": \"2032\", \"time\": \"1 question\"}, {\"title\": \"2091\", \"time\": \"1 question\"}, {\"title\": \"2204\", \"time\": \"1 question\"}, {\"title\": \"2208\", \"time\": \"1 question\"}, {\"title\": \"2242\", \"time\": \"1 question\"}, {\"title\": \"2763\", \"time\": \"1 question\"}, {\"title\": \"2773\", \"time\": \"1 question\"}, {\"title\": \"2793\", \"time\": \"1 question\"}]}, {\"time\": 0, \"item_count\": 0, \"title\": \"Create Queries\", \"items\": [{\"title\": \"2021\", \"time\": \"1 question\"}, {\"title\": \"2103\", \"time\": \"1 question\"}, {\"title\": \"2130\", \"time\": \"1 question\"}, {\"title\": \"2168\", \"time\": \"1 question\"}, {\"title\": \"2192\", \"time\": \"1 question\"}, {\"title\": \"2815\", \"time\": \"1 question\"}]}, {\"time\": 0, \"item_count\": 0, \"title\": \"Create Forms\", \"items\": [{\"title\": \"2087\", \"time\": \"1 question\"}, {\"title\": \"2151\", \"time\": \"1 question\"}, {\"title\": \"2182\", \"time\": \"1 question\"}, {\"title\": \"2237\", \"time\": \"1 question\"}, {\"title\": \"2241\", \"time\": \"1 question\"}, {\"title\": \"2266\", \"time\": \"1 question\"}, {\"title\": \"2783\", \"time\": \"1 question\"}, {\"title\": \"2839\", \"time\": \"1 question\"}]}, {\"time\": 0, \"item_count\": 0, \"title\": \"Create Reports\", \"items\": [{\"title\": \"2111\", \"time\": \"1 question\"}, {\"title\": \"2112\", \"time\": \"1 question\"}, {\"title\": \"2197\", \"time\": \"1 question\"}, {\"title\": \"2276\", \"time\": \"1 question\"}, {\"title\": \"2280\", \"time\": \"1 question\"}, {\"title\": \"2536\", \"time\": \"1 question\"}, {\"title\": \"2790\", \"time\": \"1 question\"}]}, {\"time\": 0, \"item_count\": 0, \"title\": \"Projects\", \"items\": [{\"title\": \"Theopetra Cave\", \"time\": \"5 questions\"}, {\"title\": \"Rock You!\", \"time\": \"5 questions\"}, {\"title\": \"Stock market\", \"time\": \"6 questions\"}, {\"title\": \"Video Club\", \"time\": \"5 questions\"}, {\"title\": \"Faster Shipping Co.\", \"time\": \"6 questions\"}, {\"title\": \"PC-X shop\", \"time\": \"5 questions\"}]}, {\"time\": 0, \"item_count\": 1, \"title\": \"Epilogue\", \"items\": [{\"title\": \"Epilogue\", \"time\": \"00:31\"}]}, {\"time\": 3, \"item_count\": 1, \"title\": \"BONUS\", \"items\": [{\"title\": \"BONUS content\", \"time\": \"03:24\"}]}]}";
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
			.curriculum(curriculum) // 수정필요
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

	private Map<String, Object> parseJsonData(String jsonData) {
		// JSON 데이터를 파싱하여 Map으로 변환하거나, 원하는 형태로 가공
		// 예시: JSON 문자열을 Map으로 변환하는 방법
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			return objectMapper.readValue(jsonData, new TypeReference<>() {});
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return Collections.emptyMap(); // 예외 처리를 위한 빈 Map 반환
	}


}
