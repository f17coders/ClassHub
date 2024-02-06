package com.f17coders.classhub.module.security.handler;

import com.f17coders.classhub.global.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

@Log4j2
@RequiredArgsConstructor
public class CustomSocialLoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Value("${classhub.react.domain}")
    private String REACT_DOMAIN;
    private final JWTUtil jwtUtil;

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        log.info("[CustomSocialLoginSuccessHandler] enter onAuthenticationSuccess");

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        Map<String, Object> claim = new HashMap<>();

        List<String> roles = new ArrayList<>();
        for (GrantedAuthority grantedAuthority : authentication.getAuthorities()) {
            roles.add(grantedAuthority.getAuthority());
        }

        claim.put("memberId", authentication.getName());
        claim.put("roles", roles);

        String accessToken = jwtUtil.generateToken(claim, 30);

        response.getWriter().println(authentication.getName() + "LOGIN SUCCESS");
        String frontPage = UriComponentsBuilder.fromUriString(REACT_DOMAIN + "/login")
                .queryParam("Authorization", accessToken)
                .build().toUriString();

        log.info("[CustomSocialLoginSuccessHandler] frontPage = " + frontPage);

        getRedirectStrategy()
                .sendRedirect(request, response, frontPage);
    }
}
