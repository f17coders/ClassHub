package com.f17coders.classhub.module.domain.member.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureIdListRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListRes;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.request.MemberAddInfoReq;
import com.f17coders.classhub.module.domain.member.dto.request.MemberUpdateInfoReq;
import com.f17coders.classhub.module.domain.member.dto.response.MemberCommunityListRes;
import com.f17coders.classhub.module.domain.member.dto.response.MemberGetInfoRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyBaseRes;
import java.io.IOException;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface MemberService {

    public MemberGetInfoRes getInformation(Member member) throws BaseExceptionHandler, IOException;

    public void addInformation(MemberAddInfoReq memberAddInfoReq, Member member)
        throws BaseExceptionHandler, IOException;

    public void updateInformation(MemberUpdateInfoReq memberUpdateInfoReq, Member member)
        throws BaseExceptionHandler, IOException;

	public List<StudyBaseRes> getStudyList(Member member) throws BaseExceptionHandler, IOException;

	public LectureListRes getBuyedLectureList(int memberId, Pageable pageable)
		throws BaseExceptionHandler, IOException;

	public LectureListRes getLikedLectureList(int memberId, Pageable pageable)
		throws BaseExceptionHandler, IOException;
	public void withDraw(Member member) throws BaseExceptionHandler;

	public LectureIdListRes getLikedLectureIdList(int memberId)
		throws BaseExceptionHandler, IOException;

    public MemberCommunityListRes getCommunityList(Member member, Pageable pageable)
        throws BaseExceptionHandler;

    public MemberCommunityListRes getCommentCommunityList(Member member, Pageable pageable)
        throws BaseExceptionHandler;

    public MemberCommunityListRes getScrapCommunityList(Member member, Pageable pageable)
        throws BaseExceptionHandler;
}
