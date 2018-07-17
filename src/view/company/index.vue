<template>
  <div>
    <van-nav-bar title="公司">
    </van-nav-bar>
    <div style="padding-top:45px"></div>
    <div style="background:#fff">
      <van-swipe :autoplay="3000">
        <!-- 图片轮播 -->
        <van-swipe-item v-for="(imgurl,index) in imgurls" :key="index">
          <img style="width:100%" :src="'http://gcbus.whyxzz.cn' + imgurl" alt="">
        </van-swipe-item>

      </van-swipe>
    </div>
      <input class="search" @click="onSearch" placeholder="    搜索公司/职位名" />
      <!-- 用vant列表实现懒加载 -->
      <van-list v-model="loading" :finished="finished" :offset='220' @load="loadList" >
        <div class="company-item" @click="toCompany(com.ID)" v-for="(com,index) in coms" :key="index">
          <div class="comLogo">
            <img :src="'http://gcbus.whyxzz.cn' + com.ComLogoImg" alt="">
          </div>
          <div class="jobDescribe">
            <span style="font-size:15px">{{com.ComName}}</span>
            <span style="font-size:12px;color: #9b9b9b">{{com.ComAllName}}</span>
            <span style="font-size:12px;color: #9b9b9b">{{com.ComNature}}</span>
          </div>
          <div class="workRight">
            <span style="color:#f7364e;font-size:16px"><i class="iconfont icon-huore"></i>{{com.ViewCount}}</span><br>
            <span style="font-size:12px;color: #9b9b9b">{{com.OfferCount}}个在找职位</span>
          </div>
        </div>
      </van-list>
  </div>
</template>

<script>
import 'vant/lib/vant-css/index.css';
import '../../assets/img/icon-fire/iconfont.css';
import Vue from 'vue';
import { NavBar, Swipe, SwipeItem, Loading, List } from 'vant';
Vue.use(NavBar)
.use(Swipe)
.use(SwipeItem)
.use(Loading)
.use(List)
export default {
  data () {
    return {
      flag: true,
      coms: '',
      company: '',
      imgurls: '',
      loading: false,
      finished: false,
      curPage: 2
    }
  },
  methods:{
    menu() {   //定位页面初始位置
      window.scrollTo(0,0);
     },
    toCompany(e){
    this.$router.push({name:'company-information',params:{Cid: e}})
    },
    loadList() {
      setTimeout(() => {       //实现列表懒加载
        Vue.apiGet("/api/hr/company/ComOfferList/" + this.curPage).then(res => {
          let _data = res.data;
          if (_data.length == 0){
            this.finished = true;
          }
          else{
            this.coms = this.coms.concat(_data);
          }
           this.loading = false;
        })
        this.curPage ++;
      }, 500);
    },
    onSearch(){
      this.$router.push({name:'search'})
    },
  },
  mounted(){
    Vue.apiGet("/api/hr/company/ComOfferList/1").then(res => {
      this.coms = res.data
    })
    Vue.apiGet("/api/hr/company/CompanyInfo/07a5d8f2-77ec-4258-81b9-f9a607c35701").then(res => {
      this.company = res.data[0];
      let _src = res.data[0].ComImg;
      this.imgurls = JSON.parse(_src);
    })
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
  margin:15px auto;
  background: #ffffff;
  width: 94%;
  margin-left: 3%;
  border-radius: 6px;
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
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
