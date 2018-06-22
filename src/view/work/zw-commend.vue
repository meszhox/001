<template>
  <div class="zwCommend">
    <van-nav-bar title="职位推荐" left-text="返回" left-arrow @click-left="goback" >
      <i class="iconfont icon-more" slot="right" />
    </van-nav-bar>
    <div style="height:45px;border-bottom:1px solid #cfcfcf;padding-top:47px;background:#fff">
      <div :class="[isActive1 ? 'active' : 'screen', 'screen']" @click="chooseType">
        <span>{{type}}</span>
        <i class="iconfont icon-bottom"></i>
      </div>
      <div :class="[isActive2 ? 'active' : 'screen', 'screen']" @click="chooseType2">
        <span>{{type2}}<i class="iconfont icon-bottom"></i></span>
      </div>
      <div :class="[isActive3 ? 'active' : 'screen', 'screen']" @click="chooseSalary">
        <span>{{salary}}</span>
        <i class="iconfont icon-bottom"></i>
      </div>
      <div :class="[isActive4 ? 'active' : 'screen', 'screen']" @click="chooseCity">
        <span>{{city}}</span>
        <i class="iconfont icon-bottom"></i>
      </div>
    </div>

      <!-- 筛选下拉菜单（底部弹出层） -->
      <van-popup v-model="showType" position="bottom" @click-overlay="closeType">
        <div class="type-box">
          <button class="noType" @click="closeType">取消</button>
          <button class="typeComfire" @click="comfireType(-1)">确定</button>
          <ul>
            <li v-for="(type,index) in types" :key="index" @click="comfireType(type.key)">{{type.value}}</li>
          </ul>
        </div>
      </van-popup>

      <van-popup v-model="showType2" position="bottom" @click-overlay="closeType2">
        <div>
          <!-- <button class="noType" @click="closeType2">取消</button>
          <button class="typeComfire" @click="comfireType2">确定</button> -->
          <van-picker show-toolbar :columns="columns" @change="onChange"  @cancel="closeType2" @confirm="comfireType2" />
        </div>
      </van-popup>

      <van-popup v-model="showSalary" position="bottom" @click-overlay="closeSalary">
        <div class="type-box">
          <van-picker show-toolbar :columns="salarys" @cancel="closeSalary" @confirm="comfireSalary" />
          <!-- <ul>
            <li>全部</li>
            <li>2K-4K</li>
            <li>4K-6K</li>
            <li>6K-8K</li>
            <li>8K-12K</li>
            <li>12K-20K</li>
            <li>20K-50K</li>
            <li>50K以上</li>
          </ul> -->
        </div>
      </van-popup>

      <van-popup v-model="showCity" position="bottom" @click-overlay="closeCity">
        <div class="type-box">
          <!-- <button class="noType" @click="closeCity">取消</button>
          <button class="typeComfire" @click="comfireCity">确定</button>
          <van-area :area-list="areaList" /> -->
          <van-area :area-list="areaList" :columns-num="2" @cancel="closeCity" @confirm="comfireCity" />
        </div>
      </van-popup>

      <div class="commend-item" @click="toworkDetail">
        <div class="jobDescribe">
          <span style="font-size:16px">流水线安装工</span>
          <span style="font-size:12px;color: #9b9b9b">武汉 | 3-5年工作经验 | 中专</span>
          <span style="font-size:12px;color: #9b9b9b">湖北武汉美的有限公司</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:17px">3K-5K/月</span><br>
          <span style="font-size:12px;color: #9b9b9b">3天前</span>
        </div>
      </div>

      <div class="commend-item">
        <div class="jobDescribe">
          <span style="font-size:16px">流水线安装工</span>
          <span style="font-size:12px;color: #9b9b9b">武汉 | 3-5年工作经验 | 中专</span>
          <span style="font-size:12px;color: #9b9b9b">湖北武汉美的有限公司</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:17px">3K-5K/月</span><br>
          <span style="font-size:12px;color: #9b9b9b">3天前</span>
        </div>
      </div>

      <div class="commend-item">
        <div class="jobDescribe">
          <span style="font-size:16px">流水线安装工</span>
          <span style="font-size:12px;color: #9b9b9b">武汉 | 3-5年工作经验 | 中专</span>
          <span style="font-size:12px;color: #9b9b9b">湖北武汉美的有限公司</span>
        </div>
        <div class="workRight">
          <span style="color:#f7364e;font-size:17px">3K-5K/月</span><br>
          <span style="font-size:12px;color: #9b9b9b">3天前</span>
        </div>
      </div>

  </div>
</template>

<script>
import {AreaList} from '@/router/area.js'
import '../../assets/img/bottom-arrow/iconfont.css';
import '../../assets/img/icon-more/iconfont.css'
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import {
  NavBar, Popup, Picker, Area, Toast
} from 'vant';
Vue.use(NavBar)
.use(Popup)
.use(Area)
.use(Toast)
.use(Picker);

const works = {
  '市场类' : ['全部','销售总监','部门经理','市场总监','客户经理','销售助理'],
  '生产类' : ['全部','机械工程师','机械设计师','机械制图','机电工程师','磨具工程师','材料工程师','焊接工程师'],
  '管理类' : ['全部','行政主管','行政经理','行政总监','经理助理','事业部负责人','CEO/总裁','人事主管']
}
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
      columns: [
        {
          values: Object.keys(works),
          className: 'column1'
        },
        {
          values: works['市场类'],
          className: 'column2',
          defaultIndex: 0
        }
      ],
      salarys:['2k-4k','4k-6k','6k-8k','8k-10k','10k-20k','20k-50k','50k以上'],
      areaList:AreaList,
      types:[{key:0,value:'不限'},
           {key:1,value:'全职'},
           {key:2,value:'兼职'},
           {key:3,value:'实习'}]
    }
  },
  methods:{
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
    comfireType(e){
      this.isActive1 = null;
      this.showType = false;
      if (e == -1){
        this.type = '工作性质'
      }
      else{
        this.type = this.types[e].value
      }
    },
    chooseType2(){
      this.showType2 = true;
      this.isActive2 = !this.isActive2
    },
    closeType2(){
      this.isActive2 = null;
      this.showType2 = false
    },
    comfireType2(value,index){
      this.isActive2 = null;
      this.showType2 = false;
      if(index[1] == 0){
        this.type2 = value[0]
      }
      else{
        this.type2 = value[1]
      }
    },
    chooseSalary(){
      this.showSalary = true;
      this.isActive3 = !this.isActive3
    },
    closeSalary(){
      this.isActive3 = null;
      this.showSalary = false;
    },
    comfireSalary(value,index){
      this.isActive3 = null;
      this.showSalary = false;
      this.salary = value;
    },
    chooseCity(){
      this.showCity = true;
      this.isActive4 = !this.isActive4
    },
    closeCity(){
      this.showCity = false;
      this.isActive4 = null
    },
    comfireCity(columnsNum){
      this.showCity = false;
      this.isActive4 = null;
      this.city = columnsNum[1].name
    },
     onChange(picker, values) {
      picker.setColumnValues(1, works[values[0]]);
    },
    toworkDetail(){
      this.$router.push({name:'workDetail'})
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
.van-nav-bar >>> .van-nav-bar__arrow::before,.van-nav-bar >>> .van-nav-bar__text,.icon-more::before{
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
