<template>
    <div id="app">
        <navigation/>
        <div class="main" :style="width">
            <router-view/>
        </div>
        <el-footer/>
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {
            navigation: () => import('./components/common/navigation/Navigation'),
            elFooter: () => import('./components/common/Footer')
        },
        data(){
            return{
                width: {
                    width: window.innerWidth - 100 + 'px'
                }
            }
        },
        created(){
            window.addEventListener('resize', ()=>{
                this.width.width = window.innerWidth - 100 + 'px'
            })
        }
    }
</script>

<style>
    #app {
        font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
                     "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #ddd;
        min-width: 80%;
    }

    body {
        margin: 0;
        /*background-color: #545c64;*/
    }

    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    .main {
        margin-right: auto;
        margin-left: auto;
        min-height: 900px;
        min-width: 1200px;
    }

    .avatar-upload .el-upload-dragger{
        height: 200px;
        width: 200px;
        margin: 0 auto;
    }

    .el-collapse-item__content{
        padding-bottom: 5px !important;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .course-by-category .el-tabs__item:nth-child(2){
        font-size: 150%;
    }

    .course-by-category #tab-click-for-more{

    }
</style>
