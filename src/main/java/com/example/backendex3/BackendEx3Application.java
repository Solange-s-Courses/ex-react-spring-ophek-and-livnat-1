package com.example.backendex3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.backendex3", "controllers", "services", "repositories", "dto","utils"})
public class BackendEx3Application {

    public static void main(String[] args) {
        SpringApplication.run(BackendEx3Application.class, args);
    }

}
