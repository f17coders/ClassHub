package com.f17coders.classhub.module.domain.community;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.comment.Comment;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.communityScrap.CommunityScrap;
import com.f17coders.classhub.module.domain.communityTag.CommunityTag;
import com.f17coders.classhub.module.domain.member.Member;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
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

    public void putMember(Member member) {  // 연관 관계 편의 메서드
        this.member = member;
        member.getCommunityList().add(this);
    }

    // Community - CommunityTag 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CommunityTag> communityTagSet = new HashSet<>();   // TODO : 순서 고려 필요

    // Community - Comment 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> commentList = new ArrayList<>(); // 좋아요한 강의 목록

    // Community - CommunityLike 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CommunityLike> communityLikeSet = new HashSet<>(); // 좋아요한 강의 목록

    // Community - CommunityScrap 연관 관계
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CommunityScrap> communityScrapSet = new HashSet<>(); // 좋아요한 강의 목록

    // 생성 메서드
    public static Community createCommunity(String title, String content, Member member) {
        Community community = new Community();

        community.setTitle(title);
        community.setContent(content);
        community.putMember(member);

        return community;
    }
}