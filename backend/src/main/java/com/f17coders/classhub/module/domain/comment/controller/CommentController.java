package com.f17coders.classhub.module.domain.comment.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.comment.dto.request.CommentRegisterReq;
import com.f17coders.classhub.module.domain.comment.dto.request.CommentUpdateReq;
import com.f17coders.classhub.module.domain.comment.service.CommentService;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "comment", description = "댓글 API")
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommentController {
    private final CommentService commentService;
    private final MemberRepository memberRepository;

    @Operation(summary = "댓글 등록")
    @PostMapping("/v1/{communityId}")
    public ResponseEntity<BaseResponse<Integer>> registerComment(@PathVariable("communityId") int communityId, @RequestBody CommentRegisterReq commentRegisterReq, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        int commentId = commentService.registerComment(communityId, commentRegisterReq, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, commentId);
    }

    @Operation(summary = "댓글 수정")
    @PutMapping("/v1/{commentId}")
    public ResponseEntity<BaseResponse<Integer>> updateCommunity(@PathVariable("commentId") int commentId, @RequestBody CommentUpdateReq commentUpdateReq, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        commentService.updateComment(commentId, commentUpdateReq, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.UPDATE_SUCCESS, commentId);
    }

    @Operation(summary = "댓글 삭제")
    @DeleteMapping("/v1/{commentId}")
    public ResponseEntity<BaseResponse<Integer>> deleteCommunity(@PathVariable("commentId") int commentId, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        commentService.deleteComment(commentId, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, commentId);
    }
}
