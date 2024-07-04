// 1.使用ES6导入语法。导人jQuery
import $ from 'jquery'
// 2.定义jQuery的入口函数
$(function () {
    // 3.实现奇偶行变色1 / 奇数行为红色
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'yellow')
})


// //定义jQuery的入口函数
// $(function () {
//     //3.实现奇偶行变色
//     $('li:odd').css('background-color', 'red')
//     $('li:even').css('background-color', 'pink')
// })