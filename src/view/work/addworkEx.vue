<template>
<div class="add-work">
  <van-nav-bar title="添加工作经历" left-text="返回" left-arrow @click-left="goback" />
  <div style="margin-top:55px"></div>
  <div>
    <van-cell-group>
      <van-field v-model="workCom.ComName" label="公司名称" placeholder="输入公司名称"/>
      <van-field v-model="starTime" label="开始时间" placeholder="请选择开始时间" disabled>
        <van-button slot="button" size="small" @click="chooseStart" type="primary">开始日期</van-button>
      </van-field>
      <van-field v-model="endTime" label="结束时间" placeholder="请选择结束时间" disabled>
        <van-button slot="button" size="small" @click="chooseEnd" type="primary">结束日期</van-button>
      </van-field>
      <van-field v-model="workCom.Trade" label="所在行业" placeholder="输入所在行业"/>
      <van-field v-model="workCom.ComPosition" label="所任职位" placeholder="输入所任职位"/>
      <van-field v-model="workCom.LastSalaryMin" label="最低薪水" placeholder="输入最低薪水"/>
      <van-field v-model="workCom.LastSalaryMax" label="最高薪水" placeholder="输入最高薪水"/>
    </van-cell-group>
    <!-- 弹出时间选择器  -->
    <van-popup v-model="showTimePicker1" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="cancelStart"
        @confirm="confirmStart"
      />
    </van-popup>
    <van-popup v-model="showTimePicker2" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="cancelEnd"
        @confirm="confirmEnd"
      />
    </van-popup>
    <div class="describe">
      <p>工作描述:</p>
      <textarea v-model="workCom.WorkDescription" name="workDescribe" placeholder="添加描述信息..."></textarea>
    </div>
  </div>
  <button @click="saved" class="save">保存</button>
</div>
</template>

<script>
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import { NavBar, Cell, Field, CellGroup, DatetimePicker, Popup, Button} from 'vant';
Vue.use(NavBar)
.use(Cell)
.use(CellGroup)
.use(Field)
.use(DatetimePicker)
.use(Popup)
.use(Button)
export default {
  data(){
    return{
      workCom: {
        ComName: '',
        Trade: '',
        ComPosition: '',
        LastSalaryMin: '',
        LastSalaryMax: '',
        WorkDescription: '',
      },
      starTime: '',
      endTime: '',
      showTimePicker1: false,
      showTimePicker2: false,
      minDate: new Date(1960,1,1),
      currentDate: new Date(),
    }
  },
  methods:{
    goback(){
      this.$router.replace({name:'resume'})
    },
    saved(){      //保存并上传工作经历
      this.$http.post("/api/hr/WorkerExper/1/c",{
        _ComName: this.workCom.ComName,
        _ComPosition:this.workCom.ComPosition,
        _EndTime:this.endTime,
        _LastSalaryMax:this.workCom.LastSalaryMax,
        _LastSalaryMin:this.workCom.LastSalaryMin,
        _StarTime:this.starTime,
        _Trade:this.workCom.Trade,
        _WorkDescription:this.workCom.WorkDescription
      })
      this.$router.replace({name:'add-workex'})
    },
    confirmStart(currentDate){
      // 获取年月日
      this.starTime = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
      this.showTimePicker1 = false
    },
    cancelStart(){
      this.showTimePicker1 = false
    },
    chooseStart(){
      this.showTimePicker1 = true
    },
    confirmEnd(currentDate){
      this.endTime = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
      this.showTimePicker2 = false
    },
    chooseEnd(){
      this.showTimePicker2 = true
    },
    cancelEnd(){
      this.showTimePicker2 = false
    }
  },
  mounted(){
    let _id = this.$route.params._comID;
    if(_id == null){    //判断是否有公司ID值传入，有则显示信息，没有则调用添加工作经验接口
      return
    }
    else{
      this.$http.post("/api/hr/WorkerExper/1/r/-1",{_id}).then(res => {
        if(res.data.Content){
          let _data = res.data.Content.Table[0];
          this.workCom = _data;
          let _StarDate = new Date(_data.StarTime).toLocaleDateString().split('/');
          this.starTime = _StarDate[0] + '-' + _StarDate[1] + '-' + _StarDate[2];
          let _EndDate = new Date(_data.EndTime).toLocaleDateString().split('/');
          this.endTime = _EndDate[0] + '-' + _EndDate[1] + '-' + _EndDate[2];
          }
      })
    }
  }
}
</script>

<style scoped>
.add-work{
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
.describe p{
  margin: 10px 0 5px 4%;
  font-size: 14px;
  color: #333
}
.describe textarea{
  width: 92%;
  margin-left: 4%;
  min-height: 120px;
  border: none;
  border-radius: 3px;
}
.van-button, .van-button--primary{
  background: #ffffff;
  border: 1px solid #afafaf;
  color: #666;
  border-radius: 3px;
}
.van-field >>> .van-field__control:disabled{
  color: #222
}
</style>
