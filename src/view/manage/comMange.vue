<template>
  <div>
    <div>
      <van-search v-model="value" show-action @search="searchItem(value)">
        <button slot="action" @click="searchItem(value)">搜索</button>
      </van-search>
    </div>
    <div>
      <div class="screen" @click="chooseTime">
        <span>{{time}}<i class="iconfont icon-sarrowbottom"></i></span>
      </div>
      <div class="screen" @click="choosework">
        <span>{{work}}<i class="iconfont icon-sarrowbottom"></i></span>
      </div>
      <div class="screen" @click="chooseSalary">
        <span>{{salary}}<i class="iconfont icon-sarrowbottom"></i></span>
      </div>
    </div>

    <!-- 筛选下拉菜单（底部弹出层） -->
      <van-popup v-model="showTime" position="bottom" @click-overlay="closeTime">
        <div class="type-box">
           <van-picker show-toolbar :columns="times" @cancel="closeTime" @confirm="confirmTime" />
        </div>
      </van-popup>

      <van-popup v-model="showWork" position="bottom" @click-overlay="closeWork">
        <div>
          <van-picker show-toolbar :columns="works"  @cancel="closeWork" @confirm="confirmWork" />
        </div>
      </van-popup>

      <van-popup v-model="showSalary" position="bottom" @click-overlay="closeSalary">
        <div class="type-box">
          <van-picker show-toolbar :columns="salarys" @cancel="closeSalary" @confirm="confirmSalary" />
        </div>
      </van-popup>
      <div style="margin-top: 55px"></div>
      <div class="message-box" v-for="(record,index) in records" :key="index">
        <van-collapse v-model="activeName">
          <!-- vant 折叠框 -->
          <van-collapse-item :name=record.ID>
            <div slot="title">
              <div class="headImg">
                <img :src="record.wxInfo.headimgurl" alt="">
              </div>
              <div class="basic-info">
                <span>{{record.Name}}</span>&nbsp;&nbsp;
                <span>{{record.Sex}}</span>&nbsp;&nbsp;
                <span>{{record.age}}</span>&nbsp;&nbsp;
                <span>{{record.JobName}}</span>
              </div>
              <div class="workTreat">
                <span>{{record.Phone}}</span>&nbsp;&nbsp;&nbsp;
                <span>{{formatDate(record.Create_Date)}}</span>
              </div>
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
            <button :class="[record.Stage == 5 ? ' not-pass ' : '' ]" @click="toResume(record.ReceiveID)" class="comfireBtn">查看完整简历</button>
          </van-collapse-item>
        </van-collapse>
      </div>
  </div>
</template>

<script>
import '../../assets/css/companymange.css'
import '../../assets/img/icon-bottom-s/iconfont.css'
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import { Search, Popup, Picker, Toast, Collapse, CollapseItem, Step, Steps } from 'vant';
import viewResumeVue from './viewResume.vue';
Vue.use(Search)
.use(Popup)
.use(Picker)
.use(Collapse)
.use(CollapseItem)
.use(Step)
.use(Steps)
export default {
  data(){
    return{
      value: '',
      time: '投递时间',
      work: '职位',
      salary: '薪资',
      showTime: false,
      showWork: false,
      showSalary: false,
      times: ['全部','一周内','一个月内','三个月内','一年内'],
      works: ['111','222'],
      salarys:['全部','2k-4k','4k-6k','6k-9k','10k+'],
      activeName: ['1'],
      records: '',
      wxInfo: '',
    }
  },
  methods:{
    chooseTime(){
      this.showTime = true;
    },
    choosework(){
      this.showWork = true;
    },
    chooseSalary(){
      this.showSalary = true;
    },
    closeTime(){
      this.showTime = false;
    },
    closeWork(){
      this.showWork = false;
    },
    closeSalary(){
      this.showSalary = false;
    },
    confirmTime(){
      this.showTime = false;
    },
    confirmWork(){
      this.showWork = false;
    },
    confirmSalary(){
      this.showSalary = false;
    },
    toResume(e){
      this.$router.push({name: 'viewResume',params:{_ID: e}})
    },
    formatDate(e){          //获取年月日,并修改显示格式
      let _date = new Date(e).toLocaleDateString().split('/');
      let YMD = _date[0] + '-' + _date[1] + '-' + _date[2]
      return YMD;
    },
    timePicker(now,old){                  //计算相差天数
      var timeNow = now.getTime();
      var timeOld = old.getTime();
      var seconds = timeNow - timeOld;
      var years = parseInt(seconds / (1000 * 60 * 60 * 24 * 360));
      return years
    },
  },
  mounted(){
    let Cid = this.$route.params.Cid;
    if (Cid){
      this.$http.post("/api/hr/profilepush/1/r/-1",{
        _Cid: Cid
      }).then(res => {
        if(res.data.Content.Table){
          let wxInfo = new Array();
          let DateNow = new Date();
          let _data = res.data.Content.Table;
          for(let i = 0; i < _data.length; i++){
            let _info = JSON.parse(_data[i].wxUserInfo);
            let _birth = new Date(_data[i].Birth);
            let _age = this.timePicker(DateNow,_birth);
            _data[i].wxInfo = _info;
            _data[i].age = _age;
          }
          this.records = _data
        }
        else{
          Toast("暂无数据！")
        }
      })
    }
  }
}
</script>

<style scoped>
.screen{
  background: #fff;
  width: 33.05%;
  float: left;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  border-right: 1px solid #efefef;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.van-search__action button{
    padding: 0 12px;
    border: none;
    right: 10px;
    margin-right: 8px;
    color: #fff;
    border-radius: 5px;
    margin-left: 10px;
    background: #3385ff
}
.message-box{
  width: 94%;
  margin-left: 3%;

}
.van-collapse-item >>> .van-cell{
  border-radius: 10px;
}
.van-collapse-item >>> .van-collapse-item__content{
  border-radius: 10px
}
.van-collapse{
  margin: 15px auto;
}
.headImg{
  width: 20%;
  height: 60px;
  float: left;
}
.headImg img{
  height: 40px;
  width: 40px;
  display: block;
  margin: auto;
  margin-top: 10px;
}
.basic-info{
  width: 80%;
  height: 25px;
  float: left;
  margin-top: 5px
}
.basic-info span{
  margin-left: 10px;
  font-size: 12px
}
.workTreat{
  width: 80%;
  height: 25px;
}
.workTreat span{
  font-size: 12px;
  margin-left: 10px;
}
.van-collapse-item >>> .van-cell__right-icon{
  margin-top: 22px;
}
.comfireBtn{
  width: 90%;
  margin-left: 5%;
  height: 35px;
  font-size: 14px;
  /* font-weight: 300; */
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background: #3385ff
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
.van-collapse-item >>> .van-collapse-item__content{
  padding: 10px
}
</style>
