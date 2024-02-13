package com.f17coders.classhub.module.domain.lecture.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record LectureIdListRes(
	List<Integer> lectureIdList
) {

}
