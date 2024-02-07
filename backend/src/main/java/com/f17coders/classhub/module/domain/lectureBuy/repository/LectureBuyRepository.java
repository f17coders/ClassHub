package com.f17coders.classhub.module.domain.lectureBuy.repository;

import com.f17coders.classhub.module.domain.lectureBuy.LectureBuy;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureBuyRepository extends JpaRepository<LectureBuy, Integer>,
	LectureBuyRepositoryCustom {

	int countByMember_MemberIdAndLecture_LectureId(int memberId, int lectureId);
}
