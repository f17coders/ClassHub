package com.f17coders.classhub.module.domain.tag.service;

import com.f17coders.classhub.module.domain.tag.Dto.response.TagListRes;
import com.f17coders.classhub.module.domain.tag.Dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;

    @Override
    public TagListRes getTagListOrderLecture(String tags) {
        List<TagRes> tagList = tagRepository.findTagByKeywordJoinLectureTagOrderByCntLimit10(tags);

        return TagListRes.builder().tagList(tagList).build();
    }

    @Override
    public TagListRes getTagListOrderCommunity(String tags) {
        List<TagRes> tagList = tagRepository.findTagByKeywordJoinCommnunityTagOrderByCntLimit10(tags);

        return TagListRes.builder().tagList(tagList).build();
    }
}
