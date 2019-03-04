<template>
    <el-col :span="18" :offset="3" class="carousel-container">
        <el-col :span="5" class="type-collect">
            <div class="type"><a href="javascript:">计算机</a><hr/></div>
            <div class="type"><a href="javascript:">经济管理</a><hr/></div>
            <div class="type"><a href="javascript:">心理学</a><hr/></div>
            <div class="type"><a href="javascript:">外语</a><hr/></div>
            <div class="type"><a href="javascript:">文学历史</a><hr/></div>
            <div class="type"><a href="javascript:">艺术设计</a><hr/></div>
            <div class="type"><a href="javascript:">其他</a></div>
        </el-col>
        <el-col :span="16">
            <el-carousel trigger="click" class="carousel" height="20rem">
                <el-carousel-item>
                    <img src="./../../../assets/image/homePagePic1.png">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="./../../../assets/image/homePagePic2.jpg">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="./../../../assets/image/homePagePic3.png">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="./../../../assets/image/homePagePic4.jpg">
                </el-carousel-item>
            </el-carousel>
        </el-col>
    </el-col>
</template>

<script>
    export default {
        name: "slideTop"
    }
</script>

<style scoped>
    .type-collect{
        display: flex;
        height: 20rem;
        flex-direction: column;
        font-size: 1.5rem;
        align-items: center;
        justify-content: space-around;
        background-color: black;
        opacity: 0.7;
        color: #fff;
    }
    .type{
        height: 3rem;
        width: 100%;
        background-color: whitesmoke;
    }
    a{
        text-decoration: none;
        color: #000;
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
</style>