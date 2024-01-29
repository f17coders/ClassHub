package com.f17coders.classhub.module.domain.lecture.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureReadRes;
import java.io.IOException;

public interface LectureService {

	LectureReadRes readLecture(int lectureId) throws BaseExceptionHandler, IOException;
}
