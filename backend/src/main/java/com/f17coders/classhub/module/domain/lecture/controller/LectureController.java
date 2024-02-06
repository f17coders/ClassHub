package com.f17coders.classhub.module.domain.lecture.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.job.Job;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailLectureLikeCountRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListJobRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListTagRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadRes;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.lecture.service.LectureService;
import com.f17coders.classhub.module.domain.lectureLike.service.LectureLikeService;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import com.f17coders.classhub.module.domain.memberTag.repository.MemberTagRepository;
import com.f17coders.classhub.module.domain.study.dto.response.StudyListRes;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import com.querydsl.core.Tuple;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "lecture", description = "강의 API")
@RestController
@RequestMapping("/api/lectures")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LectureController {

	private final LectureService lectureService;
	private final MemberRepository memberRepository;
	private final LectureRepository lectureRepository;
	private final LectureLikeService lectureLikeService;

	@Operation(summary = "강의 상세 정보 조회")
	@GetMapping("/v0/details/{lectureId}")
	public ResponseEntity<BaseResponse<LectureReadRes>> readLecture(
		@PathVariable("lectureId") int lectureId) throws IOException {
		LectureReadRes lectureReadRes = lectureService.readLecture(lectureId);

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, lectureReadRes);
	}

	@Operation(summary = "강의 목록 조회 - 더미 데이터 구현(태그,order미구현)")
	@GetMapping("/v0")
	public ResponseEntity<BaseResponse<LectureListRes>> getLectureList(
		@RequestParam(value = "category", required = false) Integer categoryId,
		@RequestParam(value = "tags", required = false) String tags,
		@RequestParam(value = "keyword", required = false) String keyword,
		@RequestParam(value = "level", required = false) String level,
		@RequestParam(value = "site", required = false) String site,
		@RequestParam(value = "order", required = false) String order,
		Pageable pageable
	) throws IOException {
		LectureListRes lectureListRes = lectureService.getLecturesList(categoryId, tags, keyword,
			level,
			site, order, pageable);

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, lectureListRes);
	}

	@Operation(summary = "강의 좋아요")
	@PostMapping("/v1/likes/{lectureId}")
	public ResponseEntity<BaseResponse<Integer>> likeCommunity(
		@PathVariable("lectureId") int lectureId,
		@AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
		lectureLikeService.likeLecture(lectureId, memberSecurityDTO.toMember());

		return BaseResponse.success(SuccessCode.INSERT_SUCCESS, lectureId);
	}

	@Operation(summary = "강의 좋아요 취소")
	@DeleteMapping("/v1/unlikes/{lectureId}")
	public ResponseEntity<BaseResponse<Integer>> unLikeCommunity(
		@PathVariable("lectureId") int lectureId,
		@AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
		lectureLikeService.unLikeLecture(lectureId, memberSecurityDTO.toMember());

		return BaseResponse.success(SuccessCode.INSERT_SUCCESS, lectureId);
	}

	@Operation(summary = "태그를 받아서, 해당 태그의 Top5 강의 조회(관심 기술의 Top5 강의 조회)")
	@GetMapping("/v0/interest-skills")
	public ResponseEntity<BaseResponse<LectureListTagRes>> get5LecturesByInterestTag(
		@AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO,
		@RequestParam(value = "tagId", required = true) int tagId) throws IOException {

		LectureListTagRes lectures = lectureService.getTop5LecturesByTag(
			tagId);

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, lectures);
	}

//	@Operation(summary = "비로그인 유저대상 인기태그를 랜덤 1개 골라서, Top5 강의 조회(관심 기술의 Top5 강의 조회)")
//	@GetMapping("/v0/interest-skills")
//	public ResponseEntity<BaseResponse<LectureListTagRes>> get5LecturesByRandomTag()
//		throws IOException {
//
//		LectureListTagRes lectures = lectureService.getLecturesByRandomTag();
//
//		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, lectures);
//	}

	@Operation(summary = "비로그인 유저에게 인기직무중 랜덤 1개 골라서, 해당 직무 선택 유저들이 수강하는 Top5 강의 조회(관심 직무의 Top5 강의 조회)")
	@GetMapping("/v0/desired-job")
	public ResponseEntity<BaseResponse<LectureListJobRes>> get5LecturesByFamousJob(
	) throws IOException {

		LectureListJobRes lectures = lectureService.getLecturesByFamousJob();

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, lectures);
	}

	@Operation(summary = "로그인 유저가 희망직무가 있다면 그 직무로, 없다면 인기직무중 랜덤 1개 골라서, 해당 직무 선택 유저들이 수강하는 Top5 강의 조회(관심 직무의 Top5 강의 조회)")
	@GetMapping("/v1/desired-job")
	public ResponseEntity<BaseResponse<LectureListJobRes>> get5LecturesByDesiredJob(
		@AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO
	) throws IOException {

		LectureListJobRes lectures = lectureService.getLecturesByDesiredJob(memberSecurityDTO.toMember().getMemberId());

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, lectures);
	}


}
