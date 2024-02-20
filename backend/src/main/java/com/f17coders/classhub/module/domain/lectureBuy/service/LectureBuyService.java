package com.f17coders.classhub.module.domain.lectureBuy.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.Member;

import java.io.IOException;

public interface LectureBuyService {
    void buyLecture(int lectureId, Member member) throws BaseExceptionHandler, IOException;

}
