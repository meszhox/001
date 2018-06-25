<template>
<div>
  <van-nav-bar title="职位详情" left-text="返回" left-arrow @click-left="goback" >
      <i class="iconfont icon-more" slot="right" />
  </van-nav-bar>
  <div class="detail-head">
    <div class="Pagetitle">
      <span class="jobName">操作工</span>
      <span class="salary">[4千-5千]</span>
      <i :class="[isCollect ? 'iconfont icon-shoucangxing2' : 'iconfont icon-shoucangxing', 'collect-icon']" @click="collected"></i>
    </div>
    <div class="requires">
      <div class="requireItems">
        <i class="iconfont icon-xueli itemIcon"></i>&nbsp;<span>不限</span>
      </div>
      <div class="requireItems">
        <i class="iconfont icon-yonghu itemIcon"></i>&nbsp;<span>招聘5人</span>
      </div>
      <div class="requireItems">
        <i class="iconfont icon-shizhong itemIcon"></i>&nbsp;<span>04-21发布</span>
      </div>
    </div>
    <div class="advant-items">
      <span class="testTime">无试用期</span>
      <span class="testTime">包吃</span>
      <span class="testTime">包住</span>
      <span class="testTime">五险一金</span>
      <span class="testTime">带薪年假</span>
    </div>
  </div>
  <div class="workInfo">
    <div class="describeTitle">
      <i class="iconfont icon-xiangmu"></i><span class="zw-ms">职位描述</span>
      <span class="gs-js" @click="tocompanyInfo">公司介绍 > </span>
    </div>
    <div class="respose">
      <p>岗位职责：</p>
      <p>1、专业人员职位，在上级的领导和监督下定期完成量化的工作要求，并能独立处理和解决所负责的任务；</p>
      <p>2、推行公司各类规章制度的实施；</p>
      <p>3、执行人力资源管理各项实务的操作流程和各类规章制度的实施，配合其他业务部门工作；</p>
      <p>4、管理劳动合同，办理用工、退工手续；</p>
      <p>5、负责薪酬福利，项目申报等工作；</p>
      <p>6、负责管理人力资源相关文件和档案。</p>
    </div>
    <div class="need">
      <p>任职资格：</p>
      <p>1、本科以上学历，专业不限；</p>
      <p>2、两年以上人力资源工作经验，有集团公司工作经验优先；</p>
      <p>3、熟悉人力资源管理各项实务的操作流程，熟悉国家各项劳动人事法规政策，并能实际操作运用；</p>
      <p>4、具有良好的职业道德，踏实稳重，工作细心，责任心强，有较强的沟通、协调能力，有团队协作精神；</p>
      <p>5、熟练使用相关办公软件，具备基本的网络知识。</p>
    </div>
  </div>
  <div class="workPlace">
    <div class="describeTitle">
      <i class="iconfont icon-xiangmu"></i><span class="zw-ms">工作地点</span>
    </div>
    <div style="height:90px;width:90%;margin-left:5%;margin-top:50px;background:red">

    </div>
    <div class="attention">
      <i class="iconfont icon-linedesign-11"></i>
      <span>以担保或任何理由索取财物，扣押证照，均涉嫌违法，请提高警惕！</span>
    </div>
    <button class="zw-sq-btn" @click="confirmWork">职位申请</button>
    <van-popup class="make-sure" v-model="showConfirm">
      <p>确定申请以下职位？</p>
      <p class="name-work">操作工</p>
      <button class="not-sure" @click="cancel">取消</button>
      <button class="decision" @click="decision">确认</button>
    </van-popup>
  </div>
</div>
</template>

<script>
import '../../assets/img/collect-star/iconfont.css';
import '../../assets/img/icons-detail/iconfont.css';
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import { NavBar, Popup } from 'vant';
Vue.use(NavBar)
.use(Popup)
export default {
  data(){
    return{
      isCollect: null,
      showConfirm: false
    }
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    },
    collected(){
      this.isCollect = !this.isCollect
    },
    tocompanyInfo(){
      this.$router.push({name:'company-information'})
    },
    confirmWork(){
      this.showConfirm = true
    },
    cancel(){
      this.showConfirm = false
    },
    decision(){
      this.$router.push({name:'succeed'})
      this.showConfirm = false
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
.Pagetitle{
  height: 40px;
  padding-top: 60px;
  width: 90%;
  margin-left: 5%;
  border-bottom: 1px solid #dfdfdf;
}
.detail-head{
  min-height: 215px;
  max-height: 270px;
  background: #ffffff;
  overflow: hidden;
}
.jobName{
  font-weight: 600;
  font-size: 18px;
}
.salary{
  color: darkslategray
}
.collect-icon{
  float: right;
  font-size: 18px;
  color: rgb(233,0,0)
}
.requires{
  height: 70px;
}
.requireItems{
  width: 31%;
  text-align: center;
  float: left;
  margin: 30px auto 10px auto;
}
.requireItems span{
  font-size: 14px;
}
.itemIcon{
  font-size: 20px;
  color: darkslategrey
}
.advant-items{
  width: 90%;
  margin-left: 7%;
}
.testTime{
  display: block;
  margin: auto 5%;
  border: 2px solid darkslategrey;
  width: 20%;
  text-align: center;
  font-size: 14px;
  color: darkslategrey;
  margin-bottom: 20px;
  float: left;
}
.workInfo{
  background: #ffffff;
}
.describeTitle{
  width: 90%;
  margin-left: 5%;
  padding-top: 15px;
  margin-top: 10px;
}
.icon-xiangmu{
  font-size: 25px;
  float: left;
  color: darkslategray
}
.zw-ms{
  display: block;
  float: left;
  height: 25px;
  line-height: 25px;
  margin-left: 6px;
  font-size: 18px;
}
.gs-js{
  display: block;
  float: right;
  font-size: 18px;
  font-weight: 600;
  color: darkslategray
}
.respose{
  padding-top: 50px;
  width: 90%;
  margin-left: 5%;
}
.respose p,.need p{
  margin: 0;
  font-size: 15px;
  color: #666
}
.need{
  margin-top: 20px;
  width: 90%;
  margin-left: 5%
}
.workPlace{
  background: #ffffff
}
.icon-linedesign-11{
  font-size: 45px;
  float: left;
  color: red
}
.attention{
  width: 80%;
  margin-left: 10%;
  margin-top: 25px;
  height: 60px;
  padding-bottom: 70px;
}
.attention span{
  display: block;
  height: 46px;
  line-height: 23px
}
.zw-sq-btn{
  width: 100%;
  height: 50px;
  background: rgb(29, 70, 122);
  color: #ffffff;
  border: none;
  border-radius: 5px;
  position: fixed;
  bottom: 0;
}
.make-sure{
  width: 80%;
  height: 180px;
  text-align: center;
  color: #666;
  border-radius: 6px;
}
.name-work{
  font-size: 23px;
  color: #333
}
.make-sure button{
  width: 40%;
  border: none;
  color: #ffffff;
  height: 37px;
  border-radius: 3px;
  margin: 20px 5px;
}
.not-sure{
  background: #bfbfbf;
}
.decision{
  background: #10b7ca
}
</style>
