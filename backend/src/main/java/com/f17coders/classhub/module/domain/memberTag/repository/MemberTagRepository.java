package com.f17coders.classhub.module.domain.memberTag.repository;

import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTagRepository extends JpaRepository<MemberTag, Integer>, MemberTagRepositoryCustom {

    List<MemberTag> findAllByMember(Member member);
}
