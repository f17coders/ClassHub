package com.f17coders.classhub.module.domain.comment.repository;

import com.f17coders.classhub.module.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Comment findByCommentId(int commentId);
}
