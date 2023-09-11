package self.live.entity.bo;

import java.util.List;

/**
 * 用于返回id
 *
 * @Author xxj
 * @Date 2023/8/17 17:27
 * @Version 1.0
 */
public class IdBo {
    /**
     * id
     */
    private String id;

    public IdBo(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "IdBo{" +
                "id='" + id + '\'' +
                '}';
    }
}
