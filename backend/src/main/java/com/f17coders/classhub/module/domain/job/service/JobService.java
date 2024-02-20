package com.f17coders.classhub.module.domain.job.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.job.dto.response.JobListRes;
import java.io.IOException;

public interface JobService {
    JobListRes getJobList(String keyword) throws BaseExceptionHandler, IOException;
}
