<template>
  <div class="zwCommend">
    <van-nav-bar title="职位推荐" left-text="返回" left-arrow @click-left="goback" >
    </van-nav-bar>
    <div style="height:45px;border-bottom:1px solid #cfcfcf;padding-top:47px;background:#fff">
      <div :class="[isActive1 ? 'active' : 'screen', 'screen']" @click="chooseType">
        <span>{{type}}<i class="iconfont icon-sarrowbottom"></i></span>
      </div>
      <div :class="[isActive2 ? 'active' : 'screen', 'screen']" @click="chooseType2">
        <span>{{type2}}<i class="iconfont icon-sarrowbottom"></i></span>
      </div>
      <div :class="[isActive3 ? 'active' : 'screen', 'screen']" @click="chooseSalary">
        <span>{{salary}}<i class="iconfont icon-sarrowbottom"></i></span>
      </div>
      <div :class="[isActive4 ? 'active' : 'screen', 'screen']" @click="chooseCity">
        <span>{{city}}<i class="iconfont icon-sarrowbottom"></i></span>
      </div>
    </div>

      <!-- 筛选下拉菜单（底部弹出层） -->
      <van-popup v-model="showType" position="bottom" @click-overlay="closeType">
        <div class="type-box">
           <van-picker show-toolbar :columns="types" @cancel="closeType" @confirm="comfireType" />
        </div>
      </van-popup>

      <van-popup v-model="showType2" position="bottom" @click-overlay="closeType2">
        <div>
          <van-picker show-toolbar :columns="workCate"  @cancel="closeType2" @confirm="comfireType2" />
        </div>
      </van-popup>

      <van-popup v-model="showSalary" position="bottom" @click-overlay="closeSalary">
        <div class="type-box">
          <van-picker show-toolbar :columns="salarys" @cancel="closeSalary" @confirm="comfireSalary" />
        </div>
      </van-popup>

      <van-popup v-model="showCity" position="bottom" @click-overlay="closeCity">
        <div class="type-box">
          <!-- vant组件 地址选择权 -->
          <van-area :area-list="areaList" :columns-num="2" @cancel="closeCity" @confirm="comfireCity" />
        </div>
      </van-popup>
      <!-- vant组件 list插件 -->
      <van-list v-model="loading" :finished="finished" :offset='220' @load="loadList" >
        <div class="commend-item" @click="toworkDetail(work.ID)" v-for="(work,index) in works" :key="index">
          <div class="jobDescribe">
            <span style="font-size:16px">{{work.JobName}}</span>
            <span style="font-size:12px;color: #9b9b9b">{{work.City}} | {{work.YearsMin}}-{{work.YearsMax}}年工作经验 | {{work.EduLevel}}</span>
            <span style="font-size:12px;color: #9b9b9b">{{work.ComName}}</span>
          </div>
          <div class="workRight">
            <span style="color:#f7364e;font-size:17px">{{work.SalaryMin}}K-{{work.SalaryMax}}K/月</span><br>
            <span style="font-size:12px;color: #9b9b9b">热招中...</span>
          </div>
        </div>
      </van-list>

  </div>
</template>

<script>
import {AreaList} from '@/router/area.js'      //导入地址信息
import '../../assets/img/bottom-arrow/iconfont.css';
import 'vant/lib/vant-css/index.css';
import '../../assets/img/icon-bottom-s/iconfont.css'
import Vue from 'vue';
import {
  NavBar, Popup, Picker, Area, Toast, List
} from 'vant';
Vue.use(NavBar)
.use(Popup)
.use(Area)
.use(Toast)
.use(List)
.use(Picker);


export default {
  data(){
    return{
      type:'工作性质',
      type2:'工作类型',
      salary:'薪资',
      city:'城市',
      showType:false,
      showType2:false,
      showSalary:false,
      showCity:false,
      isActive1:null,
      isActive2:null,
      isActive3:null,
      isActive4:null,
      salarys:['不限','1k-2k','3k-5k','6k-8k','9k-10k','10k-20k','20k-50k','50k-100'],
      areaList:AreaList,
      types:['不限','全职','兼职','实习'],
      workCate: [],
      newPage: 1,
      works: '',
      loading: false,
      finished: false,
    }
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    },
    chooseType(){
      this.showType = true;
      this.isActive1 = !this.isActive1
    },
    closeType(){
      this.isActive1 = null;
      this.showType = false
    },
    comfireType(value,index){      //确定工作性质
      this.isActive1 = null;
      this.showType = false;
      this.type = value;
      if(this.salary == '不限' || this.salary == '薪资'){
        var minSalary = null;
        var maxSalary = null;
      }
      else{
        let _spiltSalary = this.salary.split("");
        var minSalary = _spiltSalary[0];
        var maxSalary = _spiltSalary[3];
      }
      if(value === '工作性质' || value === '不限'){
        var _Norm = null
      }
      else{
        var _Norm = value
      }
      if(this.type2 === '工作类型' || this.type2 === '不限'){
        var _JobCate = null
      }
      else{
        var _JobCate = this.type2
      }
        Vue.apiPost("/api/hr/Offers/conditionquery/1",
        {
          Norm: _Norm,
          JobCate: _JobCate,
          SalaryMin: minSalary,
          SalaryMax: maxSalary,
          City: [this.city == '城市' ? null : this.city ],
        }).then(res => {
          this.works = res.data
        })
    },
    chooseType2(){
      this.showType2 = true;
      this.isActive2 = !this.isActive2
    },
    closeType2(){
      this.isActive2 = null;
      this.showType2 = false
    },
    comfireType2(value,index){          //确定工作类型
      this.isActive2 = null;
      this.showType2 = false;
      this.type2 = value;
      if(this.salary == '不限' || this.salary == '薪资'){
        var minSalary = null;
        var maxSalary = null;
      }
      else{
        let _spiltSalary = this.salary.split("");
        var minSalary = _spiltSalary[0];
        var maxSalary = _spiltSalary[3];
      }
      if(this.type === '工作性质' || this.type === '不限'){
        var _Norm = null
      }
      else{
        var _Norm = this.type
      }
      if(value === '工作类型' || value === '不限'){
        var _JobCate = null
      }
      else{
        var _JobCate = value
      }
        Vue.apiPost("/api/hr/Offers/conditionquery/1",
        {
          Norm: _Norm,
          JobCate: _JobCate,
          SalaryMin: minSalary,
          SalaryMax: maxSalary,
          City: [this.city == '城市' ? null : this.city ],
        }).then(res => {
          this.works = res.data
        })
    },
    chooseSalary(){
      this.showSalary = true;
      this.isActive3 = !this.isActive3
    },
    closeSalary(){
      this.isActive3 = null;
      this.showSalary = false;
    },
    comfireSalary(value,index){       //确定薪资
      this.isActive3 = null;
      this.showSalary = false;
      this.salary = value;
      if(this.salary == '不限' || this.salary == '薪资'){
        var minSalary = null;
        var maxSalary = null;
      }
      else{
        let _spiltSalary = this.salary.split("");
        var minSalary = _spiltSalary[0];
        var maxSalary = _spiltSalary[3];
      }
      if(this.type === '工作性质' || this.type === '不限'){
        var _Norm = null
      }
      else{
        var _Norm = this.type
      }
      if(this.type2 === '工作类型' || this.type2 === '不限'){
        var _JobCate = null
      }
      else{
        var _JobCate = this.type2
      }
        Vue.apiPost("/api/hr/Offers/conditionquery/1",
        {
          Norm: _Norm,
          JobCate: _JobCate,
          SalaryMin: minSalary,
          SalaryMax: maxSalary,
          City: [this.city == '城市' ? null : this.city],
        }).then(res => {
          this.works = res.data
        })
    },
    chooseCity(){
      this.showCity = true;
      this.isActive4 = !this.isActive4
    },
    closeCity(){
      this.showCity = false;
      this.isActive4 = null
    },
    comfireCity(columnsNum){          //确定地点
      this.showCity = false;
      this.isActive4 = null;
      this.city = columnsNum[1].name
      if(this.salary == '不限' || this.salary == '薪资'){
        var minSalary = null;
        var maxSalary = null;
      }
      else{
        let _spiltSalary = this.salary.split("");
        var minSalary = _spiltSalary[0];
        var maxSalary = _spiltSalary[3];
      }
      if(this.type === '工作性质' || this.type === '不限'){
        var _Norm = null
      }
      else{
        var _Norm = this.type
      }
      if(this.type2 === '工作类型' || this.type2 === '不限'){
        var _JobCate = null
      }
      else{
        var _JobCate = this.type2
      }
        this.$http.post("/api/hr/Offers/conditionquery/1",
        {
          Norm: _Norm,
          JobCate: _JobCate,
          SalaryMin: minSalary,
          SalaryMax: maxSalary,
          City: columnsNum[1].name == '城市' ? null : columnsNum[1].name,
        }).then(res => {
          this.works = res.data
        })
    },
    //  onChange(picker, values) {
    //   picker.setColumnValues(1, works[values[0]]);
    // },
    toworkDetail(e){
      this.$router.push({name:'workDetail',params:{ _id: e }})
    },
    loadList() {                             //懒加载
      let _ch1 = this.type;
      let _ch2 = this.type2;
      let _ch3 = this.salary;
      console.log(this.salary);
      if(_ch1 === '工作性质' || _ch1 === '不限'){
        _ch1 = 0
      }
      if(_ch2 === '工作类型' || _ch2 === '不限'){
        _ch2 = 0
      }
      if(_ch3 === '薪资' || _ch3 === '不限'){
        _ch3 = 0
      }
      if(_ch1 == 0 && _ch2 == 0  && _ch3 == 0 && this.city == '城市'){            //判断是否加入筛选条件
        setTimeout(() => {
          this.$http.post("/api/hr/Offers/conditionquery/" + this.newPage,{}).then(res => {   //没有加入筛选条件调用的接口
            let _data = res.data;
            if (_data.length == 0){
              this.finished = true;
            }
            else{
              this.works = this.works.concat(_data);
            }
            this.loading = false;
          })
          this.newPage ++;
        }, 500);
      }
      else{
        let _select1 = this.type;
        let _select2 = this.type2;
        let _select3 = this.salary;
        let _select4 = this.city;
        if(_select1 == '工作性质' || _select1 == '不限'){
          _select1 = null
        }
        if(_select2 == '工作类型' || _select2 == '不限'){
          _select2 = null
        }
        if(_select3 == '薪资' || _select3 == '不限'){
          _SalaryMin = null;
          _SalaryMax = null;
        }
        else{
          let _salarys = _select3.split("");
          console.log(_salarys)
          var _SalaryMin = _salarys[0];
          var _SalaryMax = _salarys[3];
        }
        if(_select4 == '城市'){
          _select4 = null
        }
        setTimeout(() => {
          this.$http.post("/api/hr/Offers/conditionquery/" + this.newPage,{             //有筛选条件调用的接口
            Norm: _select1,
            JobCate: _select2,
            SalaryMin: _SalaryMin,
            SalaryMax: _SalaryMax,
            City: _select4
          }).then(res => {
            let _data = res.data;
            if (_data.length == 0){
              return this.finished = true;
            }
            else{
              this.works = this.works.concat(_data);
            }
            this.loading = false;
          })
          this.newPage ++;
        }, 500);
      }
    }
  },
  mounted(){
    Vue.apiPost("/api/hr/Offers/OfferRecomment/1", { "": "" }).then(res => {
      if(res.data != "未将对象引用设置到对象的实例。"){
        this.works = res.data
      }
    })
    Vue.apiGet("/api/hr/Offers/jobcate").then(res => {
      let _data = res.data;
      this.workCate = _data
      this.workCate.unshift("不限")
    })
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
.van-nav-bar >>> .van-nav-bar__arrow::before,.van-nav-bar >>> .van-nav-bar__text{
  color: #ffffff;
}
.active{
  color: #00bacd;
  width: 25%;
  float: left;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
}
.screen{
  width: 25%;
  float: left;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.commend-item{
  height: 90px;
  background: #ffffff;
  margin: 10px auto;
}
.jobDescribe{
  width: 50%;
  margin-left: 6%;
  float: left;
  padding-top: 8px
}
.jobDescribe span{
  display: block;
  height: 25px;
  line-height: 25px
}
.workRight{
  width: 30%;
  float: right;
  text-align: right;
  margin-right: 6%;
  padding-top: 8px
}
.workRight span{
  display: block;
  height: 25px;
  line-height: 25px
}
.type-box{
  text-align: center;
  overflow: hidden;
}

.typeComfire{
  float: right;
  border: none;
  background: #ffffff;
  padding-top: 10px;
  color: #00bacd
}
.noType{
  border: none;
  background: #ffffff;
  padding-top: 10px;
  float: left;
  color: #888
}
.type-box ul{
  margin-top: 40px;
}
.type-box li{
  line-height: 30px;
  padding: 3px;
  border-bottom: 1px solid #dfdfdf
}
</style>
