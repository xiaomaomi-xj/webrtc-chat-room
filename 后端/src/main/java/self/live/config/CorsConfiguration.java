package self.live.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import self.live.constant.GlobalConstant;

/**
 * 跨域配置
 *
 * @Author xxj
 * @Date 2023/8/10 9:34
 * @Version 1.0
 */
@Configuration
public class CorsConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(GlobalConstant.ALLOWED_ORIGINS)
                .allowedMethods(GlobalConstant.ALLOWED_METHODS)
                .allowedHeaders("*")
                .maxAge(1800)
                .exposedHeaders(HttpHeaders.ACCEPT);
    }
}
