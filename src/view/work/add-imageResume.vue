<template>
  <div class="imgResume">
    <!-- 导航栏 -->
    <van-nav-bar title="工作经历" left-text="返回" left-arrow @click-left="goback" />
    <div style="margin-top:55px"></div>
    <div class="upload-img">
      <p>上传图片简历(最多可上传两张)</p>
      <div class="box-a">
        <!-- vant图片上传插件 -->
        <van-uploader :after-read="onRead1">
          <img style="height:80px;max-width:125px" :src="imagePath1" alt="">
        </van-uploader>
        <i @click="deleteImg1" :class="[haveImg1 ? 'iconfont icon-delete' : '' ]"></i>
      </div>
      <div class="box-b">
        <van-uploader :after-read="onRead2" >
          <img style="height:80px;max-width:125px" :src="imagePath2" alt="">
        </van-uploader>
        <i @click="deleteImg2" :class="[haveImg2 ? 'iconfont icon-delete' : '' ]"></i>
      </div>
    </div>
    <button @click="addEx" class="upload">上传文件</button>
  </div>
</template>

<script>
import '../../assets/img/icon-delete/iconfont.css'
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import { NavBar, Uploader, Icon } from 'vant';
Vue.use(NavBar)
.use(Uploader)
.use(Icon)
export default {
  data(){
    return{
      haveImg1:null,
      haveImg2:null,
      imagePath1: require('@/assets/img/add.png'),
      imagePath2: require('@/assets/img/add.png'),
      postPath: [],
      postFileName: [],
      postData: ''
    }
  },
  methods:{
    goback(){
      this.$router.replace({name:'resume'});
    },
    addEx(){                     //上传图片简历
      let _path = JSON.stringify(this.postPath);
      let _name = JSON.stringify(this.postFileName);
      let _allData = new Object();
      for(let _items in this.postData){
        _allData['_' + _items] = this.postData[_items]
      }
      _allData._imagePath = _path;
      _allData._FileName = _name;
      delete _allData._imagePath;
      this.$http.post("/api/hr/profileuser/1/m",_allData)
      this.$router.replace({name:'resume'});
    },
    onRead1(file){                //上传图片简历，获取返回的url
      let form = new FormData();
      form.append('logo',file.file)
      this.$http.post("/api/upload/docs",form).then(res => {
        let _data = res.data.Content;
        this.postPath.push(_data.Path);
        this.postFileName.push(_data.FileName);
      })
      this.imagePath1 = file.content;
      this.haveImg1 = true;
    },
    onRead2(file){
      let form = new FormData();
      form.append('logo',file.file)
      this.$http.post("/api/upload/docs",form).then(res => {
        let _data = res.data.Content;
        this.postPath.push(_data.Path);
        this.postFileName.push(_data.FileName);
      })
      this.imagePath2 = file.content;
      this.haveImg2 = true;
    },
    deleteImg1(){
      this.imagePath1 = require('@/assets/img/add.png');
      this.haveImg1 = null;
    },
    deleteImg2(){
      this.imagePath2 = require('@/assets/img/add.png');
      this.haveImg2 = null;
    }
  },
  mounted(){
    this.$http.post("/api/hr/profileuser/1/r",{}).then(res => {
      if(res.data.Content){
        let _data = res.data.Content.Table[0];
        this.postData = _data;
        let _imagePath = JSON.parse(_data.ImgPath);
        if(_imagePath[0] != null ){
          this.imagePath1 = 'http://gcbus.whyxzz.cn' + _imagePath[0];
          this.haveImg1 = true
        }
        if(_imagePath[1] != null){
          this.imagePath2 = 'http://gcbus.whyxzz.cn' + _imagePath[1];
          this.haveImg2 = true
        }
      }
    })
  }
}
</script>

<style scoped>
.imgResume{
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
.upload-img{
  width: 94%;
  margin-left: 3%;
  background: #ffffff;
  /* height: 150px; */
  border-radius: 8px;
  overflow: hidden;
}
.upload-img p{
  text-align: center;
  padding-top: 10px;
}
.upload{
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
.box-a{
  overflow: hidden;
}
.box-b{
  overflow: hidden;
  margin-top: 20px;
}
.box-a .van-uploader{
  display: block;
  width: 40%;
  margin-left: 30%;
  float: left;
}
.box-b .van-uploader{
  display: block;
  width: 40%;
  margin-left: 30%;
  padding-bottom: 20px;
  float: left;
}
.van-uploader img{
  display: block;
  margin: auto;
}
.icon-delete{
  color: red
}
</style>
