<template>
  <div class="zwCollent">
    <van-nav-bar title="职位收藏" left-text="返回" left-arrow @click-left="goback" >
      <i class="iconfont icon-more" slot="right" />
    </van-nav-bar>
    <div style="margin-top:55px"></div>
    <div class="collect-item" @click="toworkDetail">
        <div class="jobDescribe">
          <span style="font-size:16px">流水线安装工</span>
          <span style="font-size:12px;color: #9b9b9b">武汉 | 3-5年工作经验 | 中专</span>
          <span style="font-size:12px;color: #9b9b9b">湖北武汉美的有限公司</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:17px">3K-5K/月</span><br>
          <span style="font-size:12px;color: #9b9b9b">3天前</span>
        </div>
    </div>

      <div class="collect-item">
        <div class="jobDescribe">
          <span style="font-size:16px">流水线安装工</span>
          <span style="font-size:12px;color: #9b9b9b">武汉 | 3-5年工作经验 | 中专</span>
          <span style="font-size:12px;color: #9b9b9b">湖北武汉美的有限公司</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:17px">3K-5K/月</span><br>
          <span style="font-size:12px;color: #9b9b9b">3天前</span>
        </div>
      </div>

      <div class="collect-item">
        <div class="jobDescribe">
          <span style="font-size:16px">流水线安装工</span>
          <span style="font-size:12px;color: #9b9b9b">武汉 | 3-5年工作经验 | 中专</span>
          <span style="font-size:12px;color: #9b9b9b">湖北武汉美的有限公司</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:17px">3K-5K/月</span><br>
          <span style="font-size:12px;color: #9b9b9b">3天前</span>
        </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import '../../assets/img/icon-more/iconfont.css'
import 'vant/lib/vant-css/index.css';
import {
  NavBar
} from 'vant';
Vue.use(NavBar);

export default {
  data(){
    return{

    }
  },
  methods:{
    goback(){
      this.$router.go(-1)
    },
    toworkDetail(){
      this.$router.push({name:'workDetail'})
    }
  }
}
</script>

<style>
.van-nav-bar {
  background: #1b1b1f;
  color: #ffffff;
  width: 100%;
  position: fixed;
  top: 0;
}
.zwCollent .van-nav-bar__arrow::before,.van-nav-bar__text,.icon-more::before{
  color: #ffffff;
}
.collect-item{
  background: #ffffff;
  height: 90px;
  margin: 10px auto
}
.jobDescribe{
  width: 50%;
  margin-left: 6%;
  float: left;
  padding-top: 8px;
}
.jobDescribe span{
  display: block;
  height: 25px;
  line-height: 25px
}
.workRight{
  width: 30%;
  float: right;
  text-align: right;
  margin-right: 6%;
  padding-top: 8px;
}
.workRight span{
  display: block;
  height: 25px;
  line-height: 25px
}
</style>
