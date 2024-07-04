var app = new Vue({
    el: "#app",
    data: {
        city: "",
        weatherlist: [],
    },
    methods: {
        seachweather: function () {
            var that = this;
            console.log(this.city)
            // 调用接口
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.city).then(function (Response) {
                //  console.log(Response.data.data.forcast);
                that.weatherlist = Response.data.data.forcast

            }, function (err) {

            })

        },
        changecity: function (city) {
            this.city = city
            this.seachweather();
        }

    },
})