package com.f17coders.classhub.module.domain.memberTag.repository;

import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import java.util.List;

public interface MemberTagRepositoryCustom {

    List<MemberTag> findByMemberIdFetchJoinMemberAndFetchJoinTag(int memberId);

}
