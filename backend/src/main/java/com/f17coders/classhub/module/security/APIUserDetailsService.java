package com.f17coders.classhub.module.security;

import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class APIUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("[APIUserDetailsService] username: " + username);
        Optional<Member> result = memberRepository.findById(Integer.valueOf(username));
        Member member = result.orElseThrow(
            () -> new UsernameNotFoundException("cannot find user email"));

        log.info("[APIUserDetailsService] member = " + member);
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        return new MemberSecurityDTO(
            member.getMemberId(),
            member.getSocialId(),
            member.getNickname(),
            member.getProfileImage(),
            member.getProvider(),
            authorities
        );
    }
}
