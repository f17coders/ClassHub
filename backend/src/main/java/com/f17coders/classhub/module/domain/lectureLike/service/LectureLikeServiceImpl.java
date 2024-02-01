package com.f17coders.classhub.module.domain.lectureLike.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.lectureLike.repository.LectureLikeRepository;
import com.f17coders.classhub.module.domain.member.Member;
import jakarta.persistence.EntityManager;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class LectureLikeServiceImpl implements LectureLikeService{
	private final LectureLikeRepository lectureLikeRepository;
	private final LectureRepository lectureRepository;
	@Override
	public void likeLecture(int lectureId, Member member) throws BaseExceptionHandler, IOException {

	}
}
