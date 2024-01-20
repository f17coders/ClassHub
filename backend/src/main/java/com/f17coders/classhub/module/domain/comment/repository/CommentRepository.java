package com.f17coders.classhub.module.domain.comment.repository;

import com.f17coders.classhub.module.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    Comment findByCommentId(int commentId);
}
