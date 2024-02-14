package com.f17coders.classhub.module.domain.lecture.repository;

import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailRes;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LectureRepository extends JpaRepository<Lecture, Integer>,
	LectureRepositoryCustom {

	Lecture findByLectureId(int lectureId);

	@Query("select l.lectureId from Lecture l inner join LectureSummary ls on l.lectureId=ls.lectureId order by ls.combinedRating desc limit 5")
	List<Integer> getFamousLectureIds();

}
