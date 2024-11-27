<template>
  <head>
    
  <component :is="'script'">
    // JS Here
  </component>
  </head>
  <body>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </body>
  
<!-- vue3不支持template里使用script
  而且目标环境不支持动态导入
  -->
</template>

<script >
import HelloWorld from './components/HelloWorld.vue'
import payjs from '@/assets/pay.js';


export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted(){
    var s = document.getElementById("payjs")
    if (s == undefined) {
      const s = document.createElement('script');
      s.type = "module";
      s.id = "payjs";
      //s.src = "https://pay.google.com/gp/p/js/pay.js";
      s.src = payjs;
      document.body.appendChild(s);
    }
  },
  beforeDestroy() {
    // console.log(2222)
    // var s = document.getElementById("payjs")
    // s.remove()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
