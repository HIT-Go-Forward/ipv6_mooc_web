<template>
    <div id="app">
        <navigation/>
        <div class="main" :style="width">
            <router-view v-if="isRouterAlive"/>
        </div>
        <span style="font-size:0;">1</span>
        <el-footer/>
    </div>
</template>

<script>
    import axios from './axiosIntercepter'
    export default {
        name: 'app',
        components: {
            navigation: () => import('./components/common/navigation/Navigation'),
            elFooter: () => import('./components/Homepage/Footer')
        },
        data(){
            return{
                width: {
                    width: window.innerWidth - 100 + 'px'
                },
                isRouterAlive:true,
            }
        },
        provide(){
            return {
                reload: this.reload,
                getCourse: this.getAllCourseType(),
            }
        },
        created(){
            window.addEventListener('resize', ()=>{
                this.width.width = window.innerWidth - 100 + 'px'
            })
            this.getAllCourseType();
            this.getLogin();
        },
        methods:{
            reload(){
                this.isRouterAlive = false;
                this.$nextTick(function(){
                    this.isRouterAlive = true;
                })
            },
            getLogin(){
                this.$store.state.IsLogin = !!(document.cookie.indexOf("token=") !== -1 && this.$store.getters.getStorge && this.$store.getters.getStorge.user);
            },
            getAllCourseType(){
                let categoryList = [];
                let tagList = [];
                axios.get('/action/course/getAllCourseType.action').then((res)=>{
                    if(res.data.status===200){
                        for(let i=0;i<res.data.data.length;i++){
                            if (!res.data.data[i].parent){
                                categoryList.push(res.data.data[i]);
                            }
                            else{
                                while(tagList.length<res.data.data[i].parent){
                                    tagList.push([]);
                                }
                                tagList[res.data.data[i].parent-1].push(res.data.data[i]);
                            }
                        }
                        this.$store.state.categoryList = categoryList;
                        this.$store.state.tagList = tagList;
                    }
                })
                return {categoryList:categoryList,tagList:tagList}
            }
        }
    }
</script>

<style>
    @import "less/index.less";
    #app {
        /* font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
                     "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif; */
        font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        min-width: 80%;
        font-size: 100%;
    }

    body {
        margin: 0;
        /* height: 100%; */
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

    .v-note-wrapper{
        min-height: 200px!important;
    }
    .comment-detail .v-note-wrapper{
        min-height: 10px!important;
    }
    .comment-content .v-show-content{
        padding: 0!important;
        background-color: #eee!important;
    }
    .comment-content .v-note-panel{
        box-shadow: none!important;
    }
    .comment-content .markdown-body{
        font-size: 14px;
    }
    .reply .markdown-body p{
        margin-bottom: 0!important;
    }
</style>
