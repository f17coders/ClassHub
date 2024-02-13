package com.f17coders.classhub.module.domain.studyMember.repository;

import com.f17coders.classhub.module.domain.studyMember.StudyMember;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyMemberRepository extends JpaRepository<StudyMember, Integer> {

    StudyMember findByStudy_StudyIdAndMember_MemberId(int studyId, int memberId);

    int countByStudy_StudyId(int studyId);

    List<StudyMember> findStudyMembersByStudy_StudyId(int studyId);
}
