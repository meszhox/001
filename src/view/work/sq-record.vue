<template>
  <div>
    <van-nav-bar title="申请记录" left-text="返回" left-arrow  @click-left="goback">
    </van-nav-bar>
    <div style="padding-top:55px"></div>
    <!-- 通过返回的Extend值判断是否隐藏 -->
    <div :class="[record.Extend === '-1' ? 'hide-item' : '']" v-for="(record,index) in records" :key="index">
      <van-collapse v-model="activeName">
        <!-- vant 折叠框 -->
        <van-collapse-item :name=record.ID>
          <div slot="title">
            <div class="workName">
              <span style="font-size:16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{record.JobName}}</span>
              <span style="font-size:15px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{record.ComName}}</span>
            </div>
            <div class="workTreat">
              <span style="font-size:16px;font-weight:600">{{formatDate(record.Create_Date)}}</span>
              <span style="font-size:15px">{{record.SalaryMin}}千-{{record.SalaryMax}}千/月</span>
            </div>
            <i class="iconfont icon-delete" @click.stop="deleteRecord(record.ID)"></i>
          </div>
          <div :class="[record.Stage == 5 ? ' not-pass ' : '' ]">
            <van-steps :active="record.Stage - 1">
              <van-step>提交成功</van-step>
              <van-step>初试</van-step>
              <van-step>复试</van-step>
              <van-step>入职</van-step>
            </van-steps>
          </div>
          <div :class="[record.Stage == 5 ? ' show-message ' : ' not-pass ' ]">
            <p>不合适(简历未通过)</p>
          </div>
          <button :class="[record.Stage == 5 ? ' not-pass ' : '' ]" @click="toResume(record.ID)" class="comfireBtn">完善简历，并确认面试</button>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import querystring from 'querystring'
import '../../assets/img/icon-delete/iconfont.css'
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import {
  Collapse,
  CollapseItem,
  Step,
  Steps,
  Icon,
NavBar,
Toast,
Dialog
  } from 'vant';
Vue.use(Collapse)
   .use(Step)
   .use(Steps)
   .use(Icon)
   .use(NavBar)
   .use(Toast)
   .use(Dialog)
   .use(CollapseItem);
export default {
  data() {
    return {
      color: "#111",
      activeName: ['1'],
      isDisplay: false,
      records: [],
      itemNum:{},
      recordsDate:[],
      recordDate:''
    };
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    },
    deleteRecord(e){
      Dialog.confirm({             //点击删除图标弹出对话框
        title: '确定删除记录？',
        // message: '确定删除记录？'
      }).then(() => {
        // on confirm
        Vue.apiGet("/api/hr/Offers/hideprofilerecord?id=" + e).then(res => {
        if(res.data == '隐藏成功'){
          Toast("删除成功!");
          location.reload()
        }
        else{
          Toast("删除失败！");
          location.reload()
        }
      })
      }).catch(() => {
        // on cancel
      });
    },
    toResume(e){
      this.$router.push({name:'resume',params:{_id: e}})
    },
    formatDate(e){          //获取年月日,并修改显示格式
      let _date = new Date(e).toLocaleDateString().split('/');
      let YMD = _date[0] + '-' + _date[1] + '-' + _date[2]
      return YMD;
    },
  },
  mounted(){
    this.$http.post("/api/hr/profile/1/r/-1",
      this.itemNum
    ).then(res => {
      console.log(res.data);
      let _data = res.data.Content.Table;
      this.records = _data
      if( _data == null ){
        Toast('当前无申请记录')
      }
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
.display{
  display: none;
}
.van-collapse{
  margin: 10px auto;
}
.workName{
  width: 40%;
  height: 45px;
  float: left;
}
.workName span{
  display: block;
  margin-left: 10px;
  line-height: 25px;
}
.workTreat{
  width: 52%;
  height: 45px;
  float: right
}
.workTreat span{
  display: block;
  line-height: 25px;
  text-align: center
}
.van-collapse-item >>> .van-cell__right-icon{
  margin-top: 22px;
}
.comfireBtn{
  width: 100%;
  height: 45px;
  font-size: 16px;
  font-weight: 300;
  border: none;
  border-radius: 3px;
  color: #ffffff;
  background: #234
}
.icon-delete:before{
  position: absolute;
  float: right;
  right: 10px;
  top: 2px;
  color: red;
  font-size: 18px;
}
.not-pass{
  display: none
}
.show-message{
  text-align: center;
  color: #f74a5f;
  font-size: 16px;
}
.show-message p{
  margin: 0;
  height: 20px;
  line-height: 20px;
}
.hide-item{
  display: none
}
</style>
