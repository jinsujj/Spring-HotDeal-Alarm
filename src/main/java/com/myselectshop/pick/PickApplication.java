package com.myselectshop.pick;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class PickApplication {

    public static void main(String[] args) {
        SpringApplication.run(PickApplication.class, args);
    }

}
