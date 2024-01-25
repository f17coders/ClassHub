package com.f17coders.classhub.module.domain.tag.service;

import com.f17coders.classhub.module.domain.tag.Dto.response.TagListRes;


public interface TagService {
    TagListRes getTagListOrderLecture(String tags);

    TagListRes getTagListOrderCommunity(String tags);
}
