package com.f17coders.classhub.module.domain.memberTag;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.tag.Tag;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberTag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_tag_id")
    private int memberTagId;

    // MemberTag - Member 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @Setter
    private Member member;

    // MemberTag - Tag 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    // 생성 메서드
    public static MemberTag createMemberTag(Member member, Tag tag) {
        MemberTag memberTag = new MemberTag();

        memberTag.setMember(member);
        memberTag.setTag(tag);

        return memberTag;
    }
}

