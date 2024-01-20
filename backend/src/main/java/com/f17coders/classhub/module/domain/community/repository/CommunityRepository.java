package com.f17coders.classhub.module.domain.community.repository;

import com.f17coders.classhub.module.domain.community.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommunityRepository extends JpaRepository<Community, UUID>, CommunityRepositoryCustom {
    Community findById(int id);
}
