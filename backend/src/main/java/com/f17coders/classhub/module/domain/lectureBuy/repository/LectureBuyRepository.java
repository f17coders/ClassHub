package com.f17coders.classhub.module.domain.lectureBuy.repository;

import com.f17coders.classhub.module.domain.lectureBuy.LectureBuy;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepositoryCustom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LectureBuyRepository extends JpaRepository<LectureBuy, Integer>,
	LectureBuyRepositoryCustom {

	@Query("select lb.lecture.lectureId from LectureBuy lb inner join Member m on lb.member.memberId=m.memberId where m.job.jobId=:jobId group by lb.lecture.lectureId order by count(lb.lecture.lectureId) limit 5")
	List<Integer> getLectureIdsByJobId(@Param("jobId") int jobId);

	int countByMember_MemberIdAndLecture_LectureId(int memberId, int lectureId);
}
