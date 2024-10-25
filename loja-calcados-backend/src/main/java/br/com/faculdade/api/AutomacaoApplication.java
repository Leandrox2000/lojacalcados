package br.com.faculdade.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication()
//@EnableTransactionManagement
@EnableSwagger2
public class AutomacaoApplication {

    public static void main(String[] args) {
        SpringApplication.run(AutomacaoApplication.class, args);
    }
}
