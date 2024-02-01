package com.f17coders.classhub.module.domain.comment.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.comment.dto.request.CommentRegisterReq;
import com.f17coders.classhub.module.domain.comment.dto.request.CommentUpdateReq;
import com.f17coders.classhub.module.domain.comment.dto.response.CommentDetailRes;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.member.Member;

import java.io.IOException;
import java.util.List;

public interface CommentService {

    int registerComment(int communityId, CommentRegisterReq commentRegisterReq, Member member)
        throws BaseExceptionHandler, IOException;

    void updateComment(int commentId, CommentUpdateReq commentUpdateReq, Member member)
        throws BaseExceptionHandler, IOException;

    void deleteComment(int commentId, Member member) throws BaseExceptionHandler, IOException;

    List<CommentDetailRes> getCommentListRes(Community community);
}
