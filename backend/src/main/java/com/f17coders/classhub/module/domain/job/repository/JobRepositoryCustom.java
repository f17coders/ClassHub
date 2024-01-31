package com.f17coders.classhub.module.domain.job.repository;

import com.f17coders.classhub.module.domain.job.Job;
import java.util.List;

public interface JobRepositoryCustom {

    public List<Job> findJobByKeywordFetchJoinMemberOrderByMemberSize(String keyword);
}
