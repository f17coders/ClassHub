package com.f17coders.classhub.module.domain.community.repository;

import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.tag.Tag;
import com.querydsl.core.types.OrderSpecifier;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public interface CommunityRepositoryCustom {

    Community findCommunityByCommunityIdForCommunityReadRes(
        int communityId);

    Community findCommunityByCommunityIdForCommunityListRes(
        int communityId);

    Community findByCommunityIdFetchJoinCommunityTag(int communityId);

    List<Community> findAllByMemberWithPaging(Member member, Pageable pageable);

    public Long countPageByKeywordAndTagIdListJoinCommunityTagJoinTag(List<Integer> tagIdList,
        String keyword);

    List<Community> findPageByKeywordAndTagIdListJoinCommunityTagJoinTag(List<Integer> tagIdList,
        String keyword, Pageable pageable);

    List<Community> findPageFromCommentByMemberJoinCommunity(Member member,
        Pageable pageable);

    Long countDistinctFromCommentByMemberJoinCommunity(Member member);

    List<Community> findPageFromCommunityScrapByMemberJoinCommunity(Member member,
        Pageable pageable);
}
