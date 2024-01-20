package com.f17coders.classhub.module.domain.community;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.comment.Comment;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.communityScrap.CommunityScrap;
import com.f17coders.classhub.module.domain.communityTag.CommunityTag;
import com.f17coders.classhub.module.domain.member.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Community extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_id")
    private int id;

    @Column(length = 300)
    @NotBlank(message = "제목은 필수 입니다!")
    @Setter
    private String title;

    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "내용은 필수 입니다!")
    @Setter
    private String content;

    @Setter
    private Integer viewCount = 0;

    // Community - Member 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @Setter
    private Member member;

    // Community - Comment 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY)
    private List<Comment> commentList = new ArrayList<>(); // 좋아요한 강의 목록

    public void putCommunity(Comment comment) {  // 연관 관계 편의 메서드
        comment.setCommunity(this);
        this.getCommentList().add(comment);
    }

    // Community - CommunityLike 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY)
    private List<CommunityLike> communityLikeList = new ArrayList<>(); // 좋아요한 강의 목록

    public void putCommunity(CommunityLike communityLike) {  // 연관 관계 편의 메서드
        communityLike.setCommunity(this);
        this.getCommunityLikeList().add(communityLike);
    }

    // Community - CommunityScrap 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY)
    private List<CommunityScrap> communityScrapList = new ArrayList<>(); // 좋아요한 강의 목록

    public void putCommunity(CommunityScrap communityScrap) {  // 연관 관계 편의 메서드
        communityScrap.setCommunity(this);
        this.getCommunityScrapList().add(communityScrap);
    }

    // Community - CommunityTag 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY)
    private List<CommunityTag> communityTagList = new ArrayList<>(); // 좋아요한 강의 목록

    public void putCommunity(CommunityTag communityTag) {  // 연관 관계 편의 메서드
        communityTag.setCommunity(this);
        this.getCommunityTagList().add(communityTag);
    }

    // 생성 메서드
    public static Community createCommunity(String title, String content, List<CommunityTag> tagList, Member member) {
        Community community = new Community();

        community.setTitle(title);
        community.setContent(content);
        community.setCommunityTagList(tagList);

        return community;
    }
}