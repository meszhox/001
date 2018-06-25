<template>
  <div>
    <van-nav-bar title="首页" left-text="返回" left-arrow >
      <i class="iconfont icon-more" slot="right" />
    </van-nav-bar>
    <div style="padding-top:45px;background:#fff" @click="toCompany">
      <van-swipe :autoplay="3000">
        <!-- 图片轮播 -->

        <!-- <van-swipe-item v-for="(image, index) in images" :key="index">
          <img style="width:100%" :src="image.url" alt="">
        </van-swipe-item> -->

        <van-swipe-item><img style="width:100%" src="../../assets/img/banner.png" alt=""></van-swipe-item>
        <van-swipe-item><img style="width:100%" src="../../assets/img/firstpage2.png" alt=""></van-swipe-item>
        <van-swipe-item><img style="width:100%" src="../../assets/img/firstpage3.png" alt=""></van-swipe-item>

      </van-swipe>
    </div>
    <!-- <div style="height:120px;border-bottom:1px solid #cfcfcf">
      <div class="middle" @click="toRecord">
        <img src="../../assets/img/icon-1.png" alt="">
        <span>申请记录</span>
      </div>
      <div class="middle" @click="workCollect">
        <img src="../../assets/img/icon-2.png" alt="">
        <span>职位收藏</span>
      </div>
      <div class="middle" @click="workCommend">
        <img src="../../assets/img/icon-3.png" alt="">
        <span>职位推荐</span>
      </div>
      <div class="middle" @click="teach">
        <img src="../../assets/img/icon-4.png" alt="">
        <span>求职攻略</span>
      </div>
    </div> -->

    <van-tabbar>
      <van-tabbar-item info="2" @click="toRecord">
        <span>申请记录</span>
        <template slot="icon" slot-scope="props">
        <img src="../../assets/img/icon-1.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item info="5" @click="workCollect">
        <span>职位收藏</span>
        <template slot="icon" slot-scope="props">
        <img src="../../assets/img/icon-2.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item info="23" @click="workCommend">
        <span>职位推荐</span>
        <template slot="icon" slot-scope="props">
        <img src="../../assets/img/icon-3.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click="teach">
        <span>求职攻略</span>
        <template slot="icon" slot-scope="props">
        <img src="../../assets/img/icon-4.png" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <div style="overflow:hidden">
      <div class="numInfo">
        <span style="color:#f7364e;font-size:20px;font-weight:600">1107<sup><i class="iconfont icon-add"></i></sup></span>
        <span style="color:#565656;font-size:12px">累计关注</span>
      </div>
      <div class="numInfo">
        <span style="color:#f7364e;font-size:20px;font-weight:600">90<sup><i class="iconfont icon-add"></i></sup></span>
        <span style="color:#565656;font-size:12px">服务企业</span>
      </div>
      <div class="numInfo">
        <span style="color:#f7364e;font-size:20px;font-weight:600">62<sup><i class="iconfont icon-add"></i></sup></span>
        <span style="color:#565656;font-size:12px">在找岗位</span>
      </div>
    </div>
      <div class="search">
        <van-search @click="onSearch" background="#ffffff" placeholder="搜索全文/职位名" v-model="value" />
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
</template>

<script>
import 'vant/lib/vant-css/index.css';
import '../../assets/img/icon-add/iconfont.css'
import '../../assets/img/icon-more/iconfont.css'
import Vue from 'vue'
import {
  NavBar, Search, Tabbar, TabbarItem, Icon, Swipe, SwipeItem
} from 'vant';
Vue.use(NavBar)
.use(Search)
.use(Tabbar)
.use(Icon)
.use(Swipe)
.use(SwipeItem)
.use(TabbarItem);
export default {
  data () {
    return {
      value: '',
    }
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    toCompany(){
      this.$router.push({name:'company'})
    },
    toRecord(){
      this.$router.push({name:'sq-record'})
    },
    workCollect(){
      this.$router.push({name:'zw-collection'})
    },
    workCommend(){
      this.$router.push({name:'zw-commend'})
    },
    teach(){
      this.$router.push({name:'teach'})
    },
    onSearch(){
      this.$router.push({name:'search'})
    },
    toDetail(){
      this.$router.push({name:'workDetail'})
    }
  },
  created(){
    this.menu()
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
.middle{
  width: 25%;
  float: left;
}
.numDot{
  background: rgb(233,0,0);
  width: 18px;
  height: 18px;
  border-radius: 100%;
  color: #ffffff;
}
.van-tabbar--fixed{
  position: relative;
  height: 110px;
  background: #ffffff
}
.van-tabbar-item__icon img{
  height: 45px;
}
.numInfo{
  width: 33.3%;
  padding-top: 10px;
  height: 70px;
  background: #ffffff;
  float: left;
  text-align: center;
}
.numInfo span{
  display: block;
  margin-top: 6px;
}
.van-search{
  height: 35px;
  width: 80%;
  margin-left: 10%;
  border: 1px solid #10b7ca;
  border-radius: 30px;
}
.search{
  margin-top: 20px;
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
.icon-add:before{
  font-size: 13px;
}
</style>
