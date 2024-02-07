package com.f17coders.classhub.module.domain.comment.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.comment.Comment;
import com.f17coders.classhub.module.domain.comment.dto.request.CommentRegisterReq;
import com.f17coders.classhub.module.domain.comment.dto.request.CommentUpdateReq;
import com.f17coders.classhub.module.domain.comment.dto.response.CommentDetailRes;
import com.f17coders.classhub.module.domain.comment.repository.CommentRepository;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.repository.CommunityRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommunityRepository communityRepository;
    private final CommentRepository commentRepository;

    @Override
    public int registerComment(int communityId, CommentRegisterReq commentRegisterReq,
        Member member) throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findById(communityId)
            .orElseThrow(() -> new BaseExceptionHandler
                ("존재하지 않는 게시글입니다.", ErrorCode.NOT_FOUND_ERROR));

        Comment comment = Comment.createComment(commentRegisterReq.content(), member, community);

        Comment saveComment = commentRepository.save(comment);

        return saveComment.getCommentId();
    }

    @Override
    public void updateComment(int commentId, CommentUpdateReq commentUpdateReq, Member member) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new BaseExceptionHandler
                ("존재하지 않는 댓글입니다.", ErrorCode.NOT_FOUND_ERROR));

        comment.setContent(commentUpdateReq.content());

        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(int commentId, Member member) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new BaseExceptionHandler
                ("존재하지 않는 댓글입니다.", ErrorCode.NOT_FOUND_ERROR));

        commentRepository.delete(comment);
    }

    @Override
    public CommentDetailRes convertToCommentListRes(Comment comment, Member member) {
        return CommentDetailRes.builder()
            .commentId(comment.getCommentId())
            .content(comment.getContent())
            .memberNickname(comment.getMember().getNickname())
            .memberProfileImg(comment.getMember().getProfileImage())
            .canUpdate(isWriter(member, comment))
            .createdAt(comment.getCreateTime())
            .build();
    }

    private static boolean isWriter(Member member, Comment comment) {
        return comment.getMember().equals(member);
    }
}
