package com.f17coders.classhub.module.domain.review.controller;

import com.f17coders.classhub.module.domain.community.repository.CommunityRepository;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.review.Review;
import com.f17coders.classhub.module.domain.review.dto.response.LectureReviewCountRes;
import com.f17coders.classhub.module.domain.review.repository.ReviewRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ReviewCountScheduler {
    private final LectureRepository lectureRepository;
    private final ReviewRepository reviewRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private final int ONE_HOUR = 3600000;

    @Scheduled(fixedDelay = ONE_HOUR)  // 1시간마다 실행
    @Transactional
    public void updateReviewCounts() {
        List<LectureReviewCountRes> countList = reviewRepository.getLectureReviewCounts();
        for (LectureReviewCountRes lectureRes:countList
             ) {
            lectureRepository.findById(lectureRes.lectureId()).ifPresent(lecture -> {
                lecture.setReviewCount(lectureRes.reviewCount());
                lectureRepository.save(lecture);
            });

        }
    }
}
