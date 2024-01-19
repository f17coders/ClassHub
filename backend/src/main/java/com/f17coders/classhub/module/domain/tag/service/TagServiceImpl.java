package com.f17coders.classhub.module.domain.tag.service;

import com.f17coders.classhub.module.domain.study.service.StudyService;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements StudyService {
    private final TagRepository tagRepository;
}
