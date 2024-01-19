package com.f17coders.classhub.module.domain.communityLike;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommunityLike extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_like_id")
    private int communityLikeId;

    // CommunityLike - Member 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @Setter
    private Member member;

    // CommunityLike - Community 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id")
    @Setter
    private Community community;
}

