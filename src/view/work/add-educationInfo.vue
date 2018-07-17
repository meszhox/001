<template>
<div class="educatePage">
  <!-- 导航栏 -->
  <van-nav-bar title="添加教育经历" left-text="返回" left-arrow @click-left="goback" />
  <div style="margin-top:55px"></div>
  <div>
    <van-cell-group>
      <van-field v-model="eduInfos.school" label="毕业院校" placeholder="没有请填无！"/>
      <van-field v-model="eduInfos.political" label="政治面貌" placeholder="例如：团员"/>
      <van-field v-model="eduInfos.major" label="专业" placeholder="没有请填无！"/>
    </van-cell-group>
  </div>
  <button @click="saved" class="save">保存</button>
</div>
</template>

<script>
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import { NavBar, Cell, Field } from 'vant';
Vue.use(NavBar)
.use(Cell)
.use(Field)
export default {
  data(){
    return{
      eduInfos: {
        school: '',
        political: '',
        major: '',
        postData: ''
      }
    }
  },
  methods:{
    goback(){
      this.$router.replace({name:'resume'})
    },
    saved(){
      let _dataSave = new Object();
      for(let _items in this.postData){
        _dataSave['_' + _items] = this.postData[_items];
      }
      _dataSave._GradSchool = this.eduInfos.school;
      _dataSave._Political = this.eduInfos.political;
      _dataSave._Major = this.eduInfos.major
      this.$http.post("/api/hr/profileuser/1/m",_dataSave)
      this.$router.replace({name:'resume'})
    }
  },
  mounted(){
    let _postdata = new Object()
    this.$http.post("/api/hr/profileuser/1/r",_postdata).then(res => {
      if(res.data.Content){
        let _data = res.data.Content.Table[0];
        this.postData = _data;
        this.eduInfos.school = _data.GradSchool;
        this.eduInfos.political = _data.Political;
        this.eduInfos.major = _data.Major
      }
    })
  }
}
</script>

<style scoped>
.educatePage{
  overflow: hidden;
}
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
.save{
  width: 96%;
  margin-left: 2%;
  height: 46px;
  background: #3385ff;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  position: fixed;
  bottom: 10px;
}
</style>
