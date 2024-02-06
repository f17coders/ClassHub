package com.f17coders.classhub.module.domain.memberTag.repository;

import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberTagRepository extends JpaRepository<MemberTag, Integer>,
    MemberTagRepositoryCustom {

    @Query("SELECT mt FROM MemberTag mt WHERE mt.member.memberId = :memberId GROUP BY mt.tag.tagId ORDER BY FUNCTION('RAND') limit 1")
    MemberTag findRandomMemberTagByMemberId(@Param("memberId") int memberId);

    @Query(value = "SELECT mt FROM MemberTag mt GROUP BY mt.tag.tagId ORDER BY COUNT(mt.tag.tagId) DESC LIMIT 5")
    Optional<List<MemberTag>> findRandomFamousMemberTags();

}
