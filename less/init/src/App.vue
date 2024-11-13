<template>
  <div id="app">
    <!-- 独立测试区1 -->
    <!-- <bBar msg="Vue-CLI"></bBar>
    <sBar msg="Vuex"></sBar> -->

    <!-- 独立测试区2 -->
    <abbr>
      <button @click="bshow = !bshow">aBar的button控制</button>
    </abbr>
    <bBar v-show="bshow" msg="Vue-CLI"></bBar>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import aBar from "./components/aBar.vue";
import bBar from "./components/bBar.vue";
import sBar from "./components/sBar.vue";
import Vue from "vue";

//Vue.component("sBar", sBar);

export default {
  name: "App",
  data() {
    return {
      bshow: true,
    };
  },
  components: {
    sBar,
    bBar,
    aBar,
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
