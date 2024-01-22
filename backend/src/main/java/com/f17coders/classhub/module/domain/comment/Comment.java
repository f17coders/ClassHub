package com.f17coders.classhub.module.domain.comment;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.member.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@NoArgsConstructor
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @NotBlank(message = "내용은 필수입니다!")
    @Setter
    @Column(length = 1000)
    private String content;

    // Comment - Member 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @Setter
    private Member member;

    public void putMember(Member member){   // 연관 관계 편의 메서드
        this.member = member;
        member.getCommentList().add(this);
    }

    // Comment - Community 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id")
    @Setter
    private Community community;

    public void putCommunity(Community community){   // 연관 관계 편의 메서드
        this.community = community;
        community.getCommentList().add(this);
    }
}

