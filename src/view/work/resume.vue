<template>
<div>
  <van-nav-bar title="我的简历" left-text="返回" left-arrow @click-left="goback" >
      <i class="iconfont icon-more" slot="right" />
  </van-nav-bar>
  <div class="headImg">
    <img src="../../assets/img/headImg.jpg" alt="">
  </div>
  <div class="basicInfo">
    <p>基本信息</p>
    <van-cell-group>
      <van-cell title="姓名" value="内容" />
      <van-cell title="性别" value="内容" />
      <van-cell title="年龄" value="内容" />
      <van-cell title="手机号码" value="内容" />
      <van-cell title="婚姻" value="内容" />
      <van-cell title="生育" value="内容" />
      <van-cell title="籍贯" value="内容" />
      <van-cell title="最高学历" value="内容" />
      <van-cell title="住址" value="内容" />
      <van-cell title="薪资" value="内容" />
    </van-cell-group>
  </div>
  <div class="add-button">
    <van-cell-group>
      <van-cell title="喻信中智" value="2017年8月-2018年8月" />
    </van-cell-group>
    <button>
      <span><i class="iconfont icon-add"></i>添加工作经验</span>
    </button>
  </div>

  <div class="add-button">
    <button>
      <span><i class="iconfont icon-add"></i>添加附件简历</span>
    </button>
  </div>
  <button class="saveInfo">保存</button>
</div>
</template>

<script>
import '../../assets/img/icon-add2/iconfont.css'
import 'vant/lib/vant-css/index.css';
import '../../assets/img/icon-more/iconfont.css'
import Vue from 'vue'
import { NavBar, Cell, CellGroup } from 'vant'
Vue.use(NavBar)
.use(Cell)
.use(CellGroup)
export default {
  data(){
    return{

    }
  },
  methods:{
    goback(){
      this.$router.go(-1)
    }
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
.headImg{
  padding-top: 60px;
  background: #ffffff;
  height: 80px;
}
.headImg img{
  width: 60px;
  height: 60px;
  display: block;
  margin: auto;
  border-radius: 100%;;
  /* margin-bottom: 20px; */
}
.basicInfo{
  background: #ffffff
}
.basicInfo p{
  margin: 20px 0;
  padding: 10px 10px 8px;
  border-bottom: 1px solid #cfcfcf;
  font-size: 16px;
}
.van-cell{
  border-bottom: 1px solid #dfdfdf
}
.add-button{
  margin-top: 20px;
}
.add-button button{
  width: 100%;
  height: 50px;
  background: #ffffff;
  border: none;
  color: #10b7ca;
}
.saveInfo{
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: #10b7ca;
  color: #ffffff;
  margin-top: 20px;
}
</style>
