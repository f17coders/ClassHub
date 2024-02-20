package com.f17coders.classhub.module.domain.lectureLike.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.lectureLike.LectureLike;
import com.f17coders.classhub.module.domain.lectureLike.repository.LectureLikeRepository;
import com.f17coders.classhub.module.domain.member.Member;
import jakarta.persistence.EntityManager;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class LectureLikeServiceImpl implements LectureLikeService {

	private final LectureLikeRepository lectureLikeRepository;
	private final LectureRepository lectureRepository;

	@Override
	public void likeLecture(int lectureId, Member member) throws BaseExceptionHandler, IOException {
		Lecture lecture = lectureRepository.findById(lectureId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

		// 이미 좋아요를 하셨네요 -> 에러 반환
		if (lectureLikeRepository.countByMember_MemberIdAndLecture_LectureId(member.getMemberId(),
			lectureId) != 0) {
			throw new BaseExceptionHandler("이미 좋아요를 하셨습니다.", ErrorCode.INTERNAL_SERVER_ERROR);
		}

		LectureLike lectureLike = LectureLike.createLectureLike(lecture, member);
		lectureLikeRepository.save(lectureLike);

	}

	@Override
	public void unLikeLecture(int lectureId, Member member)
		throws BaseExceptionHandler, IOException {
		LectureLike lectureLike = lectureLikeRepository.findByMemberAndLecture_LectureId(member,
				lectureId)
			.orElseThrow(() -> new BaseExceptionHandler("해당 유저는 이 강의를 아직 좋아요를 하지않았습니다.", ErrorCode.NOT_FOUND_ERROR));

		lectureLikeRepository.delete(lectureLike);

	}
}
