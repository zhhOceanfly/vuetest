import { createHead } from '@unhead/vue'
import { createApp } from 'vue';
import App from './App.vue'
//import Pay from './Pay.vue'

const app = createApp(App)

const head = createHead()
app.use(head) 

app.mount('#app')
//new Vue({
//    el: '#app',//指定了 Vue 实例将要挂载的 DOM 元素的选择器
//    render: h => h(App),//一个渲染函数，它告诉 Vue 如何渲染根组件，h 是一个常用的约定，代表 createElement 函数
//  })//多余的，在 Vue 实例创建后，如果指定了 el 选项，Vue 会自动将实例挂载到对应的 DOM 元素上
  