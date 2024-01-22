package com.f17coders.classhub.module.domain.review.service;

import com.f17coders.classhub.module.domain.review.repository.ReviewRepository;
import com.f17coders.classhub.module.domain.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements StudyService {
    private final ReviewRepository reviewRepository;
}
