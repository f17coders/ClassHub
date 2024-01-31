package com.f17coders.classhub.module.domain.tag.service;

import com.f17coders.classhub.module.domain.tag.dto.response.TagListRes;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public TagListRes getTagListOrderLecture() {
        List<TagRes> tagList = tagRepository.findTagJoinLectureTagOrderByCnt();

        return TagListRes.builder().tagList(tagList).build();
    }

    @Override
    public TagListRes getTagListOrderCommunity() {
        List<TagRes> tagList = tagRepository.findTagJoinCommnunityTagOrderByCnt();

        return TagListRes.builder().tagList(tagList).build();
    }

    @Override
    public TagListRes getTagListOrderMember() {
        List<TagRes> tagList = tagRepository.findTagJoinMemberTagOrderByCnt();

        return TagListRes.builder().tagList(tagList).build();
    }
}
