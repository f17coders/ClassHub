package com.f17coders.classhub.module.domain.lectureLike.repository;

import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.lectureLike.LectureLike;
import com.f17coders.classhub.module.domain.member.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureLikeRepository extends JpaRepository<LectureLike, Integer> {
	int countByMember_MemberIdAndLecture_LectureId(int memberId, int lectureId);
	Optional<LectureLike> findByMemberAndLecture_LectureId(Member member, int lectureId);

	@Query("select distinct ll.lecture.lectureId from LectureLike ll where ll.member.memberId=:memberId")
	List<Integer> findDistinctLectureIdByMember_MemberId(@Param("memberId") int memberId);
}
