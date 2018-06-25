<template>
  <div>
    <van-nav-bar title="申请记录" left-text="返回" left-arrow  @click-left="goback">
      <van-icon  class="iconfont icon-more" slot="right" />
    </van-nav-bar>
    <div style="padding-top:55px"></div>
    <div>
      <van-collapse :class="[isDisplay ? 'display' : '','' ]" v-model="activeNames">
        <van-collapse-item name="1">
          <div slot="title">
            <div class="workName">
              <span style="font-size:16px">产线操作工</span>
              <span style="font-size:15px">赫天广电</span>
            </div>
            <div class="workTreat">
              <span style="font-size:16px;font-weight:600">2018-09-11 12:23</span>
              <span style="font-size:15px">4千-6千/月</span>
            </div>
            <i class="iconfont icon-delete" @click="deleteRecord"></i>
          </div>
          <van-steps :active="active1">
            <van-step>提交成功</van-step>
            <van-step>初试</van-step>
            <van-step>复试</van-step>
            <van-step>入职</van-step>
          </van-steps>
          <button @click="toResume" class="comfireBtn">完善简历，并确认面试</button>
        </van-collapse-item>
      </van-collapse>
    </div>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="2">
        <div slot="title">
          <div class="workName">
            <span style="font-size:16px">产线操作工</span>
            <span style="font-size:15px">赫天广电</span>
          </div>
          <div class="workTreat">
            <span style="font-size:16px;font-weight:600">2018-09-11 12:23</span>
            <span style="font-size:15px">4千-6千/月</span>
          </div>
          <i class="iconfont icon-delete"></i>
        </div>
        <van-steps :active="active2">
          <van-step>提交成功</van-step>
          <van-step>初试</van-step>
          <van-step>复试</van-step>
          <van-step>入职</van-step>
        </van-steps>
        <button @click="toResume" class="comfireBtn">完善简历，并确认面试</button>
      </van-collapse-item>
    </van-collapse>

    <van-collapse v-model="activeNames">
      <van-collapse-item name="3">
        <div slot="title">
          <div class="workName">
            <span style="font-size:16px">产线操作工</span>
            <span style="font-size:15px">赫天广电</span>
          </div>
          <div class="workTreat">
            <span style="font-size:16px;font-weight:600">2018-09-11 12:23</span>
            <span style="font-size:15px">4千-6千/月</span>
          </div>
          <i class="iconfont icon-delete"></i>
        </div>
        <van-steps :active="active3" :active-color="color">
          <van-step>提交成功</van-step>
          <van-step>初试</van-step>
          <van-step>复试</van-step>
          <van-step>入职</van-step>
        </van-steps>
        <button class="comfireBtn" @click="toResume">完善简历，并确认面试</button>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import '../../assets/img/icon-more/iconfont.css'
import '../../assets/img/icon-delete/iconfont.css'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import {
  Collapse,
  CollapseItem,
  Step,
  Steps,
  Icon,
NavBar
  } from 'vant';
Vue.use(Collapse)
   .use(Step)
   .use(Steps)
   .use(Icon)
   .use(NavBar)
   .use(CollapseItem);
export default {
  data() {
    return {
      activeNames: ['0'],
      color: "#111",
      active1: 0,
      active2: 1,
      active3: 2,
      isDisplay: false,
    };
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    },
    deleteRecord(){
      this.isDisplay = !this.isDisplay
    },
    toResume(){
      this.$router.push({name:'resume'})
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
.van-nav-bar >>> .van-nav-bar__arrow::before,.van-nav-bar >>> .van-nav-bar__text,.icon-more::before{
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
</style>
