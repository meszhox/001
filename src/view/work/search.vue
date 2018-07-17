<template>
<div>
  <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="goback" >
  </van-nav-bar>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :animation-duration='200' >
    <div style="min-height:600px">
      <div class="searchBar">
        <van-search
          autofocus
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
        <div v-for="(offer,index) in offerCommends" :key="index" v-if="index < 6" class="recordWork">
          <span>{{offer.JobName}}</span>
        </div>
      </div>

      <div v-for="(offerCommend,index) in offerCommends" :key="index" class="index-Item" @click="toworkDetail(offerCommend.ID)">
        <div class="jobDescribe">
          <span style="font-size:16px">{{offerCommend.JobName}}</span>
          <span style="font-size:12px;color: #9b9b9b">{{offerCommend.City}} | {{offerCommend.YearsMin}}-{{offerCommend.YearsMax}}年工作经验 | {{offerCommend.EduLevel}}</span>
          <span style="font-size:12px;color: #9b9b9b">{{offerCommend.ComName}}</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:17px">{{offerCommend.SalaryMin}}K-{{offerCommend.SalaryMax}}K/月</span><br>
          <span style="font-size:12px;color: #9b9b9b">{{offerCommend.time}}天前</span>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</div>
</template>

<script>
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import { NavBar, Search, PullRefresh } from 'vant';
Vue.use(NavBar)
   .use(Search)
   .use(PullRefresh)
export default {
  data(){
    return{
      value: '',
      isLoading: false,
      offerCommends:'',
      itemNum: {},
      pageNum: 1,
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
      this.$http.post("/api/hr/Offers/1/keyword",{ q: this.value }).then(res => {
        let _data = res.data.Content.Table;
        let _DateNow = new Date();
        for(let i = 0; i < _data.length; i++){
          let _DateOld = new Date(_data[i].Create_Date);
          let _time = this.timePicker(_DateNow,_DateOld);
          this.$set(_data[i], 'time', _time)                 //获取相差天数
        }
        this.offerCommends = _data
      })
    },
    toworkDetail(e){
      this.$router.push({name:'workDetail',params: { _id: e }})
    },
    onRefresh(){                          //下拉刷新
      setTimeout(() => {
        this.$toast('最新岗位信息装载完毕');
        this.isLoading = false;
        this.value = '';
        this.$http.post("/api/hr/Offers/OfferRecomment/" + this.pageNum, this.itemNum).then(res => {
          if(!res.data){
            console.log(res.data)
            this.offerCommends = null;
          }
          else{
            let _data = res.data;
            let _DateNow = new Date();
            for(let i = 0; i < _data.length; i++){
              let _DateOld = new Date(_data[i].Create_Date);
              let _time = this.timePicker(_DateNow,_DateOld);
              this.$set(_data[i], 'time', _time)
            }
            console.log(res.data)
            this.offerCommends = _data
          }
        })
      },500)
    },
    timePicker(now,old){           //计算相差天数
      var timeNow = now.getTime();
      var timeOld = old.getTime();
      var seconds = timeNow - timeOld;
      var days = parseInt(seconds / (1000 * 60 * 60 * 24));
      return days
    }
  },
  mounted(){
    this.$http.post("/api/hr/Offers/OfferRecomment/1",this.itemNum).then(res => {
      if(!res.data){
        this.offerCommends = null;
        return
      }
      else{
        let _data = res.data;
        let _DateNow = new Date();
        for(let i = 0; i < _data.length; i++){
          let _DateOld = new Date(_data[i].Create_Date);
          let _time = this.timePicker(_DateNow,_DateOld);
          this.$set(_data[i], 'time', _time)
          this.offerCommends = res.data;
        }
      }
    })
  },
  created(){
    this.menu()
  },
  // watch:{
  //   value:function(){
  //     let _value = this.value
  //     Vue.apiPost("/api/hr/Offers/1/keyword",{ q: _value }).then(res => {
  //       this.offerCommends = res.data.Content.Table
  //     })
  //   }
  // }
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
  margin-top: 65px;
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
  padding-left: 15px;
  padding-right: 15px;
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
</style>
