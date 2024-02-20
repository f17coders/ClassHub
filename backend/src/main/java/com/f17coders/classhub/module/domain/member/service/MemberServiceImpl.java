package com.f17coders.classhub.module.domain.member.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.comment.repository.CommentRepository;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.repository.CommunityRepository;
import com.f17coders.classhub.module.domain.communityScrap.repository.CommunityScrapRepository;
import com.f17coders.classhub.module.domain.job.Job;
import com.f17coders.classhub.module.domain.job.dto.response.JobRes;
import com.f17coders.classhub.module.domain.job.repository.JobRepository;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureIdListRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailLectureLikeCountRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListDetailRes;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureListRes;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.lectureLike.repository.LectureLikeRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.request.MemberAddInfoReq;
import com.f17coders.classhub.module.domain.member.dto.request.MemberUpdateInfoReq;
import com.f17coders.classhub.module.domain.member.dto.response.MemberCommunityDetailRes;
import com.f17coders.classhub.module.domain.member.dto.response.MemberCommunityListRes;
import com.f17coders.classhub.module.domain.member.dto.response.MemberGetInfoRes;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import com.f17coders.classhub.module.domain.memberTag.repository.MemberTagRepository;
import com.f17coders.classhub.module.domain.memberTag.service.MemberTagService;
import com.f17coders.classhub.module.domain.study.dto.response.StudyBaseRes;
import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final JobRepository jobRepository;
	private final TagRepository tagRepository;
	private final CommunityRepository communityRepository;
	private final MemberTagRepository memberTagRepository;
	private final StudyRepository studyRepository;
	private final CommunityScrapRepository communityScrapRepository;
	private final MemberTagService memberTagService;
	private final LectureRepository lectureRepository;
	private final LectureLikeRepository lectureLikeRepository;

	@Override
	public MemberGetInfoRes getInformation(Member member)
		throws BaseExceptionHandler, IOException {    // TODO : 최적화 고려 (쿼리 횟수)
		// 멤버와 직업 정보 가져오기
		Member memberWithJob = memberRepository.findByIdFetchJoinJob(member.getMemberId())
			.orElseThrow(() -> new BaseExceptionHandler("존재하지 않는 회원입니다.",
				ErrorCode.NOT_FOUND_ERROR));

		JobRes jobRes = null;
		if (memberWithJob.getJob() != null) {
			jobRes = JobRes.builder()
				.name(memberWithJob.getJob().getName())
				.jobId(memberWithJob.getJob().getJobId())
				.build();
		}

		// 멤버와 태그 정보 가져오기
		List<MemberTag> memberTagList = memberTagRepository.findByIdFetchJoinMemberAndTag(
			member.getMemberId());

		List<TagRes> tagResList = memberTagList.stream()    // TODO : stream 추후 추가 학습
			.map(memberTag -> TagRes.builder()
				.tagId(memberTag.getTag().getTagId())
				.name(memberTag.getTag().getName())
				.build())
			.collect(Collectors.toList());

		// MemberGetInfoRes 생성
		return MemberGetInfoRes.builder()
			.nickname(member.getNickname())
			.profileImage(member.getProfileImage())
			.tagList(tagResList)
			.job(jobRes)
			.build();
	}

	@Override
	@Transactional
	public void addInformation(MemberAddInfoReq memberAddInfoReq, Member member)
		throws BaseExceptionHandler, IOException {
		// 멤버와 직업 정보 가져오기
		Member memberWithJob = memberRepository.findByIdFetchJoinJob(member.getMemberId())
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

		// 기존 직업 정보가 있다면 예외 처리
		if (memberWithJob.getJob() != null) {
			throw new BaseExceptionHandler("기존에 가입한 회원입니다.", ErrorCode.FORBIDDEN_ERROR);
		}

		// 희망 직무 설젇
		Job job = jobRepository.findById(memberAddInfoReq.jobId())
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

		member.setJob(job);

		// 관심 태그 설정
		memberAddInfoReq.tagList().stream()
			.map(tagId -> tagRepository.findById(tagId)
				.orElseThrow(
					() -> new BaseExceptionHandler("존재하지 않는 태그입니다.", ErrorCode.NOT_FOUND_ERROR)))
			.forEach(tag -> memberTagService.registerMemberTag(member, tag));

		memberRepository.save(member);
	}

	@Override
	@Transactional
	public void updateInformation(MemberUpdateInfoReq memberUpdateInfoReq, Member member)
		throws BaseExceptionHandler, IOException {

		Member memberWithJob = memberRepository.findByIdFetchJoinJob(member.getMemberId())
			.orElseThrow(() -> new BaseExceptionHandler
				("존재하지 않는 회원입니다.", ErrorCode.NOT_FOUND_ERROR));

		// 희망 직무 조회
		Job job = jobRepository.findById(memberUpdateInfoReq.jobId())
			.orElseThrow(() -> new BaseExceptionHandler
				("존재하지 않는 직무입니다.",
					ErrorCode.NOT_FOUND_ERROR));

		// 기존 희망 직무 삭제 및 새 희망 직무 설정
		job.getMemberList().remove(memberWithJob);
		memberWithJob.putJob(job);

		// 기존 관심 태그 삭제
		System.out.println(
			"memberWithJob.getMemberTagList() = " + memberWithJob.getMemberTagList());
		memberWithJob.getMemberTagList().clear();

		// 새로운 관심 태그 설정
		memberUpdateInfoReq.tagList().stream()
			.map(tagId -> tagRepository.findById(tagId).orElseThrow(() -> new BaseExceptionHandler(
				"존재하지 않는 태그입니다.", ErrorCode.NOT_FOUND_ERROR)))
			.forEach(tag -> memberTagService.registerMemberTag(member, tag));
	}

	@Override
	public LectureListRes getBuyedLectureList(int memberId, Pageable pageable)
		throws BaseExceptionHandler, IOException {

		List<LectureListDetailRes> lectureListDetailResList = new ArrayList<>();

		List<LectureListDetailLectureLikeCountRes> lectureListDetailLectureLikeCountRes = lectureRepository.findLecturesByMemberJoinLectureBuy(
			memberId, pageable);

		for (LectureListDetailLectureLikeCountRes lecture : lectureListDetailLectureLikeCountRes) {
			int lectureId = lecture.lectureId();

			List<TagRes> tagList = tagRepository.findTagsByLectureIdFetchJoinLectureTag(lectureId);

			lectureListDetailResList.add(
				LectureListDetailRes.builder()
					.lectureId(lecture.lectureId())
					.lectureName(lecture.lectureName())
					.siteType(lecture.siteType())
					.instructor(lecture.instructor())
					.image(lecture.image())
					.level(lecture.level())
					.combinedRating(lecture.combinedRating())
					.combinedRatingCount(lecture.combinedRatingCount())
					.priceOriginal(lecture.priceOriginal())
					.priceSale(lecture.priceSale())
					.descriptionSummary(lecture.descriptionSummary())  // 한줄요약
					.totalTime(lecture.totalTime())
					.category(lecture.category())
					.tagList(tagList)
					.lectureLikeCount(lecture.lectureLikeCount())
					.build()
			);
		}

		int totalPages = (int) Math.ceil(
			(double) lectureRepository.countLectureBuyByMember(memberId) / pageable.getPageSize());

		return LectureListRes
			.builder()
			.lectureList(lectureListDetailResList)
			.totalPages(totalPages)
			.build();

	}

	@Override
	public LectureListRes getLikedLectureList(int memberId, Pageable pageable)
		throws BaseExceptionHandler, IOException {

		List<LectureListDetailRes> lectureListDetailResList = new ArrayList<>();

		List<LectureListDetailLectureLikeCountRes> lectureListDetailLectureLikeCountRes = lectureRepository.findLecturesByMemberJoinLectureLike(
			memberId, pageable);

		for (LectureListDetailLectureLikeCountRes lecture : lectureListDetailLectureLikeCountRes) {
			int lectureId = lecture.lectureId();

			List<TagRes> tagList = tagRepository.findTagsByLectureIdFetchJoinLectureTag(lectureId);

			lectureListDetailResList.add(
				LectureListDetailRes.builder()
					.lectureId(lecture.lectureId())
					.lectureName(lecture.lectureName())
					.siteType(lecture.siteType())
					.instructor(lecture.instructor())
					.image(lecture.image())
					.level(lecture.level())
					.combinedRating(lecture.combinedRating())
					.combinedRatingCount(lecture.combinedRatingCount())
					.priceOriginal(lecture.priceOriginal())
					.priceSale(lecture.priceSale())
					.descriptionSummary(lecture.descriptionSummary())  // 한줄요약
					.totalTime(lecture.totalTime())
					.category(lecture.category())
					.tagList(tagList)
					.lectureLikeCount(lecture.lectureLikeCount())
					.build()
			);
		}

		int totalPages = (int) Math.ceil(
			(double) lectureRepository.countLectureLikeByMember(memberId) / pageable.getPageSize());

		return LectureListRes
			.builder()
			.lectureList(lectureListDetailResList)
			.totalPages(totalPages)
			.build();
	}

	@Override
	public void withDraw(Member member) throws BaseExceptionHandler {
		memberRepository.delete(memberRepository.findById(member.getMemberId()).get());
	}

	@Override
	public LectureIdListRes getLikedLectureIdList(int memberId)
		throws BaseExceptionHandler, IOException {
		List<Integer> ids = lectureLikeRepository.findDistinctLectureIdByMember_MemberId(memberId);
		return LectureIdListRes.builder()
			.lectureIdList(ids)
			.build();
	}

	@Override
	public List<StudyBaseRes> getStudyList(Member member) throws BaseExceptionHandler, IOException {
		return studyRepository.findStudyFetchJoinStudyMemberByMemberId(member.getMemberId());
	}

	@Override
	public MemberCommunityListRes getCommunityList(Member member, Pageable pageable)
		throws BaseExceptionHandler {
		List<Community> communityList = communityRepository.findAllByMemberWithPaging(
			member, pageable);

//        total Page 계산
		long communitySize = communityRepository.countByMember(member);
		long totalPages = (long) (Math.ceil((double) communitySize / pageable.getPageSize()));

		return getMemberCommunityListRes(communityList, totalPages);
	}

	@Override
	public MemberCommunityListRes getCommentCommunityList(Member member, Pageable pageable)
		throws BaseExceptionHandler {
		List<Community> communityList = communityRepository.findPageFromCommentByMemberJoinCommunity(
			member, pageable);

//        total Page 계산
		long communitySize = communityRepository.countDistinctFromCommentByMemberJoinCommunity(
			member);

		long totalPages = (long) (Math.ceil((double) communitySize / pageable.getPageSize()));

		return getMemberCommunityListRes(communityList, totalPages);
	}

	@Override
	public MemberCommunityListRes getScrapCommunityList(Member member, Pageable pageable)
		throws BaseExceptionHandler {
		List<Community> communityList = communityRepository.findPageFromCommunityScrapByMemberJoinCommunity(
			member, pageable);

//        total Page 계산
		long communitySize = communityScrapRepository.countByMember(member);

		long totalPages = (long) (Math.ceil((double) communitySize / pageable.getPageSize()));

		return getMemberCommunityListRes(communityList, totalPages);
	}

	private static MemberCommunityListRes getMemberCommunityListRes(List<Community> communityList,
		long totalPages) {
		List<MemberCommunityDetailRes> memberCommunityDetailResList = communityList.stream()
			.map(community -> MemberCommunityDetailRes.builder()
				.communityId(community.getCommunityId())
				.title(community.getTitle())
				.content(community.getContent())
				.createdAt(community.getCreateTime())
				.build())
			.collect(Collectors.toList());

		return MemberCommunityListRes.builder()
			.communityList(memberCommunityDetailResList)
			.totalPages(totalPages)
			.build();
	}
}
