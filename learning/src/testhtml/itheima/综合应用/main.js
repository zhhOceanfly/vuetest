// 查询歌曲
// https://autumnfish.cn/search?keywords=
// 歌曲url获取接口
// https://autumnfish.cn/song/url?id=
//获取歌曲封面
//https://autumnfish.cn/song/detail?ids=
//获取歌曲评论
//https://autumnfish.cn/comment/hot?type=0&id=
// 请求mv地址
// https://autumnfish.cn/mv/url?id=mvid
var app = new Vue({
    el: "#player",
    data: {
        query: "",
        musiclist: [],
        musicurl: "",
        musiccover: "",
        //歌曲评论
        hotComments: [],
        isPlaying: false,
        //遮罩层的显示状态
        isshow: false,
        //mv地址
        mvurl: ""
    },
    methods: {
        searchMusic: function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function (Response) {
                    that.musiclist = Response.data.result.songs;
                    // console.log(that.musiclist);
                }, function (err) { })
        },
        playMusic: function (musicId) {
            var that = this
            console.log(musicId);
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function (Response) {
                    // console.log(Response.data.data[0].url);
                    that.musicurl = Response.data.data[0].url;
                }, function (err) { })
            //歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function (Response) {
                    // console.log(Response.data.songs[0]);
                    that.musiccover = Response.data.songs[0].al.picUrl;
                }, function (err) { })
            //歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function (Response) {
                    that.hotComments = Response.data.hotComments;
                }, function (err) { })
        },
        play: function () {
            console.log("play");
            this.isPlaying = true;
        },
        pause: function () {
            console.log("pause");
            this.isPlaying = false;
        },
        playmv: function (mvid) {
            var that = this
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function (Response) {
                    //  console.log(Response.data.data.url)
                    that.isshow = true;
                    that.mvurl = Response.data.data.url;
                }, function (err) { })
        },
        hide: function () {
            this.isshow = false;
        }

    }
})