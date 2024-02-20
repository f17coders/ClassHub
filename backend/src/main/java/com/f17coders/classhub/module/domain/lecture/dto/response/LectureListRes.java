package com.f17coders.classhub.module.domain.lecture.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record LectureListRes(
	List<LectureListDetailRes> lectureList,
	int totalPages
) {

}
