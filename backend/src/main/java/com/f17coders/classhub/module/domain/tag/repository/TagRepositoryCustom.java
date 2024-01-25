package com.f17coders.classhub.module.domain.tag.repository;

import com.f17coders.classhub.module.domain.tag.Dto.response.TagRes;

import java.util.List;

public interface TagRepositoryCustom {
    List<TagRes> findTagByKeywordJoinLectureTagOrderByCntLimit10(String tags);
    List<TagRes> findTagByKeywordJoinCommnunityTagOrderByCntLimit10(String tags);
}
