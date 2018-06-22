<template>
  <div>
    <van-nav-bar title="公司" left-text="返回" left-arrow >
      <i class="iconfont icon-more" slot="right" />
    </van-nav-bar>
    <div style="padding-top:45px"></div>
    <div>
      <img style="width: 100%" src="../../assets/img/banner.png" alt="">
    </div>
      <input class="search" placeholder="    搜索公司/职位名" />

      <div class="company-item">
        <div class="comLogo">
          <img src="../../assets/img/companyLogo.png" alt="">
        </div>
        <div class="jobDescribe">
          <span style="font-size:15px">格力</span>
          <span style="font-size:12px;color: #9b9b9b">湖北武汉格力有限公司</span>
          <span style="font-size:12px;color: #9b9b9b">武汉  |  生产制造</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:16px"><i class="iconfont icon-huore"></i>34212</span><br>
          <span style="font-size:12px;color: #9b9b9b">1345个在找职位</span>
        </div>
      </div>

      <div class="company-item">
        <div class="comLogo">
          <img src="../../assets/img/companyLogo.png" alt="">
        </div>
        <div class="jobDescribe">
          <span style="font-size:15px">格力</span>
          <span style="font-size:12px;color: #9b9b9b">湖北武汉格力有限公司</span>
          <span style="font-size:12px;color: #9b9b9b">武汉  |  生产制造</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:16px"><i class="iconfont icon-huore"></i>212</span><br>
          <span style="font-size:12px;color: #9b9b9b">345个在找职位</span>
        </div>
      </div>

      <div class="company-item">
        <div class="comLogo">
          <img src="../../assets/img/companyLogo.png" alt="">
        </div>
        <div class="jobDescribe">
          <span style="font-size:15px">格力</span>
          <span style="font-size:12px;color: #9b9b9b">湖北武汉格力有限公司</span>
          <span style="font-size:12px;color: #9b9b9b">武汉  |  生产制造</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:16px"><i class="iconfont icon-huore"></i>3421</span><br>
          <span style="font-size:12px;color: #9b9b9b">135个在找职位</span>
        </div>
      </div>



  </div>
</template>

<script>
import 'vant/lib/vant-css/index.css';
import '../../assets/img/icon-fire/iconfont.css';
import Vue from 'vue';
import { NavBar } from 'vant';
Vue.use(NavBar)
export default {
  data () {
    return {
      flag: true
    }
  }

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
.search{
  margin-top: 20px;
  height: 26px;
  width: 80%;
  margin-left: 10%;
  border: 2px solid #10b7ca;
  border-radius: 30px;
}
.comLogo{
  width: 19%;
  margin-left: 5%;
  float: left;
}
.comLogo img{
  width: 61px;
  display: block;
  margin: 35px auto
}
.company-item{
  height:90px;
  margin:20px auto;
  background: #ffffff
}
.jobDescribe{
  width: 38%;
  margin-left: 18px;
  padding-top: 8px;
  float: left;
}
.jobDescribe span{
  display: block;
  height: 25px;
  line-height: 25px
}
.workRight{
  width: 27%;
  padding-top: 8px;
  float: right;
  text-align: right;
  margin-right: 5%;
}
.workRight span{
  display: block;
  height: 25px;
  line-height: 25px
}
.icon-huore::before{
  font-size: 18px;
}
</style>
