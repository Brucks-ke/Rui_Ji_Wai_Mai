<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  components:{},
  data() {
    return{}
  },
}
</script>




<style lang="scss">
html{
    background-color: #f5f5f5 !important;
    height: 100% !important;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body { font-size:0.32rem }
ul{
  list-style: none;
}
img{
  vertical-align: top;
}
a{
  color: #555;
  text-decoration: none;
}
.mint-msgbox,.mint-msgbox-wrapper{ z-index:6000 !important }
.v-modal{ z-index:6000 !important }
</style>
