package com.f17coders.classhub.module.domain.tag.repository;

import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;

import java.util.List;

public interface TagRepositoryCustom {

    List<TagRes> findTagJoinLectureTagOrderByCnt();

    List<TagRes> findTagJoinCommnunityTagOrderByCnt();

    List<TagRes> findTagJoinMemberTagOrderByCnt();

    List<TagRes> findTagByStudyIdFetchJoinStudyTag(int studyId);

	List<TagRes> findTagsByLectureIdFetchJoinLectureTag(int lectureId);
}
