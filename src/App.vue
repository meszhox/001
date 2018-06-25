<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  data(){
    return{
      transitionName:''
    }
  }
}
</script>

<style>
html{
  height: 100%;
  width: 100%;
}
body{
  margin: 0;
  background-color: #efefef;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
  height: 100%;
  width: 100%;
}
</style>
