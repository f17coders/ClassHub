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

    private final MemberRepository memberRepository;
    private final CommunityRepository communityRepository;
    private final CommentRepository commentRepository;

    @Override
    public int registerComment(int communityId, CommentRegisterReq commentRegisterReq,
        Member member) throws BaseExceptionHandler, IOException {
        Optional<Community> community = communityRepository.findById(communityId);

        Comment comment = new Comment();

        comment.setContent(commentRegisterReq.content());
        comment.putCommunity(community.get());
//        comment.putMember(member);    // TODO : 시큐리티 적용 후 member로 변경

        commentRepository.save(comment);

        return comment.getCommentId();
    }

    @Override
    public void updateComment(int commentId, CommentUpdateReq commentUpdateReq, Member member) {
        String content = commentUpdateReq.content();

        Comment comment = commentRepository.findByCommentId(commentId);
        comment.setContent(content);
        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(int commentId, Member member) {
        Comment comment = commentRepository.findByCommentId(commentId);
        commentRepository.delete(comment);
    }

    @Override
    public List<CommentDetailRes> getCommentListRes(Community community) {
        List<CommentDetailRes> commentListDetailResList = new ArrayList<>();

        for (Comment comment : community.getCommentList()) {
            CommentDetailRes commentDetailRes = CommentDetailRes.builder()
                .commentId(comment.getCommentId()).content(comment.getContent())
                .memberNickname("memberNickname")   // TODO : 시큐리티 적용 후 변경
                .memberProfileImg("member profileImg")  // TODO : 시큐리티 적용 후 변경
                .canUpdate(true)  // TODO : 시큐리티 적용 후 변경
                .createdAt(comment.getCreateTime()).build();

            commentListDetailResList.add(commentDetailRes);
        }

        return commentListDetailResList;
    }
}
