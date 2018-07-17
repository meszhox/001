<template>
<div class="com-information">
  <!-- vant组件 导航栏 -->
  <van-nav-bar title="公司详情" left-text="返回" left-arrow @click-left="goback" >
  </van-nav-bar>
  <div class="company-item">
    <!-- 公司logo -->
    <div class="comLogo">
      <img :src="'http://gcbus.whyxzz.cn' + logoPath" alt="">
    </div>
    <div class="jobDescribe">
      <span style="font-size:16px;font-weight:600">{{mainComInfo.ComName}}</span><br>
      <span style="font-size:12px;color: #9b9b9b">{{mainComInfo.ComBusiness}}</span>
    </div>
  </div>
  <!-- 公司信息概要 -->
  <div class="nor-info">
    <p>  性质：{{mainComInfo.ComNature}}</p>
    <p>  规模：{{mainComInfo.ComScale}}</p>
    <p>  范围：{{mainComInfo.ComBusiness}}</p>
    <p>  地址：{{mainComInfo.ComAddress}}</p>
    <p>  网址：{{mainComInfo.ComWebsite}}</p>
  </div>
  <!-- vant组件 标签页 -->
  <van-tabs @click='changePage'  v-model="active" swipeable :line-width='140'>
    <!-- 标签页第一个页面 -->
    <van-tab index="0">
      <div slot="title">
        公司详情
      </div>
      <!-- 点击展开和点击收起采用不同的样式，没有数据不显示 -->
      <div v-if="mainComInfo.ComIntroduce != null" :class="[showFull ? 'show-wall' : 'qy-jj' , 'normal-style' ]">
        <span>企业简介</span>
        <p>{{mainComInfo.ComIntroduce}}</p>
        <button @click="showWall">收起</button>
      </div>
      <div v-if="mainComInfo.ComIntroduce != null" class="showAll-button">
        <button @click="showAll" :class="showFull ? 'show-it' : 'not-show' ">展开</button>
      </div>
      <div v-if="envImgs != null" class="environment">
        <span>公司环境</span>
        <!-- vant 轮播插件 -->
        <van-swipe :autoplay='null'>
          <van-swipe-item v-for="(envImg,index) in envImgs" :key="index">
            <img style="width:100%;height:170px" :src="'http://gcbus.whyxzz.cn' + envImg" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div v-if="recommendWorks != null" class="commend-job">
        <span>推荐职位</span>
        <div class="index-Item" v-for="(recommendWork,index) in recommendWorks" :key="index" >
          <div class="jobDescribe">
            <span style="font-size:16px">{{recommendWork.JobName}}</span>
            <span style="font-size:12px;color: #9b9b9b">{{recommendWork.City}} | {{recommendWork.YearsMin}}-{{recommendWork.YearsMax}}年工作经验 | {{recommendWork.EduLevel}}</span>
            <span style="font-size:12px;color: #9b9b9b">{{recommendWork.ComName}}</span>
          </div>
          <div class="workRight">
            <span style="color:#f7364e;font-size:17px">{{recommendWork.SalaryMin}}K-{{recommendWork.SalaryMax}}K/月</span><br>
            <span style="font-size:12px;color: #9b9b9b">3天前</span>
          </div>
        </div>
      </div>
    </van-tab>

    <!-- 第二个标签页 -->
    <van-tab index="1" title="在招职位">
      <div @click="toWorkDetail(offering.ID)" class="index-Item" v-for="(offering,index) in offerings" :key="index">
          <div class="jobDescribe">
            <span style="font-size:16px">{{offering.JobName}}</span>
            <span style="font-size:12px;color: #9b9b9b">{{offering.City}} | {{offering.YearsMin}}-{{offering.YearsMax}}年工作经验 | {{offering.EduLevel}}</span>
            <span style="font-size:12px;color: #9b9b9b">{{offering.ComName}}</span>
          </div>
          <div class="workRight">
            <span style="color:#f7364e;font-size:17px">{{offering.SalaryMin}}K-{{offering.SalaryMax}}K/月</span><br>
            <span style="font-size:12px;color: #9b9b9b">热招中</span>
          </div>
        </div>
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
import 'vant/lib/vant-css/index.css';
import Vue from 'vue'
import { NavBar, Tab, Tabs, Swipe, SwipeItem, } from 'vant'
Vue.use(NavBar)
.use(Tab)
.use(Tabs)
.use(Swipe)
.use(SwipeItem)

export default {
  data(){
    return{
      showFull: true,
      active:0,
      mainComInfo: '',
      logoPath: '',
      envImgs: '',
      recommendPage: 1,
      offerings: [],
      recommendWorks: '',
    }
  },
  methods:{
    menu() {  //定位页面初始位置
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    },
    showAll(){
      this.showFull = null;
    },
    showWall(){
      this.showFull = true;
    },
    toWorkDetail(e){
      this.$router.push({name:'workDetail',params:{ _id: e }})
    },
    changePage(index){      //点击不同标签页触发
      let _cid = this.$route.params.Cid;
      Vue.apiGet("/api/hr/company/CompanyInfo/" + _cid).then(res => {
        var _Cid = res.data[0].ID;
        if(index == 1 ){
        this.$http.post("/api/hr/Offers/offeron/1",{Cid: _Cid}).then(res => {
          let _data = res.data
          this.offerings = _data
          console.log(this.offerings)
        })
      }
      })
    }
  },
  mounted(){
    let _cid = this.$route.params.Cid;   //获取上一个页面传回的Cid值
    Vue.apiGet("/api/hr/company/CompanyInfo/" + _cid).then(res => {     //获取公司信息接口
      this.mainComInfo = res.data[0];
      this.logoPath = JSON.parse(res.data[0].ComLogoImg);
      let _envImgs = res.data[0].ComImg;
      this.envImgs = JSON.parse(_envImgs);
    })
    Vue.apiPost("/api/hr/Offers/OfferRecomment/" + this.recommendPage , { "": "" }).then(res => {   //获取推荐职位
      this.recommendWorks = res.data
      console.log(res.data)
    })
  },
  created(){
    this.menu()  //created生命周期调用menu函数
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
/* .jobDescribe{
  margin-left: 8px;
  padding-top: 8px;
  float: left;
} */
.jobDescribe span{
  display: block;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nor-info{
  height: auto;
  font-size: 14px;
  margin: 0;
  padding: 10px;
  word-break: normal;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.nor-info p{
  width: 90%;
  margin:0 5% 0;
  color: #555;

}
.show-wall{
  margin: 0;
  width: 90%;
  margin-left: 5%;
  height: 150px;
  /* clear: both;
  background: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1)); */
  overflow: hidden;
  /* transition: height 2s; */
}
.qy-jj{
  margin: 0;
  width: 90%;
  margin-left: 5%;
  height: auto;
  /* transition: height 2s;
  height: 820px; */
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
  margin:15px auto;
  background: #ffffff;
  width: 94%;
  margin-left: 3%;
  border-radius: 6px;
}
.jobDescribe{
  width: 50%;
  margin-left: 6%;
  padding-top: 8px;
  float: left;
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
.van-tabs >>> .van-tabs__wrap{
  z-index: 0;
}
.van-tabs >>> .van-tab--active{
  color: #10b7ca
}
.van-tabs >>> .van-tabs__line{
  background: #10b7ca
}
</style>
