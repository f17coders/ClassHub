package com.f17coders.classhub.module.domain.comment.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
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
        Optional<Community> community = communityRepository.findById(communityId);

        Comment comment = Comment.createComment(commentRegisterReq.content(), member,
            community.get());

        Comment saveComment = commentRepository.save(comment);

        return saveComment.getCommentId();
    }

    @Override
    public void updateComment(int commentId, CommentUpdateReq commentUpdateReq, Member member) {
        Optional<Comment> comment = commentRepository.findById(commentId);

        comment.get().setContent(commentUpdateReq.content());

        commentRepository.save(comment.get());
    }

    @Override
    public void deleteComment(int commentId, Member member) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        commentRepository.delete(comment.get());
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
