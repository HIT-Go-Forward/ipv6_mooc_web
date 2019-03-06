<template>
    <el-col :span="20" :offset="2" class="carousel-container">
        <el-col :span="4" class="type-collect">
            <div class="type"><a href="javascript:">计算机</a></div>
            <div class="type"><a href="javascript:">经济管理</a></div>
            <div class="type"><a href="javascript:">心理学</a></div>
            <div class="type"><a href="javascript:">外语</a></div>
            <div class="type"><a href="javascript:">文学历史</a></div>
            <div class="type"><a href="javascript:">艺术设计</a></div>
            <div class="type"><a href="javascript:">工学</a></div>
            <div class="type"><a href="javascript:">理学</a></div>
            <div class="type"><a href="javascript:">其他</a></div>
        </el-col>
        <el-col :span="15" class="carousel-collect">
            <el-carousel trigger="click" class="carousel" height="25rem" @change="changeImg">
                <el-carousel-item>
                    <img src="./../../../assets/image/homePagePic1.png" class="main-img">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="./../../../assets/image/homePagePic2.jpg" class="main-img">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="./../../../assets/image/homePagePic3.png" class="main-img">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="./../../../assets/image/homePagePic4.jpg" class="main-img">
                </el-carousel-item>
            </el-carousel>
        </el-col>
        <el-col :span="5" class="carousel-right">
            <el-col :span="18" class="user-courses" v-if="!this.$store.getters.getStorge.IsLogin">
                <div class="user-courses-img-div">
                    <img src="./../../../assets/image/avatar.png" class="user-courses-img">
                </div>
                <div class="user-courses-text">
                    <span>游客，您好</span>
                </div>
                <div class="user-courses-items">
                    <span>请登录以获得更多服务！</span>
                </div>
            </el-col>
            <el-col :span="18" class="user-courses" v-else>
                <div class="user-courses-img-div">
                    <img :src="'/media'+this.user.img" class="user-courses-img">
                </div>
                <div class="user-courses-text">
                    <span><a class="carousel-right-username">{{this.user.name}}</a> 管理员,您好</span>
                </div>
                <div class="user-courses-items">
                    <a v-for="course in courses" :key="course.id" :href="'/course/'+course.id+'/Homepage'" class="carousel-right-course">{{course.name}}</a>
                </div>
                <div class="carousel-right-enter-div">
                    <a :href="'/user/Homepage?tabName=learningCourse'" class="carousel-right-enter">我的课程</a>
                </div>
            </el-col>
        </el-col>
    </el-col>
</template>

<script>
    import analyze from './../../../plugins/rgbaster'
    export default {
        name: "carousel",
        data(){
            return {
                ImgMaincolors:[],
                user:'',
            }
        },
        props:['courses'],
        created(){
            this.user = this.$store.getters.getStorge?this.$store.getters.getStorge.user:null
        },
        mounted(){
            this.getImgMainCol();
        },
        methods:{
            changeImg(index){
                document.querySelector('.carousel-right').style.backgroundColor = this.ImgMaincolors[index]
            },
            async getImgMainCol(){
                let mainImgs = document.querySelectorAll(".main-img");
                console.log(1)
                for(let img of mainImgs){
                    console.log(img.src);
                    let result = await analyze(img.src,{ ignore: [ 'rgb(255,255,255)', 'rgb(0,0,0)' ] })
                    this.ImgMaincolors.push(result[0].color)
                }
                console.log(this.ImgMaincolors)
            }
        }
    }
</script>

<style scoped>

    .carousel-right-username{
        font-weight: bolder;
        text-decoration: none;
        color: #000;
    }
    .user-courses-text{
        margin-top: 1rem;
    }
    .carousel-right{
        height: 25rem;
    }
    .user-courses-img{
        margin-top: 2rem;
        width: 4rem;
        height: 4rem;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;
    }
    .user-courses{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(245,245,245,0.7);
        margin-top: 3rem;
        height: 19rem;
        -webkit-transition: background-color 0.5s ease-in-out;
        -moz-transition: background-color 0.5s ease-in-out;
        -o-transition: background-color 0.5s ease-in-out;
        transition: background-color 0.5s ease-in-out;
    }
    .type-collect{
        padding-top: 0.5rem;
        clear: both;
        display: flex;
        height: 25rem;
        flex-direction: column;
        font-size: 1.5rem;
        opacity: 0.8;
        color: #fff;
        background-color: black;
    }
    .type{
        height: 3rem;
        width: 100%;
        text-align: left;
        padding-left: 4rem;
    }

    .type>a{
        width: 100%;
        text-decoration: none;
        color: #fff;
    }
    .user-courses-items>a{
        display: block;
        width: 100%;
        text-decoration: none;
        color: #000;
        margin-top: 5px;
    }
    .user-courses-items{
        width: 9rem;
        text-align: left;
        margin-top: 1rem;
        overflow: hidden;
    }
    .carousel-right-enter{
        font-size: 1.5rem;
        text-decoration: none;
        color: white;
        display: block;
    }
    .carousel-right-enter-div{
        width: 11rem;
        margin-top: 1rem;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: lawngreen;
    }
    .el-carousel__item{
        background-color:#ddd;
    }
    .carousel-container{
        margin-bottom: 3rem;
        margin-top: 2rem;
        padding-left: 2rem;
        border: 1px #ddd solid;
        border-radius: 1rem;
    }
    .carousel-collect{
        margin-left: -1rem;
    }
    .carousel-collect img{
        width: 100%;
        height: 100%;
        display: inline-block;
    }
</style>