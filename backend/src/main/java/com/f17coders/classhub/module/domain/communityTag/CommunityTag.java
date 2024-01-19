package com.f17coders.classhub.module.domain.communityTag;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.tag.Tag;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommunityTag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_tag_id")
    private int communityTagId;

    // CommunityTag - Community 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id")
    @Setter
    private Community community;

    // CommunityTag - Tag 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;
}

