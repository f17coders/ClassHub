package com.f17coders.classhub.module.domain.lecture.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadRes;
import com.f17coders.classhub.module.domain.lecture.service.LectureService;
import com.f17coders.classhub.module.domain.lectureLike.service.LectureLikeService;
import com.f17coders.classhub.module.domain.study.dto.response.StudyListRes;
import com.querydsl.core.Tuple;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "lecture", description = "강의 API")
@RestController
@RequestMapping("/lectures")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LectureController {

	private final LectureService lectureService;
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
		LectureListRes lectureListRes = lectureService.getLecturesList(categoryId, tags, keyword, level,
			site, order, pageable);

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, lectureListRes);
	}

	@Operation(summary = "강의 좋아요")
	@PostMapping("/v1/likes/{lectureId}")
	public ResponseEntity<BaseResponse<Integer>> likeCommunity(@PathVariable("lectureId") int lectureId) throws IOException {
//		lectureLikeService.likeLecture(lectureId, null);

		return BaseResponse.success(SuccessCode.INSERT_SUCCESS, lectureId);
	}


}
