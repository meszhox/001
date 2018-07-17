import Vue from "vue";
import { Toast } from 'vant';
Vue.use(Toast);


export default class Loading {
    static show() {
        Toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '加载中...'
        });
    }
    static clear() {
        Toast.clear();
    }
}