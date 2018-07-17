<template>
  <div>
    <div style="position:fixed;width:100%;top:0">
      <div>
        <!-- <van-search @click="searchItem(value)" placeholder="搜索" v-model="value" /> -->
        <van-search v-model="value" show-action @search="searchItem(value)">
          <div slot="action" @click="searchItem(value)">搜索</div>
        </van-search>
      </div>
      <div class="header">
        <button class="pushTime" @click="chooseTime">{{displayTime}}<i class="iconfont icon-sarrowbottom"></i></button>
        <button class="pushed" disabled="disabled">已推{{hasPushed}}份</button>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" >
      <van-picker
        show-toolbar
        title="选择时间"
        :columns="times"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <div class="com-list">
      <div :style="{height: listHeight + 'px'}" class="list-inside">
        <ul>
          <li v-for="(com,index) in coms" :key="index" @click="active(index,com.ID)" :class="{active: index == moment}" ><p>{{com.ComName}}</p><span>({{com.Count}}份)</span></li>
        </ul>
      </div>
    </div>
    <div class="main-text" :style="{height: textHeight + 'px'}">
      <div class="text-inside">
        <div style="overflow:hidden;width:95%">
          <span class="pl-ts">批量推送</span>
          <button class="push-all">全部推送</button>
        </div>
        <div v-for="(item,index) in pushedItems" :key="index" class="record">
          <div class="head-image">
            <img :src="item.wxinfo.headimgurl" alt="">
          </div>
          <div class="informations">
            <span>{{item.Name}}</span>  <span>{{item.Sex}}</span>   <span>{{item.age}}</span><br>
            <span>{{item.JobName}}</span><br>
            <span>{{item.ComName}}</span> <button @click="pushOne(item.Cid,item.ID)" class="push-one">推送</button><br>
            <span>{{GetBirth(item.Birth)}}</span><br>
            <span>{{item.City}}</span>  <span style="padding-left:30px">{{item.EduLevel}}</span>  <span style="padding-left:30px">{{item.Phone}}</span>
          </div>
        </div>
        <div class="loading-more">
          <button :class=" showBtn ? ' ' : 'none' " @click="loading">加载更多</button>
        </div>
        <van-popup v-model="showLoading" class="loading-pop" :overlay="false">
          <van-loading :class="isdisplay ? ' ' : 'none' " type="spinner" color="black" size="50px" />
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/css/manage.css'
import '../../assets/img/icon-bottom-s/iconfont.css'
import { Search, Picker, Popup, Loading, Dialog, Toast } from 'vant'
import Vue from 'vue'
Vue.use(Search)
.use(Picker)
.use(Popup)
.use(Loading)
.use(Dialog)
.use(Toast)
export default {
  data(){
    return{
      displayTime: '投递时间',
      show: false,
      value: '',
      moment: 0,
      isdisplay: false,
      times:['全部','一周内','一个月内','三个月内','一年内'],
      showLoading: false,
      coms: new Array(),
      allNum: '',
      hasPushed: 0,
      pushedItems: new Array(),
      listHeight: 600,
      textHeight: 600,
      page: 0,
      showBtn: false,
      passTime: null,
      CID: null
    }
  },
  methods:{
    onSearch(){

    },
    active(e,id){
      if(id){
        this.moment = e;
        this.CID = id;
        Vue.apiGet("/api/hr/profile/getprofilecount?Cid=" + id).then(res => {
          this.hasPushed = res.data
        })
        this.$http.post("/api/hr/profile/1/wxProfile/" + this.page,{
          _Cid: id,
          _Create_Date: this.passTime
        }).then(res => {
          let _comPush = new Array();
          this.pushedItems = _comPush;
          if(res.data.Message == 'success'){
            let _data = res.data.Content.Table;
            var DateNow = new Date();
            for(let i = 0; i < _data.length; i++){
              if(_data[i].IsPush == 'N'){
                let _wxinfo = JSON.parse(_data[i].wxUserInfo);
                let _birth = new Date(_data[i].Birth);
                let _age = this.timePicker(DateNow,_birth);
                _data[i].age = _age;
                _data[i].wxinfo = _wxinfo;
                this.pushedItems.push(_data[i]);
              }
            }
            if(this.pushedItems.length >= 8){
            this.showBtn = true
            }
          }
          else{
            this.pushedItems = null
          }
        })
      }
      else{
        this.moment = e;
        this.pushedItems = [];
        this.$http.post("/api/hr/profile/1/wxProfile/-1",{
          _Create_Date: this.passTime
        }).then(res => {
          if(res.data.Message = 'success'){
            let _data = res.data.Content.Table;
            let _pushed = 0;
            var DateNow = new Date();
            for(let i = 0; i < _data.length; i++){
              if(_data[i].IsPush == 'Y'){
                _pushed ++;
              }
              else{
                let _wxinfo = JSON.parse(_data[i].wxUserInfo);
                let _birth = new Date(_data[i].Birth);
                let _age = this.timePicker(DateNow,_birth);
                _data[i].age = _age;
                _data[i].wxinfo = _wxinfo;
                this.pushedItems.push(_data[i]);
              }
            }
            if(this.pushedItems.length >= 8){
              this.showBtn =true
            }
            this.hasPushed = _pushed
          }
          else{
            Toast("当前没有记录！")
          }
        })
      }
    },
    chooseTime(){
      this.show = true
    },
    onConfirm(value, index){
      let _dateNow = new Date();
      let _dayseconds = 86400000;
      let _now = _dateNow.getTime();
      if(index == 0){
        this.displayTime = value;
        this.show = false;
        return
      }
      else if(index == 1){
        let _seconds = _now - _dayseconds * 7;
        let _date = new Date(_seconds);
        let _passweek = _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate();
        this.passTime = _passweek;
      }
      else if(index == 2){
        let _seconds = _now - _dayseconds * 30;
        let _date = new Date(_seconds);
        let _passmonth =  _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate();
        this.passTime = _passmonth;
      }
      else if(index == 3){
        let _seconds = _now - _dayseconds * 90;
        let _date = new Date(_seconds);
        let _passthree =  _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate();
        this.passTime = _passthree;
      }
      else if(index == 4){
        let _seconds = _now - _dayseconds * 365;
        let _date = new Date(_seconds);
        let _passyear =  _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate();
        this.passTime = _passyear;
      }
      this.$http.post("/api/hr/profile/1/wxProfile/" + this.page,{
        _Cid: this.CID,
        _Create_Date: this.passTime
      }).then(res => {
        this.pushedItems = [];
        if(res.data.Message = 'success'){
        let _data = res.data.Content.Table;
        let _pushed = 0;
        var DateNow = new Date();
        for(let i = 0; i < _data.length; i++){
          if(_data[i].IsPush == 'Y'){
            _pushed ++;
          }
          else{
            let _wxinfo = JSON.parse(_data[i].wxUserInfo);
            let _birth = new Date(_data[i].Birth);
            let _age = this.timePicker(DateNow,_birth);
            _data[i].age = _age;
            _data[i].wxinfo = _wxinfo;
            this.pushedItems.push(_data[i]);
          }
        }
        if(this.pushedItems.length >= 8){
          this.showBtn =true
        }
        this.hasPushed = _pushed
      }
      else{
        Toast("当前没有记录！")
      }
      })
      this.displayTime = value;
      this.show = false
    },
    onCancel() {

    },
    loading(){
      this.showLoading = true
      this.isdisplay = true
      setTimeout(() => {
        this.isdisplay = false;
        this.showLoading = false
      },1000)
    },
    timePicker(now,old){                  //计算相差天数
      var timeNow = now.getTime();
      var timeOld = old.getTime();
      var seconds = timeNow - timeOld;
      var years = parseInt(seconds / (1000 * 60 * 60 * 24 * 360));
      return years
    },
    GetBirth(e){
      let _birthDay = new Date(e).toLocaleDateString().split('/');
      let _year = _birthDay[0];
      let _month = _birthDay[1];
      let _day = _birthDay[2];
      return _year + '-' + _month + '-' + _day
    },
    pushOne(cid,id){
      var receives = new Array();
      receives.push({Cid: cid, ReceiveID: id})
      Dialog.confirm({
        title: '确定推送改简历？',
      }).then(() => {
        // on confirm
        this.$http.post("/api/hr/profilepush/1/c",{receives}).then(res => {
          Toast("推送成功！")
          location.reload()
        })
      }).catch(() => {
        // on cancel
      });
    },
    searchItem(e){
      if(e){
        var searchCom = new Array();
        for(let i = 0; i < this.coms.length; i++){
          if(this.coms[i].ComName.indexOf(e) > -1){
            searchCom.push({ComName:this.coms[i].ComName,Count:this.coms[i].Count,ID:this.coms[i].ID});
          }
        }
        if(searchCom.length > 0){
          this.coms = searchCom;
          let _index = this.moment;
          let _id = this.coms[_index].ID;
          this.active(_index,_id)
        }
        else{
          Toast("无匹配项！");
          return
        }
      }
      else{
        Vue.apiGet("/api/hr/Offers/mobilefirstcount").then(res => {
        res.data.unshift({ComName:'全部',Count:this.allNum})
        this.coms = res.data;
        let _index = this.moment;
        let _id = res.data[_index].ID;
        this.active(_index,_id)
    })
      }
    }
  },
  mounted(){
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.listHeight = h - 83;
    this.textHeight = h - 83;
    Vue.apiGet("/api/hr/Offers/mobileallcount").then(res => {
      this.allNum = res.data
    })
    Vue.apiGet("/api/hr/Offers/mobilefirstcount").then(res => {
      res.data.unshift({ComName:'全部',Count:this.allNum})
      this.coms = res.data
    })
    this.$http.post("/api/hr/profile/1/wxProfile/-1",{}).then(res => {
      if(res.data.Message = 'success'){
        let _data = res.data.Content.Table;
        let _pushed = 0;
        var DateNow = new Date();
        for(let i = 0; i < _data.length; i++){
          if(_data[i].IsPush == 'Y'){
            _pushed ++;
          }
          else{
            let _wxinfo = JSON.parse(_data[i].wxUserInfo);
            let _birth = new Date(_data[i].Birth);
            let _age = this.timePicker(DateNow,_birth);
            _data[i].age = _age;
            _data[i].wxinfo = _wxinfo;
            this.pushedItems.push(_data[i]);
          }
        }
        if(this.pushedItems.length >= 8){
          this.showBtn =true
        }
        this.hasPushed = _pushed
      }
      else{
        Toast("当前没有记录！")
      }
    })
  }
}
</script>

<style>
.header button{
  width: 50%;
  height: 40px;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  float: left;
  background: #ffffff;
  font-size: 12px;
}
.pushTime{
  color: #555;
  border-left: none;
  border-right: none;
}
.pushed{
  color: darkcyan;
  border-right: none;
  border-left: 1px solid #dfdfdf
}
.com-list{
  width: 25%;
  position: fixed;
  margin-top: 83px;
  background: #ffffff;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto
}
.com-list li{
  text-align: center;
  padding: 10px;
  font-size: 12px;
}
.com-list li p{
  margin: 0;
}
.active{
  border-left: 2px solid;
  color: #3385ff;
}
.main-text{
  width: 75%;
  top: 83px;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
}
.pl-ts{
  display: block;
  float: left;
  margin: 8px;
  font-size: 14px;
}
.push-all{
  float: right;
  margin: 8px;
  font-size: 14px;
  padding: 2px 5px 2px 5px;
  border: none;
  background: #3385ff;
  color: #ffffff;
  border-radius: 3px;
}
.record{
  width: 90%;
  height: 120px;
  margin-left: 5%;
  background: #ffffff;
  border-radius: 8px;
  margin-top: 10px;
}
.record span{
  font-size: 10px;
}
.head-image{
  width: 25%;
  height: 90px;
  float: left;
}
.head-image img{
  width: 45px;
  height: 45px;
  display: block;
  margin: auto;
  margin-top: 25px;
  border-radius: 100%
}
.informations{
  padding-top: 10px;
}
.informations span{
  padding-left: 10px;
}
.push-one{
  margin: 0;
  float: right;
  margin-top: -8px;
  margin-right: 10px;
  border: none;
  background: #3385ff;
  color: #ffffff;
  border-radius: 2px;
  font-size: 13px;
}
.loading-more{
  text-align: center;
  margin-top: 15px;
}
.loading-more button{
  height: 38px;
  width: 90%;
  border: none;
  border-radius: 5px;
  background: #3385ff;
  color: #ffffff;
  font-size: 15px
}
.none{
  display: none
}
.loading-pop{
  width: 70px;
  height: 70px;
}
 .van-loading--black .van-loading__spinner--spinner{
  top: 10px;
  left: 10px;
}
</style>
