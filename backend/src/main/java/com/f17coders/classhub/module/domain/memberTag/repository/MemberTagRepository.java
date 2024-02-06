package com.f17coders.classhub.module.domain.memberTag.repository;

import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import java.util.List;

import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberTagRepository extends JpaRepository<MemberTag, Integer>,
	MemberTagRepositoryCustom {

	List<MemberTag> findAllByMember(Member member);

    @Query(value = "SELECT mt FROM MemberTag mt GROUP BY mt.tag.tagId ORDER BY COUNT(mt.tag.tagId) DESC LIMIT 5")
    Optional<List<MemberTag>> findRandomFamousMemberTags();

}
