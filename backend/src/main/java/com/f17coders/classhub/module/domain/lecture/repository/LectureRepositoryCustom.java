package com.f17coders.classhub.module.domain.lecture.repository;

import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailLectureLikeCountRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailRes;
import com.querydsl.core.Tuple;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LectureRepositoryCustom {

	int countLectureBySearchCond(String categoryName,
		String keyword, String level, String site);

	List<LectureListDetailLectureLikeCountRes> findLecturesBySearchCond(String categoryName,
		String keyword, String level, String site, String order, Pageable pageable);
}
