package com.f17coders.classhub.module.domain.lecture.dto.response;

import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import java.util.List;
import lombok.Builder;

@Builder
public record LectureListTagRes(
	List<LectureListDetailLectureLikeCountRes> lectureList,
	TagRes tag
) {

}
