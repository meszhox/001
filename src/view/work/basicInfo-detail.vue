<template>
  <div>
    <van-nav-bar title="基本信息" left-text="返回" left-arrow @click-left="goback" >
    </van-nav-bar>
    <div style="margin-top:47px"></div>
    <div>
      <van-cell-group>
        <!-- vant组件单元格 -->
      <van-field v-model="user.Name" label="姓名:" required placeholder="请输入姓名"/>
      <!-- <van-cell  title="性别:">
        <select name="sex" id="">
          <option value="0">请选择</option>
          <option value="1">男</option>
          <option value="2">女</option>
        </select>
      </van-cell> -->
      <van-field v-model="user.Sex" label="性别:" required placeholder="请选择性别" disabled>
        <van-button slot="button" size="small" @click="openSex" type="primary">选择性别</van-button>
      </van-field>
      <van-field v-model="user.Birth" label="出生日期:" required placeholder="请选择出生日期" disabled>
        <van-button slot="button" size="small" @click="openDate" type="primary">选择日期</van-button>
      </van-field>
      <van-field v-model="user.Phone" label="手机号码:" required placeholder="请输入手机号码"/>
      <van-field v-model="user.IDCardNum" label="身份证号码:" required placeholder="请输入身份证号码"/>
      <van-field v-model="user.Marriage" label="婚姻:" placeholder="请选择婚姻状况" disabled>
        <van-button slot="button" size="small" @click="openMarriage" type="primary">选择婚姻</van-button>
      </van-field>
      <van-field v-model="user.Children" label="生育:" placeholder="请选择生育状况" disabled>
        <van-button slot="button" size="small" @click="openBaby" type="primary">生育状况</van-button>
      </van-field>
      <van-field v-model="user.Homeland" label="籍贯:" placeholder="选择籍贯" disabled>
        <van-button slot="button" size="small" @click="openLocate" type="primary">选择籍贯</van-button>
      </van-field>
      <van-field v-model="user.EduLevel" label="最高学历:" placeholder="请选择最高学历" disabled>
        <van-button slot="button" size="small" @click="openEdu" type="primary">选择学历</van-button>
      </van-field>
      <van-field v-model="user.Addr" label="住址:" placeholder="请输入现住址"/>
      <van-field v-model="user.salary" label="期望薪资:" placeholder="请选择期望薪资" disabled>
        <van-button slot="button" size="small" @click="openSalary" type="primary">选择薪资</van-button>
      </van-field>
      <van-field v-model="user.EmergencyContact" label="紧急联系人:" placeholder="请输入紧急联系人"/>
      <van-field v-model="user.EmergencyRelation" label="联系人关系:" placeholder="紧急联系人关系（如父子）"/>
      <van-field v-model="user.EmergencyPhone" label="联系人电话:" placeholder="紧急联系人电话"/>
    </van-cell-group>
    <button @click="savedBasicInfo()" class="save-basicInfo">保存</button>

    <van-popup v-model="showSex" position="bottom" @click-overlay="close">
        <div class="sex-box">
          <!-- vant组件picker选择器 -->
           <van-picker show-toolbar :columns="chooseSex" @cancel="close" @confirm="confirmSex"/>
        </div>
    </van-popup>
    <van-popup v-model="showTimePicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancelDate"
        @confirm="confirmDate"
      />
    </van-popup>
    <van-popup v-model="showMarriage"  position="bottom">
      <div class="marriage-box">
        <van-picker show-toolbar :columns="marriaged" @cancel="closeMarriage" @confirm="confirmMarriage"/>
      </div>
    </van-popup>
    <van-popup v-model="showBaby"  position="bottom">
      <div class="marriage-box">
        <van-picker show-toolbar :columns="babys" @cancel="closeBaby" @confirm="confirmBaby"/>
      </div>
    </van-popup>
    <van-popup v-model="showLocate"  position="bottom">
      <div class="marriage-box">
        <van-area :area-list="areaList" :columns-num="2" @cancel="closeLocate" @confirm="confirmLocate" />
      </div>
    </van-popup>
    <van-popup v-model="showEdu"  position="bottom">
      <div class="marriage-box">
        <van-picker show-toolbar :columns="educations" @cancel="closeEdu" @confirm="confirmEdu"/>
      </div>
    </van-popup>
    <van-popup v-model="showSalary"  position="bottom">
      <div class="marriage-box">
        <van-picker show-toolbar :columns="salarys" @cancel="closeSalary" @confirm="confirmSalary"/>
      </div>
    </van-popup>
    </div>
  </div>
</template>

<script>
import {AreaList} from '@/router/area.js'
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import { NavBar, Cell, Field, CellGroup, Popup, Button, Picker, DatetimePicker, Area } from 'vant';
Vue.use(NavBar)
.use(Cell)
.use(Field)
.use(CellGroup)
.use(Popup)
.use(Button)
.use(Picker)
.use(DatetimePicker)
.use(Area)
export default {
  data(){
    return{
      user:{
        Name: "",
        Sex: "",
        Phone: "",
        Marriage: "",
        Children: "",
        Homeland: "",
        EduLevel: "",
        Addr: "",
        salary: "",
        Birth: "",
        IDCardNum: "",
        EmergencyContact: "",
        EmergencyRelation: "",
        EmergencyPhone: ""
      },
      showSex: false,
      chooseSex: ['男','女'],
      minDate: new Date(1960,1,1),
      maxDate: new Date(2018,1,1),
      currentDate: new Date(),
      showTimePicker: false,
      showMarriage: false,
      marriaged: ['未婚','已婚','离异','丧偶'],
      babys: [0,1,2,3,4],
      showBaby: false,
      areaList: AreaList,
      showLocate: false,
      showEdu: false,
      educations: ['高中','大专','本科','研究生','博士'],
      salarys: ['1k-2k','2k-4k','4k-6k','6k-10k','10k-15k','15k-20k','20k+'],
      showSalary: false,
      userData: {},
    }
  },
  methods:{
    goback(){
      this.$router.replace({name:'resume'})
    },
    openSex(){
      this.showSex = true
    },
    close(){
      this.showSex = false
    },
    confirmSex(value,index){
      this.user.Sex = value;
      console.log(value)
      this.showSex = false
    },
    openDate(){
      this.showTimePicker = true;
    },
    confirmDate(currentDate){
      this.user.Birth = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
      this.showTimePicker = false
    },
    cancelDate(){
      this.showTimePicker = false
    },
    openMarriage(){
      this.showMarriage = true
    },
    confirmMarriage(value,index){
      this.user.Marriage = value;
      this.showMarriage = false
    },
    closeMarriage(){
      this.showMarriage = false
    },
    openBaby(){
      this.showBaby = true
    },
    confirmBaby(value,index){
      this.user.Children = value;
      this.showBaby = false;
    },
    closeBaby(){
      this.showBaby = false
    },
    openLocate(){
      this.showLocate = true
    },
    confirmLocate(columnsNum){                  //选择地址
      this.user.Homeland = columnsNum[0].name + " " + columnsNum[1].name;    //获取地名
      this.showLocate  = false
    },
    closeLocate(){
      this.showLocate = false
    },
    openEdu(){
      this.showEdu = true;
    },
    confirmEdu(value,index){
      this.user.EduLevel = value;
      this.showEdu = false
    },
    closeEdu(){
      this.showEdu = false
    },
    openSalary(){
      this.showSalary = true
    },
    confirmSalary(value){
      this.user.salary = value;
      this.showSalary = false
    },
    closeSalary(){
      this.showSalary = false
    },
    savedBasicInfo(){                      //上传基本信息
      let _saveData = new Object();
      for(let _items in this.user){
        _saveData['_' + _items] = this.user[_items];
      }
      _saveData._Create_Date = this.userData.Create_Date;
      _saveData._Extend = this.userData.Extend;
      _saveData._FileName = this.userData.FileName;
      _saveData._FilePath = this.userData.FilePath;
      _saveData._GradSchool = this.userData.GradSchool;
      _saveData._ID = this.userData.ID;
      _saveData._ImgPath = this.userData.ImgPath;
      _saveData._Major = this.userData.Major;
      _saveData._Political = this.userData.Political;
      _saveData._wxOpenID = this.userData.wxOpenID;
      _saveData._wxUserInfo = this.userData.wxUserInfo;
      _saveData._IsPush = "N";
      _saveData._Stage = "1";
      _saveData._Readed = "N";
      _saveData._MyReaded = "N";
      let _salary = this.user.salary.split("");
      _saveData._SalaryMin = _salary[0];
      _saveData._SalaryMax = _salary[3];
      delete _saveData._salary;
      this.$http.post("/api/hr/profileuser/1/m",_saveData)
      this.$router.replace({name:'resume'})
    }
  },
  mounted(){
    let _postDate = {};
    this.$http.post("/api/hr/profileuser/1/r", _postDate).then(res => {
      console.log(res.data);
      if(res.data.Message == 'error' || res.data.Content == null){
        console.log('未填写简历')
      }
      else{                   //获取基本信息
        let _data = res.data.Content.Table[0];
        this.userData = _data;
        let _birthDay = new Date(_data.Birth).toLocaleDateString().split('/');
        this.user.Name = _data.Name;
        this.user.Sex = _data.Sex;
        this.user.Birth = _birthDay[0] + '-' + _birthDay[1] + '-' + _birthDay[2]
        this.user.Phone = _data.Phone;
        this.user.Marriage = _data.Marrage;
        this.user.Children = _data.Children;
        this.user.Homeland = _data.Homeland;
        this.user.EduLevel = _data.EduLevel;
        this.user.Addr = _data.Addr;
        this.user.salary = _data.SalaryMin + 'k' + '-' + _data.SalaryMax + 'k';
        this.user.IDCardNum = _data.IDCardNum;
        this.user.EmergencyContact = _data.EmergencyContact;
        this.user.EmergencyPhone = _data.EmergencyPhone;
        this.user.EmergencyRelation = _data.EmergencyRelation;
      }
    })
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
.van-button, .van-button--primary{
  background: #ffffff;
  border: 1px solid #afafaf;
  color: #666;
  border-radius: 3px;
}
.save-basicInfo{
  width: 96%;
  margin-left: 2%;
  height: 46px;
  background: #3385ff;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  margin-top: 10px;
}
.van-field >>> .van-field__control:disabled{
  color: #333
}
</style>
