package com.f17coders.classhub.module.domain.lectureLike.repository;

import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.lectureLike.LectureLike;
import com.f17coders.classhub.module.domain.member.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureLikeRepository extends JpaRepository<LectureLike, Integer> {
	int countByMember_MemberIdAndLecture_LectureId(int memberId, int lectureId);
	Optional<LectureLike> findByMemberAndLecture_LectureId(Member member, int lectureId);
}
