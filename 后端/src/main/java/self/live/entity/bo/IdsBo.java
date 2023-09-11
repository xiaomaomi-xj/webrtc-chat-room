package self.live.entity.bo;

import java.util.List;

/**
 * 用于返回多个id
 *
 * @Author xxj
 * @Date 2023/8/18 11:51
 * @Version 1.0
 */
public class IdsBo {
    /**
     * ids
     */
    private List<String> ids;

    public IdsBo(List<String> ids) {
        this.ids = ids;
    }

    public List<String> getIds() {
        return ids;
    }

    public void setIds(List<String> ids) {
        this.ids = ids;
    }

    @Override
    public String toString() {
        return "IdsBo{" +
                "ids=" + ids +
                '}';
    }
}
