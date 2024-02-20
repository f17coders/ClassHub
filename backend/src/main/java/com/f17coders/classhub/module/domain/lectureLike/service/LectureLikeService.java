package com.f17coders.classhub.module.domain.lectureLike.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.Member;
import java.io.IOException;

public interface LectureLikeService {
	void likeLecture(int lectureId, Member member) throws BaseExceptionHandler, IOException;
	void unLikeLecture(int lectureId, Member member) throws BaseExceptionHandler, IOException;

}
