package com.f17coders.classhub.module.security.dto;

import com.f17coders.classhub.module.domain.member.Member;
import java.util.Collection;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Getter
@Setter
public class MemberSecurityDTO extends User implements OAuth2User {

    private final int memberId;
    private final String socialId;
    private final String nickname;
    private final String profileImage;
    private final String provider;
    private Map<String, Object> props;

    public MemberSecurityDTO(int username, String socialId,
        String nickname, String profileImage, String provider,
        Collection<? extends GrantedAuthority> authorities) {
        super(String.valueOf(username), nickname, authorities);
        this.memberId = username;
        this.socialId = socialId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.provider = provider;
    }

    @Override
    public String getName() {
        return String.valueOf(this.memberId);
    }

    public Member toMember() {
        return Member.fromUser()
            .memberId(this.memberId)
            .socialId(this.socialId)
            .nickname(this.nickname)
            .profileImage(this.profileImage)
            .provider(this.provider)
            .get();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.getProps();
    }
}
