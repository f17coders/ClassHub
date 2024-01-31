package com.f17coders.classhub.module.domain.tag.service;

import com.f17coders.classhub.module.domain.tag.dto.response.TagListRes;


public interface TagService {

    TagListRes getTagListOrderLecture();

    TagListRes getTagListOrderCommunity();

    TagListRes getTagListOrderMember();

}
