package com.f17coders.classhub.module.domain.lectureBuy.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.lectureBuy.LectureBuy;
import com.f17coders.classhub.module.domain.lectureBuy.repository.LectureBuyRepository;
import com.f17coders.classhub.module.domain.lectureLike.LectureLike;
import com.f17coders.classhub.module.domain.lectureLike.repository.LectureLikeRepository;
import com.f17coders.classhub.module.domain.member.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Log4j2
@Service
@RequiredArgsConstructor
public class LectureBuyServiceImpl implements LectureBuyService{

    private final LectureBuyRepository lectureBuyRepository;
    private final LectureRepository lectureRepository;


    @Override
    public void buyLecture(int lectureId, Member member) throws BaseExceptionHandler, IOException {
        Lecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

        // 이미 구매를 한 강의이다. -> 에러 반환
        if (lectureBuyRepository.countByMember_MemberIdAndLecture_LectureId(member.getMemberId(),
                lectureId) != 0) {
            throw new BaseExceptionHandler("이미 구매한 강의.", ErrorCode.INTERNAL_SERVER_ERROR);
        }

        LectureBuy lectureBuy = LectureBuy.createLectureBuy(lecture, member);
        lectureBuyRepository.save(lectureBuy);

    }
}
