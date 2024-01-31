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
import org.springframework.web.bind.annotation.CrossOrigin;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@CrossOrigin("*")
public class Community extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_id")
    private int communityId;

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

    public void putMember(Member member){  // 연관 관계 편의 메서드
        this.member = member;
        member.getCommunityList().add(this);
    }

    // Community - Comment 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> commentList = new ArrayList<>(); // 좋아요한 강의 목록

    // Community - CommunityLike 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunityLike> communityLikeList = new ArrayList<>(); // 좋아요한 강의 목록

    // Community - CommunityScrap 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunityScrap> communityScrapList = new ArrayList<>(); // 좋아요한 강의 목록

    // Community - CommunityTag 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
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