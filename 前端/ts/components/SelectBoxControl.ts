//下拉框组件,可能会有多个使用
export default class SelectBoxControl {
    private static selectBoxEls: Array<HTMLDivElement>;
    private static selectOptionBoxBoxEls: Array<HTMLDivElement> = [];
    private static selectOptionBoxElMap: Map<HTMLDivElement, Array<HTMLDivElement>>;
    private static selectBoxHeight: number = 40;
    private static switch: boolean = true;
    private static callBackFunMap: Map<HTMLDivElement, Function> = new Map();

    //运行
    public static run() {
        this.selectBoxEls = document.querySelectorAll('.select-box') as unknown as Array<HTMLDivElement>;
        this.selectOptionBoxElMap = new Map();
        this.handleAllOption();
        this.bindClickEvent();
        this.handleCheckEvent();
        this.optionElsClickEvent();
    }

    //绑定改变事件
    public static bindChangeEvent(el: HTMLDivElement, callBackFun: Function) {
        this.callBackFunMap.set(el, callBackFun);
    }

    //处理选中事件
    private static handleCheckEvent() {
        this.selectOptionBoxElMap.forEach((v, k) => {
            v.forEach(el => {
                const checkVl = el.getAttribute('check');
                if (checkVl === 'check') {
                    this.checkDataToSpan(el, k);
                }
            })
        })
    }

    //信息选中赋予
    private static checkDataToSpan(optionBoxEl: HTMLDivElement, optionBoxBoxEl: HTMLDivElement) {
        const spanEl = optionBoxBoxEl.previousElementSibling as HTMLSpanElement;
        spanEl.innerText = optionBoxEl.innerText;
    }

    //获取所有的option组件
    private static handleAllOption() {
        this.selectBoxEls.forEach(el => {
            const optionBoxEl = el.querySelector(".select-option-box-box") as HTMLDivElement;
            this.selectOptionBoxBoxEls.push(optionBoxEl);
            const selectOptionBoxEls = el.querySelectorAll('.select-option-box') as unknown as Array<HTMLDivElement>;
            this.selectOptionBoxElMap.set(optionBoxEl, selectOptionBoxEls);
            el.style.height = this.selectBoxHeight + 'px';
        });
        //计算高度和位置
        this.selectOptionBoxBoxEls.forEach(el => {
            const selectOptionEls = this.selectOptionBoxElMap.get(el) as Array<HTMLElement>;
            let height = selectOptionEls.length * this.selectBoxHeight;
            el.style.height = height + 'px';
            el.style.top = -height - 2 + 'px';
        });
    }

    //下拉款展开和关闭
    private static bindClickEvent() {
        this.selectBoxEls.forEach((el, key) => {
            el.addEventListener('click', () => {
                if (this.switch) {
                    this.extendEvent(this.selectOptionBoxBoxEls[key]);
                } else {
                    this.closeEvent(this.selectOptionBoxBoxEls[key]);
                }
                this.switch = !this.switch;
            });
        });
    }

    //下拉框展开事件
    private static extendEvent(optionBoxEl: HTMLDivElement) {
        optionBoxEl.style.display = 'flex';
        setTimeout(() => optionBoxEl.style.opacity = '1');
    }

    //关闭，收起事件
    private static closeEvent(optionBoxEl: HTMLDivElement) {
        optionBoxEl.style.opacity = '0';
        setTimeout(() => {
            optionBoxEl.style.display = 'none';
        }, 300);
    }

    //选项点击事件
    private static optionElsClickEvent() {
        this.selectOptionBoxElMap.forEach((v, k) => {
            v.forEach(optionEl => {
                optionEl.addEventListener('click', () => {
                    setTimeout(this.checkDataToSpan.bind(this, optionEl, k));
                    //执行回调函数，传入值
                    (this.callBackFunMap.get(k) as Function)(optionEl.getAttribute('value'));
                });
            })
        });
    }
}