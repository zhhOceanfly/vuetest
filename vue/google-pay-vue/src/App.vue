<template>
  <div id="app">
    <h1>
      Botão google pay
    </h1>
    <GooglePay
      totalPrice="100.00"
      @loaded="loaded"
      @loadedError="loadedError"
      @paymentError="paymentError"
      @paymentSuccess="paymentSuccess" />
  </div>
</template>

<script>
import GooglePay from './components/GooglePay.vue';

export default {
  name: 'App',
  components: {
    GooglePay,
  },
  methods: {
    loaded(data) {
      console.log('loaded: ', data);
    },
    loadedError(data) {
      console.log('loadedError: ', data);
    },
    paymentError(data) {
      console.log('paymentError: ', data);
    },
    paymentSuccess(data) {
      console.log('paymentSuccess: ', data);
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
