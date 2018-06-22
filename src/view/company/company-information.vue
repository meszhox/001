<template>
<div class="com-information">
    <van-nav-bar title="职位详情" left-text="返回" left-arrow @click-left="goback" >
      <i class="iconfont icon-more" slot="right" />
  </van-nav-bar>
  <div class="company-item">
    <div class="comLogo">
      <img src="../../assets/img/companyLogo.png" alt="">
    </div>
    <div class="jobDescribe">
      <span style="font-size:16px;font-weight:600">格力集团</span><br>
      <span style="font-size:12px;color: #9b9b9b">家电产品</span>
    </div>
  </div>
  <div class="nor-info">
    <p>  性质：上市公司</p>
    <p>  规模：10000-30000人</p>
    <p>  范围：家电、物流、照明等</p>
    <p>  地址：广东省佛山市顺德区美的大道6号</p>
    <p>  网址：www.meidi.com</p>
  </div>
  <div style="background:#fff;height:auto">
    <div class="information-post">
      <button @click="showDetail" :class="[unDisplay ? 'not-choose' : 'active' ]">公司详情</button>
      <button @click="showJobs" :class="[unDisplay ?  'active' : 'not-choose' ]">在招职位</button>
    </div>
  </div>
  <div :class="[unDisplay ?  'show-nothing' : '' ]">
    <div :class="[showFull ? 'show-wall' : 'qy-jj' , 'normal-style' ]">
      <span>企业简介</span>
      <p>美的集团（SZ.000333）是一家领先的消费电器、暖通空调、机器人及工业自动化系统、智能供应链（物流）的科技集团 。
      <p>美的集团提供多元化的产品和服务，包括以厨房家电、冰箱、洗衣机、及各类小家电的消费电器业务、以家用空调、中央空调、供暖及通风系统的暖通空调业务；以库卡集团、安川机器人合资公司等为核心的机器人及工业自动化系统业务、以安得智联为集成解决方案服务平台的智能供应链业务。美的坚守“为客户创造价值”的原则，致力创造美好生活。美的专注于持续的技术革新，以提升产品及服务质量，令生活更舒适、更美好。</p>
      <p>美的于1968年成立于中国广东，迄今已建立遍布全球业务平台。美的在世界范围内拥有约200家子公司、60多个海外分支机构及10个战略业务单位，同时为德国库卡集团最主要股东（约95%）。</p>
      <p>2015年1月8日，《房间空气调节器节能关键技术研究及产业化》获得“国家科技进步奖”二等奖。 2016年7月20日，美的集团以221.73亿美元的营业收入首次进入《财富》世界500强名单，位列第481位。2017年5月25日，福布斯2017全球企业2000强榜单正式出炉，美的位列335名。1月5日，腾讯QQ和美的集团在深圳正式签署战略合作协议，双方将共同构建基于IP授权与物联云技术的深度合作，实现家电产品的连接、对话和远程控制。[2017天猫双十一“亿元俱乐部”榜单显示，美的位列第二名。</p>
      <button @click="showWall">收起</button>
    </div>
    <button @click="showAll" :class="showFull ? 'show-it' : 'not-show' ">展开</button>
    <div class="environment">
      <span>公司环境</span>
      <img src="../../assets/img/icon-10.png" alt="">
    </div>
    <div class="commend-job">
      <span>推荐职位</span>
      <div class="index-Item">
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

  <div :class="[unDisplay ?  '' : 'show-nothing' ]">
    <div class="index-Item">
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

      <div class="index-Item">
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

      <div class="index-Item">
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
import 'vant/lib/vant-css/index.css';
import '../../assets/img/icon-more/iconfont.css'
import Vue from 'vue'
import { NavBar } from 'vant'
Vue.use(NavBar)

export default {
  data(){
    return{
      unDisplay: null,
      showFull: true,
    }
  },
  methods:{
    goback(){
      this.$router.go(-1)
    },
    showDetail(){
      this.unDisplay = null;
    },
    showJobs(){
      this.unDisplay = true;
    },
    showAll(){
      this.showFull = null;
    },
    showWall(){
      this.showFull = true;
    }
  }
}
</script>

<style scoped>
.com-information{
  background: #ffffff;
}
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
.comLogo{
  width: 19%;
  margin-left: 5%;
  float: left;
}
.comLogo img{
  width: 52px;
  display: block;
  margin: 35px auto
}
.company-item{
  padding-top: 50px;
  height:90px;
}
.jobDescribe{
  margin-left: 8px;
  padding-top: 8px;
  float: left;
}
.jobDescribe span{
  display: block;
  height: 25px;
  line-height: 25px
}
.nor-info{
  height: auto;
  font-size: 14px;
  margin: 0;
  padding: 10px;
  border-bottom: 1px solid #dfdfdf
}
.nor-info p{
  width: 90%;
  margin:0 5% 0;
  height: 24px;
  line-height: 24px;
  color: #555
}
.information-post{
  overflow: hidden;
}
.not-choose{
  width: 50%;
  border: none;
  float: left;
  font-weight: bold;
  color: #333;
  line-height: 45px;
  background: #ffffff
}
.active{
  width: 50%;
  border: none;
  float: left;
  font-weight: bold;
  color: #10b7ca;
  border-bottom: 1px solid #10b7ca;
  line-height: 45px;
  background: #ffffff
}
.show-wall{
  margin: 0;
  width: 90%;
  margin-left: 5%;
  height: 150px;
  clear: both;
  background: #f5f5f5;
  overflow: hidden;
}
.qy-jj{
  margin: 0;
  width: 90%;
  margin-left: 5%;
  height: auto;
}
.normal-style span{
  display: block;
  margin-top: 15px;
  line-height: 35px;
}
.normal-style p{
  margin: 0;
  line-height: 26px;
  color: #777;
  font-size: 15px
}
.qy-jj button{
  width: 100%;
  border: none;
  background: #ffffff;
  color: #10b7ca;
  height: 30px;
  font-weight: 600;
  border-bottom: 1px solid rgba(16, 183, 202, 0.3)
}
.environment{
  width: 90%;
  margin-left: 5%;
  margin-top: 15px;
}
.environment img{
  width: 100%
}
.environment span{
  display: block;
  line-height: 35px;
}
.commend-job{
  width: 90%;
  margin-left: 5%;
  margin-top: 15px;
}
.commend-job span{
  display: block;
  line-height: 35px
}
.index-Item{
  height:90px;
  margin:20px auto;
  background: #ffffff
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
.show-nothing{
  display: none
}
.not-show{
  display: none;
}
.show-it{
  width: 100%;
  color: #10b7ca;
  font-weight: 600;
  border: none;
  background: #ffffff;
  line-height: 35px
}
</style>
