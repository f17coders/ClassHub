package com.f17coders.classhub.module.domain.lecture.repository;

import com.f17coders.classhub.module.domain.lecture.dto.response.*;
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

	List<LectureListDetailLectureLikeCountRes> findTop5LecturesWithTagId(int tagId);

	List<LectureListDetailLectureLikeCountRes> findLecturesByMemberJoinLectureBuy(int memberId, Pageable pageable);
	List<LectureListDetailLectureLikeCountRes> findLecturesByMemberJoinLectureLike(int memberId, Pageable pageable);

	int countLectureBuyByMember(int memberId);
	int countLectureLikeByMember(int memberId);

	List<LectureListDetailLectureLikeCountRes> findLecturesByLectureIds(List<Integer> lectureIds);

}
