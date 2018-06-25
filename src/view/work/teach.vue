<template>
<div class="teach">
  <van-nav-bar title="求职攻略" left-text="返回" left-arrow @click-left="goback" >
      <i class="iconfont icon-more" slot="right" />
  </van-nav-bar>
  <h2 style="padding-top:40px;margin-left:5%">网上求职怎样防骗</h2>
  <div class="auther">
    <img src="../../assets/img/gcbusLogo.png" alt="">
    <span>工厂巴士</span><br>
    <span>04-03</span>
  </div>
  <div class="text">
    <p style="margin-top:40px">
      对于刚入社会的求职者，和想在网上找工作的务工人员，小编在这里分享一些网上求职防骗技巧！
    </p>
    <p>
      任何招聘单位，以任何名义向求职者收取抵押金、服装费、产品押金、风险金、报名费、培训费等行为，都属非法行为
      不给钱，不给有效证件，捂紧钱包就是硬道理！
    </p>
    <p>
      但是要学会委婉的拒绝保护自己和自己的财物不受损失。
    </p>
    <p>此处举例:</p>
    <p>1：我今天出门没带那么多钱</p>
    <p>2：可不可以先给你写个欠条（当然是假的啦!）</p>
    <p>3：证件没有带出来（对于没钱就要扣证件然后让你拿钱来赎回的黑心骗子）</p>
    <p>4：能不能先从工资里面扣呢</p>
  </div>
  <img class="teachImg" src="../../assets/img/1.png" alt="">
  <div class="text">
    <p>
      要到正规的招聘网站注册投递简历，或者到有规模的招聘会现场求职。不要轻易相信手机短信、微博、社区网站的招聘信息，一定核实清楚再去求职。
    </p>
  </div>
  <img class="teachImg" src="../../assets/img/2.png" alt="">
  <div class="text">
    <p>
      不要将自己的身份证、学位证、毕业证等证件作抵押。有的单位以保证学生实习时间等为由扣住学生证件，根据相关规定，单位都不能扣押证件。
    </p>
  </div>
  <img class="teachImg" src="../../assets/img/3.png" alt="">
  <div class="text">
    <p>
      求职者不要被诱人的薪资待遇所迷惑，远高于行业平均薪资水平的招聘本身就存在陷阱。在正式进入单位之前，要想方设法加强对企业的了解，比如注意招聘单位的营业执照等相关证件，正规单位招聘一般会将招聘地点设在单位的办公室、会议室，一些以租用房间作为应聘地点的单位，要警惕。
    </p>
  </div>
  <img class="teachImg" src="../../assets/img/4.png" alt="">
  <div class="text">
    <p>
      求职者不要被诱人的薪资待遇所迷惑，远高于行业平均薪资水平的招聘本身就存在陷阱。在正式进入单位之前，要想方设法加强对企业的了解，比如注意招聘单位的营业执照等相关证件，正规单位招聘一般会将招聘地点设在单位的办公室、会议室，一些以租用房间作为应聘地点的单位，要警惕。
    </p>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import 'vant/lib/vant-css/index.css';
import '../../assets/img/icon-more/iconfont.css';
import {
  NavBar
} from 'vant';
Vue.use(NavBar);
export default {
  data(){
    return{

    }
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    }
  },
  created(){
    this.menu()
  }
}
</script>

<style scoped>
.teach{
  background: #ffffff;
}
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
.auther{
  height: 20px;
  margin-left: 5%
}
.auther img{
  width: 42px;
  display: block;
  float: left;
}
.auther span{
  display: block;
  float: left;
  margin-left: 10px;
  font-size: 12px;
  color: #555
}
.text{
  width: 90%;
  margin-left: 5%
}
.text p{
  margin: 0 auto;
  line-height: 26px
}
.teachImg{
  width: 88%;
  margin-left: 6%;
}
</style>
