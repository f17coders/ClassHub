package com.f17coders.classhub.module.security;

import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomOauth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        ClientRegistration clientRegistration = userRequest.getClientRegistration();
        String clientName = clientRegistration.getClientName();
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> paramMap = oAuth2User.getAttributes();

        log.info("[CustomOauth2UserService]: paramMap = " + paramMap);

        Map<String, Object> socialUserDetails = switch (clientName) {
            case "Kakao" -> getKakaoEmail(paramMap);
            default -> throw new OAuth2AuthenticationException("Unsupported Login Client");
        };

        log.info("[CustomOauth2UserService]: socialUserDetails = " + socialUserDetails);

        return generateDTO(socialUserDetails, paramMap);
    }

    private MemberSecurityDTO generateDTO(Map<String, Object> socialUserDetails,
        Map<String, Object> paramMap) {
        log.info("[CustomOauth2UserService]: enter generateDTO");

        String socialId = (String) socialUserDetails.get("socialId");
        String nickname = (String) socialUserDetails.get("nickname");
        String profileImg = (String) socialUserDetails.get("profileImage");
        String provider = (String) socialUserDetails.get("provider");

        Optional<Member> result = memberRepository.findBySocialId(socialId);

        if (result.isEmpty()) {
            log.info("신규 유저 회원가입: " + socialId);

            Member member = Member.builder()
                .socialId(socialId)
                .nickname(nickname)
                .profileImage(profileImg)
                .provider(provider)
                .build();

            Member savedMember = memberRepository.save(member);

            MemberSecurityDTO memberSecurityDTO = new MemberSecurityDTO(
                savedMember.getMemberId(),
                savedMember.getSocialId(),
                savedMember.getNickname(),
                savedMember.getProfileImage(),
                savedMember.getProvider(),
                Arrays.asList(new SimpleGrantedAuthority("ROLE"))
            );
            memberSecurityDTO.setProps(paramMap);
            log.info(
                "[CustomOauth2UserService]: sign up : memberSecurityDTO = " + memberSecurityDTO);
            return memberSecurityDTO;
        } else {
            Member member = result.get();
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE"));

            MemberSecurityDTO memberSecurityDTO = new MemberSecurityDTO(
                member.getMemberId(),
                member.getSocialId(),
                member.getNickname(),
                member.getProfileImage(),
                member.getProvider(),
                authorities
            );

            memberSecurityDTO.setProps(paramMap);

            log.info(
                "[CustomOauth2UserService]: log in : memberSecurityDTO = " + memberSecurityDTO);

            return memberSecurityDTO;
        }
    }

    private Map<String, Object> getKakaoEmail(Map<String, Object> paramMap) {
        log.info("[CustomOauth2UserService]: Enter getKakaoEmail, paramMap = " + paramMap);

        LinkedHashMap accountMap = (LinkedHashMap) paramMap.get("kakao_account");

        String socialId = "kakao_" + String.valueOf(paramMap.get("id"));
        String nickname = "리틀 김영한";
        String profileImage = "https://hit-run-seoul.org/wp-content/uploads/2011/06/2011_06_16_cookiemonster_290x290.png";

        if (paramMap.containsKey("properties")) {
            LinkedHashMap propertyMap = (LinkedHashMap) paramMap.get("properties");
            nickname = (String) propertyMap.get("nickname");
            profileImage = (String) propertyMap.get("profile_image");
        }

        return Map.of(
            "socialId", socialId,
            "nickname", nickname,
            "profileImage", profileImage,
            "provider", "k"
        );
    }
}
