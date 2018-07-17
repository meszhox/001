<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页" >
    </van-nav-bar>
    <!-- vant 下拉刷新 -->
    <van-pull-refresh  v-model="isLoading" @refresh="onRefresh">
    <div style="margin-top:45px;background:#fff" @click="toCompany">
      <van-swipe :autoplay="3000">
        <!-- 图片轮播 -->
        <van-swipe-item v-for="(src,index) in srcs" :key="index">
          <img style="width:100%" :src="'http://gcbus.whyxzz.cn' + src" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- vant组件标签页,改显示图片 -->
    <van-tabbar>
      <van-tabbar-item :info=recordNum @click="toRecord">
        <span>申请记录</span>
        <template slot="icon" slot-scope="props">
        <img src="../../assets/img/icon-1.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :info=collectNum @click="workCollect">
        <span>职位收藏</span>
        <template slot="icon" slot-scope="props">
        <img src="../../assets/img/icon-2.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :info=commendNum @click="workCommend">
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
        <span style="color:#f7364e;font-size:20px;font-weight:600">{{fllows}}<sup><i class="iconfont icon-add"></i></sup></span>
        <span style="color:#565656;font-size:12px">累计关注</span>
      </div>
      <div class="numInfo">
        <span style="color:#f7364e;font-size:20px;font-weight:600">{{haveCompanys}}<sup><i class="iconfont icon-add"></i></sup></span>
        <span style="color:#565656;font-size:12px">服务企业</span>
      </div>
      <div class="numInfo">
        <span style="color:#f7364e;font-size:20px;font-weight:600">{{haveWorks}}<sup><i class="iconfont icon-add"></i></sup></span>
        <span style="color:#565656;font-size:12px">在找岗位</span>
      </div>
    </div>
      <div class="search">
        <!-- vant  search组件 -->
        <van-search @click="onSearch" background="#ffffff" placeholder="搜索全文/职位名" v-model="value" />
      </div>
      <van-list v-model="loading" :finished="finished" :offset='220' @load="loadList" >
        <div class="index-Item" @click="toDetail(work.ID)" v-for="(work,index) in workList" :key="index">
          <div class="jobDescribe">
            <span style="font-size:16px">{{work.JobName}}</span>
            <span style="font-size:12px;color: #9b9b9b">{{work.City}} | {{work.YearsMin}} - {{work.YearsMax}}年工作经验 | {{work.EduLevel}}</span>
            <span style="font-size:12px;color: #9b9b9b">{{work.ComName}}</span>
          </div>
          <div class="workRight">
            <span style="color:#f7364e;font-size:17px">{{work.SalaryMin}}K-{{work.SalaryMax}}K/月</span><br>
            <span style="font-size:12px;color: #9b9b9b">热招中...</span>
          </div>
        </div>
      </van-list>

  </van-pull-refresh>
</div>
</template>

<script>
import 'vant/lib/vant-css/index.css';
import '../../assets/img/icon-add/iconfont.css'
import Vue from 'vue'
import {
  NavBar, Search, Tabbar, TabbarItem, Icon, Swipe, SwipeItem, PullRefresh, List
} from 'vant';
Vue.use(NavBar)
.use(Search)
.use(Tabbar)
.use(Icon)
.use(Swipe)
.use(SwipeItem)
.use(PullRefresh)
.use(List)
.use(TabbarItem);
document.body.addEventListener('touchstart', function () {});
export default {
  data () {
    return {
      value: '',
      srcs:[],
      isLoading:false,
      fllows:'',
      haveCompanys:'',
      haveWorks:'',
      recordNum:'',
      collectNum:'',
      commendNum:'',
      workList:[],
      loading: false,
      finished: false,
      curPage: 1,
    }
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    toCompany(){
      this.$router.push({name:'login'})
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
    toDetail(e){
      this.$router.push({name:'workDetail',params:{ _id: e }})
    },
    onRefresh(){                                 //下拉刷新
      setTimeout(() => {
        Vue.apiPost("/api/hr/Offers/1/r/0",{
          _Status: "Y"
        }).then(res => {
          let _data = res.data.Content.Table;
          let _DateNow = new Date();
          for(let i=0; i<_data.length; i++){
            let _DateOld = new Date(_data[i].Create_Date);
            let time = this.timePicker(_DateNow,_DateOld);
            this.$set(_data[i], 'time', time)                 //获取发布日期与当前日期的相差天数
          }
          this.workList = _data
        })
        this.$toast('最新内容已装载完毕');
        this.isLoading = false;
      },500)
    },
    loadList() {               //懒加载
      setTimeout(() => {
        this.$http.post("/api/hr/Offers/1/r/" + this.curPage,{ _Status: 'Y' }).then(res => {
          let _data = res.data;
          if (_data.Content == null){
            this.finished = true;
          }
          else{
            let _works = _data.Content.Table;
            let _DateNow = new Date();
            for(let i=0; i<_works.length; i++){
              let _DateOld = new Date(_works[i].Create_Date);
              let time = this.timePicker(_DateNow,_DateOld);
              this.$set(_works[i], 'time', time);              //获取相差天数
            }
            this.workList = this.workList.concat(_works);
            console.log(this.workList);
          }
           this.loading = false;
        })
        this.curPage ++;
      }, 500);
    },
    timePicker(now,old){                  //计算相差天数
      var timeNow = now.getTime();
      var timeOld = old.getTime();
      var seconds = timeNow - timeOld;
      var days = parseInt(seconds / (1000 * 60 * 60 * 24));
      return days
    }
  },
  mounted(){
    Vue.apiGet("/api/hr/Offers/AttentionCount").then(res => {
        this.fllows = res.data.wxUserCount;
        this.haveCompanys = res.data.CompanyCount;
        this.haveWorks = res.data.OfferCount;
      })
    Vue.apiPost("/api/hr/Offers/informationcount", { "": "" }).then(res => {
      this.recordNum = res.data.ApplyCount;
      this.collectNum = res.data.CollectCount;
      this.commendNum = res.data.RecommentCount;
      console.log(res.data)
    })
    Vue.apiGet("/api/hr/company/CompanyInfo/07a5d8f2-77ec-4258-81b9-f9a607c35701").then(res => {
      let _src = res.data[0].ComImg;
      this.srcs = JSON.parse(_src);
      console.log(res.data);
    })
    Vue.apiPost("/api/hr/Offers/1/r/0",{
      _Status: "Y"
    }).then(res => {
      let _data = res.data.Content.Table;
      let _DateNow = new Date();
      for(let i=0; i<_data.length; i++){
        let _DateOld = new Date(_data[i].Create_Date);
        let time = this.timePicker(_DateNow,_DateOld);
        this.$set(_data[i], 'time', time)
      }
      this.workList = _data
    })
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
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
