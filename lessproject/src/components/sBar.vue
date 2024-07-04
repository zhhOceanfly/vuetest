<template>
  <div>
    <h1 class="sbar">Hello,{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name: "sBar",
  props: {
    msg: String,
  },
};
</script>
<style scoped lang="less">
// .sbar {
//   background: bisque;
// }
h1 {
  background: orange;
}
</style>