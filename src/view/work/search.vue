<template>
<div>
  <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="goback" >
      <i class="iconfont icon-more" slot="right" />
  </van-nav-bar>
  <div class="searchBar">
    <van-search
      v-model="value"
      show-action
      @search="onSearch"
      background="#ffffff"
    >
    <div slot="action" @click="onSearch">搜索</div>
    </van-search>
  </div>
  <div class="zw-tj">
    <p style="margin-left:5%;font-weight:600;margin-top:20px;padding-top:15px">职位推荐</p>
    <div class="recordWork">
      <span>操作工</span>
      <span>操作工</span>
      <span>操作工</span>
      <span>操作工</span>
      <span>操作工</span>
    </div>
  </div>

  <div class="index-Item" @click="toworkDetail">
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
import '../../assets/img/icon-more/iconfont.css'
import Vue from 'vue';
import { NavBar, Search } from 'vant';
Vue.use(NavBar)
   .use(Search);
export default {
  data(){
    return{
      value: ''
    }
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    },
    onSearch(){

    },
    toworkDetail(){
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
.searchBar{
  padding-top: 65px;
}
.van-search{
  height: 37px;
  width: 86%;
  margin-left: 7%;
  background: #ffffff;
  border-radius: 10px;
}
.van-search >>> .van-search__action{
  margin-right: 10px;
  color: #666
}
.recordWork{
  width: 90%;
  margin-left: 5%;
}
.recordWork span{
  display: block;
  width: 28%;
  text-align: center;
  font-size: 15px;
  float: left;
  line-height: 28px;
  margin: 0 8px 10px;
  background: #efefef;
  border-radius: 10px;
  color: #333
}
.zw-tj{
  background: #ffffff;
  height: 138px;
  border-bottom: 1px solid #dfdfdf;
}
.index-Item{
  height:90px;
  background: #ffffff;
  border-bottom: 1px solid #dfdfdf;
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
