<template>
  <div>
    <h1 class="bBar">Hello,{{ msg }}!(bBar)</h1>
  </div>
</template>
<script>
export default {
  name: "bBar",
  props: {
    msg: String,
  },
};
</script>
<style lang="less">
</style>