// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import {router} from './router/router.js'

import 'vant/lib/vant-css/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import querystring from 'querystring';
import Loading from './common/loading';

Vue.config.productionTip = false


const instance_axios = axios.create({
  // baseURL: 'http://gcbus.whyxzz.cn',
  // timeout: 10000,
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/json'
  }
});

instance_axios.interceptors.request.use(
  conf => {
      // eventHub.$emit('before-request');
      if(conf.showLoading){
        Loading.show();
      }
      return conf;
  },
  error => {
      // eventHub.$emit('request-error');
      Loading.clear();
      return Promise.reject(error);
  }
);
instance_axios.interceptors.response.use(
  response => {
      // eventHub.$emit('after-response');
      Loading.clear();
      return response;
  },
  error => {
      // eventHub.$emit('response-error');
      Loading.clear();
      return Promise.reject(error);
  }
);

Vue.use(VueAxios, instance_axios);
  //  定义apiGet方法
var apiGet = (url, query=null, config=null) => {
  if(!config) {
    config = {showLoading: true}
  }
  if(query){
    Object.assign(config, {params: query});
  }
  return Vue.axios.get(url, config);
}
  // 定义apiPost方法
var apiPost = (url, data=null, config=null) => {
  if(!config) {
    config = {showLoading: true}
  }
  if(data){
    data = querystring.stringify(data);
  }
  return Vue.axios.post(url, data, config);
};

Vue.apiGet = apiGet;
Vue.apiPost = apiPost;
Vue.prototype.apiGet = apiGet;
Vue.prototype.apiPost = apiPost;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
