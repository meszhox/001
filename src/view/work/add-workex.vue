<template>
  <div class="workEx">
    <van-nav-bar title="工作经历" left-text="返回" left-arrow @click-left="goback" />
    <div>
      <div class="basicInfo">
        <van-cell-group>
          <van-cell v-for="(infomation,index) in infomations" :key="index" :title=infomation.ComName @click="addEx(infomation.ID)" is-link />
        </van-cell-group>
      </div>
      <button @click="addEx(add)" class="add-experence">添加工作经验</button>
    </div>
  </div>
</template>

<script>
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import { NavBar, Cell, CellGroup } from 'vant';
Vue.use(NavBar)
.use(Cell)
.use(CellGroup)
export default {
  data(){
    return{
      infomations: '',
      add: null,
    }
  },
  methods:{
    goback(){
      this.$router.replace({name:'resume'})
    },
    addEx(id){
      this.$router.replace({name:'addworkEx',params:{_comID:id}})
    }
  },
  mounted(){
    this.$http.post("/api/hr/WorkerExper/1/r/-1",{}).then(res => {
      let _data = res.data.Content.Table;
      this.infomations = _data
    })
  }
}
</script>

<style scoped>
.workEx{
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
.add-experence{
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
.describe{
  text-align: center;
  margin: 0;
  height: 30px;
  line-height: 30px;
  color: #888
}
.basicInfo{
  width: 94%;
  margin-left: 3%;
  margin-top: 80px;
}
.van-cell-group,.van-cell{
  border-radius: 8px;
}
</style>
