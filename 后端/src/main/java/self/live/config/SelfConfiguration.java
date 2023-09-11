package self.live.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import self.live.entity.SelfConfigPropertiesBean;

/**
 * 自己的一些配置
 *
 * @Author xxj
 * @Date 2023/9/8 9:41
 * @Version 1.0
 */
@Import(SelfConfigPropertiesBean.class)
@EnableConfigurationProperties
@Configuration
public class SelfConfiguration {
    @Bean
    @ConfigurationProperties(
            prefix = "self"
    )
    public SelfConfigPropertiesBean selfConfigPropertiesBean() {
        return new SelfConfigPropertiesBean();
    }
}
