package self.live.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import self.live.utils.RoomInfoUtil;

/**
 * 房间信息定时清除
 *
 * @Author xxj
 * @Date 2023/9/8 10:56
 * @Version 1.0
 */
@Configuration
@EnableScheduling
public class RoomInfoClearTaskConfig {
    /**
     * 执行清除任务,每天中午12点半进行清除
     */
    @Scheduled(cron = "0 30 12 * * ?")
    public void clearTask() {
        RoomInfoUtil.clearTask();
    }
}
