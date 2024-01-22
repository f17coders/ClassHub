package com.f17coders.classhub;

import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;
import java.util.TimeZone;

@Log4j2
@SpringBootApplication
public class ClasshubApplication {
	@PostConstruct
	public void setTimezone(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		log.info("서버 시작 시간: " + new Date());
	}

	public static void main(String[] args) {
		SpringApplication.run(ClasshubApplication.class, args);
	}

}
