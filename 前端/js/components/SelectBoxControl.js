class SelectBoxControl {
    static run() {
        this.selectBoxEls = document.querySelectorAll('.select-box');
        this.selectOptionBoxElMap = new Map();
        this.handleAllOption();
        this.bindClickEvent();
        this.handleCheckEvent();
        this.optionElsClickEvent();
    }
    static bindChangeEvent(el, callBackFun) {
        this.callBackFunMap.set(el, callBackFun);
    }
    static handleCheckEvent() {
        this.selectOptionBoxElMap.forEach((v, k) => {
            v.forEach(el => {
                const checkVl = el.getAttribute('check');
                if (checkVl === 'check') {
                    this.checkDataToSpan(el, k);
                }
            });
        });
    }
    static checkDataToSpan(optionBoxEl, optionBoxBoxEl) {
        const spanEl = optionBoxBoxEl.previousElementSibling;
        spanEl.innerText = optionBoxEl.innerText;
    }
    static handleAllOption() {
        this.selectBoxEls.forEach(el => {
            const optionBoxEl = el.querySelector(".select-option-box-box");
            this.selectOptionBoxBoxEls.push(optionBoxEl);
            const selectOptionBoxEls = el.querySelectorAll('.select-option-box');
            this.selectOptionBoxElMap.set(optionBoxEl, selectOptionBoxEls);
            el.style.height = this.selectBoxHeight + 'px';
        });
        this.selectOptionBoxBoxEls.forEach(el => {
            const selectOptionEls = this.selectOptionBoxElMap.get(el);
            let height = selectOptionEls.length * this.selectBoxHeight;
            el.style.height = height + 'px';
            el.style.top = -height - 2 + 'px';
        });
    }
    static bindClickEvent() {
        this.selectBoxEls.forEach((el, key) => {
            el.addEventListener('click', () => {
                if (this.switch) {
                    this.extendEvent(this.selectOptionBoxBoxEls[key]);
                }
                else {
                    this.closeEvent(this.selectOptionBoxBoxEls[key]);
                }
                this.switch = !this.switch;
            });
        });
    }
    static extendEvent(optionBoxEl) {
        optionBoxEl.style.display = 'flex';
        setTimeout(() => optionBoxEl.style.opacity = '1');
    }
    static closeEvent(optionBoxEl) {
        optionBoxEl.style.opacity = '0';
        setTimeout(() => {
            optionBoxEl.style.display = 'none';
        }, 300);
    }
    static optionElsClickEvent() {
        this.selectOptionBoxElMap.forEach((v, k) => {
            v.forEach(optionEl => {
                optionEl.addEventListener('click', () => {
                    setTimeout(this.checkDataToSpan.bind(this, optionEl, k));
                    this.callBackFunMap.get(k)(optionEl.getAttribute('value'));
                });
            });
        });
    }
}
SelectBoxControl.selectOptionBoxBoxEls = [];
SelectBoxControl.selectBoxHeight = 40;
SelectBoxControl.switch = true;
SelectBoxControl.callBackFunMap = new Map();
export default SelectBoxControl;
