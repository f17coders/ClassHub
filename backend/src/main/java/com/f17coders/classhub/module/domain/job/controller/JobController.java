package com.f17coders.classhub.module.domain.job.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.job.dto.response.JobListRes;
import com.f17coders.classhub.module.domain.job.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "job", description = "해시태그 API")
@RestController
@RequestMapping("/api/jobs/v0")
@RequiredArgsConstructor
@CrossOrigin("*")
public class JobController {

    private final JobService jobService;

    @Operation(summary = "희망 직무 리스트 조회")
    @GetMapping("")
    public ResponseEntity<BaseResponse<JobListRes>> getJobList(
        @RequestParam(required = false) String keyword) throws IOException {
        JobListRes jobList = jobService.getJobList(keyword);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, jobList);
    }
}
