import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.DigestUtils;
import self.live.LiveApplication;

import java.nio.charset.StandardCharsets;
import java.util.Locale;

/**
 * 测试类
 *
 * @Author xxj
 * @Date 2023/8/17 17:07
 * @Version 1.0
 */
@SpringBootTest(classes = LiveApplication.class)
@RunWith(SpringRunner.class)
public class TestDemo {
    @Test
    public void test() throws Exception {
        //在这里生成密文，放到配置文件里面
        //明文
        String plaintext = "xiaomaomi-xj";
        String md5Str = DigestUtils.md5DigestAsHex(plaintext.getBytes(StandardCharsets.UTF_8));
        //密文:把这个密文写到配置文件即可
        //ACC0515F34056AD8E32238910C6C3100
        System.out.println(md5Str.toUpperCase(Locale.CHINA));
    }
}
