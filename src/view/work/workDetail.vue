<template>
<div>
  <van-nav-bar title="职位详情" left-text="返回" left-arrow @click-left="goback" >
  </van-nav-bar>
  <div class="detail-head">
    <div class="Pagetitle">
      <span class="jobName">{{informations.JobName}}</span>
      <span class="salary">[{{informations.SalaryMin}}千-{{informations.SalaryMax}}千]</span>
      <i :class="[isCollect ? 'iconfont icon-shoucangxing2' : 'iconfont icon-shoucangxing', 'collect-icon']" @click="collected"></i>
    </div>
    <div class="requires">
      <div class="requireItems">
        <i class="iconfont icon-xueli itemIcon"></i>&nbsp;<span>{{informations.EduLevel}}</span>
      </div>
      <div class="requireItems">
        <i class="iconfont icon-yonghu itemIcon"></i>&nbsp;<span>招聘{{informations.JobCount}}人</span>
      </div>
      <div class="requireItems">
        <i class="iconfont icon-shizhong itemIcon"></i>&nbsp;<span>{{releaseDate[1]}}-{{releaseDate[2]}}发布</span>
      </div>
    </div>
    <div class="advant-items">
      <span v-for="(workExtend,index) in workExtends" :key="index" class="testTime">{{workExtend}}</span>
    </div>
  </div>
  <div class="workInfo">
    <div class="describeTitle">
      <i class="iconfont icon-xiangmu"></i><span class="zw-ms">职位描述</span>
      <span class="gs-js" @click="tocompanyInfo(informations.Cid)">公司介绍 > </span>
    </div>
    <div class="respose">
      <p>岗位职责：</p>
      <p>{{informations.Responsibilities}}</p>
    </div>
    <div class="need">
      <p>任职资格：</p>
      <p>{{informations.Requirements}}</p>
    </div>
  </div>
  <div class="workPlace">
    <div class="describeTitle">
      <i class="iconfont icon-xiangmu"></i><span class="zw-ms">工作地点</span>
    </div>

    <div class="company-locate">
      <div class="main-locate">
        <i class="iconfont icon-dingwei"></i>
        <p>{{informations.Location}}</p>
        <!-- <div class="path-length">
          <i class="iconfont icon-location" style="margin-top:13px;display:block"></i>
          <span>9.4km</span>
        </div> -->
      </div>
    </div>

  <!-- 百度地图插件 -->
    <!-- <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler">
      <bm-marker :position="center" :dragging="false">

      </bm-marker>
      <bm-overlay
          pane="labelPane"
          :class="{sample: true, active}">
          <div>我爱北京天安门</div>
        </bm-overlay>
    </baidu-map> -->

    <div class="attention">
      <i class="iconfont icon-linedesign-11"></i>
      <span>以担保或任何理由索取财物，扣押证照，均涉嫌违法，请提高警惕！</span>
    </div>
    <button class="zw-sq-btn" @click="confirmWork(informations.Cid)">职位申请</button>
  </div>
</div>
</template>

<script>
// import BaiduMap from 'vue-baidu-map'
import '../../assets/img/collect-star/iconfont.css';
import '../../assets/img/icons-detail/iconfont.css';
import '../../assets/img/icons-locate/iconfont.css';
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import { NavBar, Popup, Tab, Tabs, Dialog, Toast } from 'vant';
Vue.use(NavBar)
.use(Popup)
.use(Tab)
.use(Dialog)
.use(Toast)
.use(Tabs)
// .use(BaiduMap,{     //使用地图插件
//   ak:'XGLIYGuKpZFTyZ7yHW7g6oni0lkDjGdR'
// })
export default {
  data(){
    return{
      isCollect: false,
      center: { lng: 0, lat: 0},
      zoom: 3,
      show: true,
      informations: '',
      releaseDate: '',
      workExtends: '',
      workName: '',
    }
  },
  methods:{
    // handler ({BMap, map}) {    //地图插件方法
    //   console.log(BMap, map)
    //   this.center.lng = 114.4414
    //   this.center.lat = 30.5056
    //   this.zoom = 18
    // },
    menu() {
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    },
    collected(){                //收藏
      console.log(this.isCollect)
      let _deleteId = this.$route.params.deleteid;
      if(this.isCollect == false){        //判断是否收藏,没有收藏则调用收藏接口
        let _id = this.$route.params._id;
        Vue.apiPost("/api/hr/profilecollect/1/c",{ _Offer_id: _id }).then(res => {
          console.log(_id)
        })
      }
      else{                            //已经收藏则调用取消收藏接口
        Vue.apiPost("/api/hr/profilecollect/1/d",{ _Id: _deleteId }).then(res => {
          console.log(_deleteId)
        })
      }
      this.isCollect = !this.isCollect
    },
    tocompanyInfo(id){
      this.$router.push({name:'company-information',params: { Cid: id }})
    },
    confirmWork(cid){               //投递简历
      let _postdata = {};
      this.$http.post("/api/hr/profileuser/1/r",_postdata).then(res => {
        var dataSave = new Object();
        let _data = res.data.Content.Table[0];
        for(let _items in _data){
          dataSave['_' + _items] = _data[_items];
        }
        dataSave._IsPush = "N";
        dataSave._Stage = "1";
        dataSave._Readed = "N";
        dataSave._MyReaded = "N";
        dataSave._Result = "投递成功";
        dataSave._Comment = "投递成功";
        console.log(dataSave);
        Dialog.confirm({
          title: '确定申请该职位？',
        }).then(() => {
          // on confirm
          this.$http.post("/api/hr/profile/1/c/" + cid, dataSave).then(res => {
            console.log(res.data)
          if(res.data.Message == 'repeat'){
            Toast("请勿重复投递！");
            return
          }
          else{
            Dialog.alert({
              title: '投递成功！',
              // message: '弹窗内容'
            }).then(() => {
              // on close
            });
            // this.$router.push({name:'succeed'})
          }
        })
        }).catch(() => {
          // on cancel
        });
      })
    }
  },
  mounted(){
    let _id = this.$route.params._id;
    console.log(_id)
      Vue.apiPost("/api/hr/Offers/1/r/-1",{ Id: _id}).then(res => {
        let _data = res.data.Content.Table[0];
        this.informations = _data;
        this.workName = _data.JobName;
        this.releaseDate = new Date(_data.Create_Date).toLocaleDateString().split('/');
        this.workExtends = _data.Extend.split('-');
      })
      console.log(_id)
      Vue.apiPost("/api/hr/profilecollect/1/r",{ Offer_Id: _id }).then(res => {
        if (res.data.Content){
          this.isCollect = true;
        }
      })
  },
  created(){
    this.menu()
  }
}
</script>

<style scoped>
    /* 地图插件样式 */
/* .bm-view{
  width: 100%;
  height: 210px;
  margin-top: 10px;
}
.sample {
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: rgba(255,255,255,1);
  overflow: hidden;
  box-shadow: 0 0 1px #333;
  color: #333;
  text-align: center;
  padding: 10px;
  position: absolute;
} */
.company-locate{
  margin-top: 20px;
  background-image: url("../../assets/img/icon-19.png");
  height: 150px;
  background-size: 100% auto;
}
.main-locate{
  background: #ffffff;
  position: absolute;
  height: 90px;
  width: 80%;
  margin: 30px auto auto 10%;
  border-radius: 6px;
  float: left;
}
.icon-dingwei{
  padding-left: 10px;
  font-size: 25px;
  margin: auto;
  line-height: 90px;
  float: left;
}
.main-locate p{
  width: 85%;
  height: 90px;
  line-height: 90px;
  margin: 0;
  padding-left: 5px;
  color: #333;
  font-size: 12px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
}
.path-length{
  width: 60px;
  height: 60px;
  margin-top: 15px;
  float: right;
  text-align: center;
  font-size: 14px;
  background: #f9f9f9;
  margin-right: 10px;
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
.Pagetitle{
  height: 40px;
  padding-top: 60px;
  width: 90%;
  margin-left: 5%;
  border-bottom: 1px solid #dfdfdf;
}
.detail-head{
  min-height: 215px;
  max-height: 270px;
  background: #ffffff;
  overflow: hidden;
}
.jobName{
  font-weight: 600;
  font-size: 18px;
}
.salary{
  color: darkslategray
}
.collect-icon{
  float: right;
  font-size: 18px;
  color: rgb(233,0,0)
}
.requires{
  height: 70px;
}
.requireItems{
  width: 31%;
  text-align: center;
  float: left;
  margin: 30px auto 10px auto;
}
.requireItems span{
  font-size: 14px;
}
.itemIcon{
  font-size: 20px;
  color: darkslategrey
}
.advant-items{
  width: 90%;
  margin-left: 7%;
}
.testTime{
  display: block;
  margin: auto 5%;
  border: 2px solid darkslategrey;
  width: 20%;
  text-align: center;
  font-size: 14px;
  color: darkslategrey;
  margin-bottom: 20px;
  float: left;
}
.workInfo{
  background: #ffffff;
}
.describeTitle{
  width: 90%;
  margin-left: 5%;
  padding-top: 15px;
  margin-top: 10px;
  overflow: hidden;
}
.icon-xiangmu{
  font-size: 25px;
  float: left;
  color: darkslategray
}
.zw-ms{
  display: block;
  float: left;
  height: 25px;
  line-height: 25px;
  margin-left: 6px;
  font-size: 18px;
}
.gs-js{
  display: block;
  float: right;
  font-size: 18px;
  font-weight: 600;
  color: darkslategray
}
.respose{
  padding-top: 10px;
  width: 90%;
  margin-left: 5%;
}
.respose p,.need p{
  margin: 5px 0 0 0;
  font-size: 15px;
  color: #666
}
.need{
  margin: 10px 0 10px 5%;
  width: 90%;
  padding: 0 0 20px 0;
}
.workPlace{
  background: #ffffff
}
.icon-linedesign-11{
  font-size: 45px;
  float: left;
  color: red
}
.attention{
  width: 80%;
  margin-left: 10%;
  margin-top: 30px;
  height: 60px;
  padding-bottom: 70px;
}
.attention span{
  display: block;
  height: 46px;
  line-height: 23px
}
.zw-sq-btn{
  width: 100%;
  height: 50px;
  background: rgb(29, 70, 122);
  color: #ffffff;
  border: none;
  position: fixed;
  bottom: 0;
}
</style>
