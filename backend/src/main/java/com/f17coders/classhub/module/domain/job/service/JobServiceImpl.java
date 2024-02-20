package com.f17coders.classhub.module.domain.job.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.job.Job;
import com.f17coders.classhub.module.domain.job.dto.response.JobListRes;
import com.f17coders.classhub.module.domain.job.dto.response.JobRes;
import com.f17coders.classhub.module.domain.job.repository.JobRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    @Override
    public JobListRes getJobList(String keyword) throws BaseExceptionHandler, IOException {
        List<Job> jobList = jobRepository.findJobByKeywordFetchJoinMemberOrderByMemberSize(
            keyword);

        List<JobRes> jobResList = new ArrayList<>();

        for (Job job : jobList) {
            JobRes jobRes = JobRes.builder()
                .jobId(job.getJobId())
                .name(job.getName())
                .build();

            jobResList.add(jobRes);
        }

        return JobListRes.builder()
            .jobList(jobResList)
            .build();
    }
}
