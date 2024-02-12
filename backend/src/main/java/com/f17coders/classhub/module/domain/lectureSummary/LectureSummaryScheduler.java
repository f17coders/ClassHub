package com.f17coders.classhub.module.domain.lectureSummary;

import com.f17coders.classhub.module.domain.lectureSummary.service.LectureSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LectureSummaryScheduler {
    private final LectureSummaryService lectureSummaryService;

    private final int ONE_HOUR = 3600000;

    @Scheduled(fixedDelay = ONE_HOUR)  // 1시간마다 실행
    @Transactional
    public void updateLectureSummary() {
        lectureSummaryService.dropLectureSummaryTable();
        lectureSummaryService.createLectureSummaryTable();
    }
}
