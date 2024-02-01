package com.f17coders.classhub.module.domain.communityTag.repository;

import com.f17coders.classhub.module.domain.community.repository.CommunityRepositoryCustom;
import com.f17coders.classhub.module.domain.communityTag.CommunityTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityTagRepository extends JpaRepository<CommunityTag, Integer> {

}
