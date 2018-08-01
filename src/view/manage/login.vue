<template>
  <div :style="{height: bodyHeight + 'px'}" style="background: rgb(32, 41, 56)">
    <div class="login-logo">

    </div>
    <div class="textBox">
      <div class="name">
        <i class="iconfont icon-user"></i>
        <input v-model="userName" type="text" placeholder="  用户名">
      </div>
      <div class="key">
        <i class="iconfont icon-mima"></i>
        <input v-model="password" type="password" placeholder="  密码">
      </div>
    </div>
    <div class="login-btn">
      <button @click="tomanage">登  陆</button>
    </div>
  </div>
</template>

<script>
// import '../../assets/css/login.css';
import '../../assets/img/icon-login/iconfont.css';
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast)
export default {
  data(){
    return{
      userName: '',
      password: '',
      bodyHeight: '',
    }
  },
  methods:{
    tomanage(){
      this.$http.post("/api/user/login",{
        _UserName:this.userName,
        _PassWord:this.password
      }).then(res => {
        if(res.data.Message == 'success'){
          Toast('登陆成功！')
          if(res.data.Content.Table[0].Type == 1){
            this.$router.push({name:'manage'})
          }
          else{
            let _cid = res.data.Content.Table[0].Cid
            this.$router.push({name:'comMange',params:{Cid: _cid}})
            console.log(_cid)
          }
        }
        else{
          Toast('用户名或密码错误！')
          return
        }
      })
    }
  },
  mounted(){
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.bodyHeight = h;
  }
}
</script>

<style scoped>
.login-logo{
  height: 280px;
  background: url('../../assets/img/login-logo.png')  no-repeat;
  background-position: center;
  background-size: 33% 33%;
}
.textBox{
  text-align: center;
  width: 80%;
  margin-left: 10%;
}
.textBox input{
  background: none;
  height: 25px;
  border: none;
  color: #fff
}
.name{
  height: 45px;
  line-height: 40px;
  border-top: 1px solid rgba(253, 253, 253, .5);
  border-bottom: 1px solid rgba(253, 253, 253, .5)
}
.key{
  height: 45px;
  line-height: 40px;
  border-bottom: 1px solid rgba(253, 253, 253, .5)
}
.iconfont{
  color: #cfcfcf;
  font-size: 18px;
}
.login-btn{
  text-align: center
}
.login-btn button{
  width: 70%;
  margin-top: 40px;
  height: 35px;
  color: #fff;
  background: #10b7ca;
  border-radius: 3px;
  border: none
}
</style>
