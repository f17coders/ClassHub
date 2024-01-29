package com.f17coders.classhub.module.domain.lecture.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadRes;
import com.f17coders.classhub.module.domain.lecture.service.LectureService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "lecture", description = "강의 API")
@RestController
@RequestMapping("/api/lectures")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LectureController {

	private final LectureService lectureService;

	@Operation(summary = "강의 상세 정보 조회")
	@GetMapping("/v0/details/{lectureId}")
	public ResponseEntity<BaseResponse<LectureReadRes>> readLecture(
		@PathVariable("lectureId") int lectureId) throws IOException {
		LectureReadRes lectureReadRes = lectureService.readLecture(lectureId);

		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, lectureReadRes);
	}


}
