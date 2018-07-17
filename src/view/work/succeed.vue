<template>
<div>
  <van-nav-bar title="喻信中智" left-text="返回" left-arrow @click-left="goback" >
  </van-nav-bar>
  <div style="margin-top:45px"></div>
  <div class="send-success">
    <i class="iconfont icon-success"></i>
    <p>投递成功，请耐心等待反馈！</p>
  </div>
  <div class="similar-work">
    <p>相似职位</p>

    <div class="index-Item" @click="toDetail">
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

      <div class="index-Item" @click="toDetail">
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
</div>
</template>

<script>
import '../../assets/img/icon-success/iconfont.css'
import 'vant-css';
import Vue from 'vue';
import { NavBar } from 'vant';
Vue.use(NavBar)
export default {
  data(){
    return{

    }
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    },
    toDetail(){
    this.$router.push({name:'workDetail'})
  }
  },
  created(){
    this.menu()
  },
}
</script>

<style scoped>
.van-nav-bar {
  background: #1b1b1f;
  color: #ffffff;
  width: 100%;
  position: fixed;
  top: 0;
}
.van-icon,.van-nav-bar >>> .van-nav-bar__text,.van-nav-bar >>> .van-icon::before{
  color: #ffffff;
}
.send-success{
  text-align: center;
  color: #10b7ca;
  padding-top: 20px;
  background: #ffffff
}
.send-success p{
  font-size: 14px;
  margin-bottom: 0;
  padding-bottom: 20px;
}
.icon-success{
  font-size: 66px;
}
.similar-work{
  background: #ffffff
}
.similar-work p{
  margin: 0 0 0 5%;
  font-weight: 600;
  font-size: 17px
}
.index-Item{
  height:90px;
  margin:10px auto;
}
.jobDescribe{
  width: 50%;
  margin-left: 6%;
  padding-top: 8px;
  float: left;
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
