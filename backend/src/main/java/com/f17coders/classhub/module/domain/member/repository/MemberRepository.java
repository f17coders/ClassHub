package com.f17coders.classhub.module.domain.member.repository;

import com.f17coders.classhub.module.domain.job.Job;
import com.f17coders.classhub.module.domain.member.Member;
import java.util.Optional;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import java.util.List;
import java.util.Optional;
import javax.swing.text.html.Option;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Integer>, MemberRepositoryCustom {

    Optional<Member> findBySocialId(String socialId);
	@Query(value = "SELECT m.job FROM Member m WHERE m.job.jobId IS NOT NULL GROUP BY m.job.jobId ORDER BY COUNT(m.job.jobId) DESC LIMIT 5")
	Optional<List<Job>> findRandomFamousJobIds();

	@Query("SELECT m.job FROM Member m WHERE m.memberId = :memberId")
	Job findJobIdByMemberId(@Param("memberId") int memberId);

    Optional<Member> findBySocialId(String socialId);
}
