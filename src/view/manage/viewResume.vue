<template>

</template>

<script>
export default {
  data(){
    return{

    }
  },
  mounted(){
    let _id = this.$route.params._ID;
    this.$http.post("/api/hr/profile/1/wxProfile/-1",{
      _ID: _id
    }).then(res => {
      console.log(res.data)
    })
  }
}
</script>

<style>

</style>
