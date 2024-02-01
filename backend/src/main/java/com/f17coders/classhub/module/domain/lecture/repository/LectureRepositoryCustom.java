package com.f17coders.classhub.module.domain.lecture.repository;

import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailLectureLikeCountRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadLectureLikeCountRes;
import com.querydsl.core.Tuple;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LectureRepositoryCustom {

	int countLectureBySearchCond(Integer categoryId, String tags,
		String keyword, String level, String site);

	LectureReadLectureLikeCountRes findLectureByLectureId(Integer lectureId);

	List<LectureListDetailLectureLikeCountRes> findLecturesBySearchCond(Integer categoryId,
		String tags,
		String keyword, String level, String site, String order, Pageable pageable);
}
