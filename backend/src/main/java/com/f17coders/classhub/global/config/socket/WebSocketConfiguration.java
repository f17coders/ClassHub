package com.f17coders.classhub.global.config.socket;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@EnableWebSocketMessageBroker
@Configuration
@RequiredArgsConstructor
// 소켓 관련 설정
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    private final StompHandler stompHandler;
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/chat") // 엔드포인트 설정
//            .setAllowedOriginPatterns("*")
            // cors 허용 경로 설정(로컬, 서버)
            .setAllowedOriginPatterns("http://localhost:5173", "https://i10a810.p.ssafy.io")
            .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.setApplicationDestinationPrefixes("/pub");
        config.enableSimpleBroker("/sub");

        config.setPreservePublishOrder(true);
    }
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration){
        registration.interceptors(stompHandler);
    }
}
