<template>
  <div>
    <van-nav-bar title="职位收藏" left-text="返回" left-arrow @click-left="goback" >
    </van-nav-bar>
    <div style="margin-top:55px"></div>
    <div class="collect-item" @click="toworkDetail(collectItem.Offer_ID,collectItem.ID)" v-for="(collectItem,index) in collectItems" :key="index" >
        <div class="jobDescribe">
          <span style="font-size:16px">{{collectItem.JobName}}</span>
          <span style="font-size:12px;color: #9b9b9b">{{collectItem.City}} | {{collectItem.YearMin}}-{{collectItem.YearMax}}年工作经验 | {{collectItem.EduLevel}}</span>
          <span style="font-size:12px;color: #9b9b9b">{{collectItem.ComName}}</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:17px">{{collectItem.SalaryMin}}K-{{collectItem.SalaryMax}}K/月</span><br>
          <span style="font-size:12px;color: #9b9b9b">{{collectItem.time}}天前</span>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import 'vant/lib/vant-css/index.css';
import {
  NavBar
} from 'vant';
Vue.use(NavBar);

export default {
  data(){
    return{
      collectItems:[]
    }
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    },
    toworkDetail(id,e){
      this.$router.push({name:'workDetail',params:{_id: id, deleteid: e}})
    },
    timePicker(now,old){                        //计算相差天数
      var timeNow = now.getTime();
      var timeOld = old.getTime();
      var seconds = timeNow - timeOld;
      var days = parseInt(seconds / (1000 * 60 * 60 * 24));
      return days
    }
  },
  mounted(){
    Vue.apiPost("/api/hr/profilecollect/1/r", { "": "" }).then(res => {
      console.log(res.data);
      let _data = res.data.Content.Table
      let _DateNow = new Date();
      for(let i =0; i < _data.length; i++){                         //获取相差天数
        let _DateOld = new Date(_data[i].Create_Date);
        let _time = this.timePicker(_DateNow,_DateOld);
        this.$set(_data[i],'time',_time)
      }
      this.collectItems = _data;
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
.van-nav-bar >>> .van-nav-bar__arrow::before,.van-nav-bar >>> .van-nav-bar__text{
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
