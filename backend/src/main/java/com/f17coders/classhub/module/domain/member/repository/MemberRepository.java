package com.f17coders.classhub.module.domain.member.repository;

import com.f17coders.classhub.module.domain.member.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, Integer>, MemberRepositoryCustom {

    Optional<Member> findBySocialId(String socialId);
}
