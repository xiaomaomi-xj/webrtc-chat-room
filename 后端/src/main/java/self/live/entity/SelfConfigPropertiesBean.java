package self.live.entity;

/**
 * 自己的配置
 *
 * @Author xxj
 * @Date 2023/9/8 9:44
 * @Version 1.0
 */
public class SelfConfigPropertiesBean {
    /**
     * 密文
     */
    private String ciphertext;

    public SelfConfigPropertiesBean() {
    }

    public SelfConfigPropertiesBean(String ciphertext) {
        this.ciphertext = ciphertext;
    }

    public void setCiphertext(String ciphertext) {
        this.ciphertext = ciphertext;
    }

    public String getCiphertext() {
        return ciphertext;
    }

    @Override
    public String toString() {
        return "SelfConfigPropertiesBean{" +
                "ciphertext='" + ciphertext + '\'' +
                '}';
    }
}
