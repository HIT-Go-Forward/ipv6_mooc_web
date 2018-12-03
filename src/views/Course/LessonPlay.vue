<template>
    <div class="lesson-play">
        <el-row class="info">
            <div class="lesson-title">
                <span class="info-name">{{lesson.title}}</span>
                <span class="info-date">上传时间： {{lesson.createDate}}</span>
            </div>
            <div class="lesson-intro">
                <span>课件简介： {{lesson.intro}}</span>
            </div>
        </el-row>
        <div class="video">
            <d-player/>
        </div>
        <lesson-comment :id="lesson.id" commentType="lesson"/>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        components:{
            DPlayer: ()=>import('../../components/Course/lessonPlayer/DPlayer'),
            lessonComment: ()=>import('../../components/common/Comment'),
        },
        name: "lesson-play",
        data(){
            return{
                lesson: Object,
            }
        },
        created(){
            this.getLesson();
        },
        methods:{

            getLesson(){
                axios.get(this.$store.state.actionIP+'/course/getLessonById.action', {
                        params:{
                            lessonId: this.$route.params.lessonId,
                        }})
                    .then((res)=>{
                    if(res.data.status===200){
                        this.lesson = res.data.data;
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("网络连接错误！");
                    console.log(err)
                })
            },
        }
    }
</script>

<style scoped>

    .lesson-title{
        width: 90%;
        margin: 0 10px 10px;
    }
    .info-name{
        font-size: 18px;
        color: #171717;
    }
    .info-date{
        float: right;
        font-size: 13px;
    }
    .lesson-intro{
        border-top: 1px solid #999999;
        padding: 10px 5px 2px 2px;
        width: 90%;
        margin: 0 10px;
        font-size: 13px;
    }

    .video{
        background-color: #eee;
        text-align: left;
        height: 500px;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0 0 5px #B09999;
    }
    .info{
        background-color: #eee;
        text-align: left;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 0 10px 10px 10px;
        box-shadow: 0 0 5px #B09999;
    }
    .lesson-play{
        margin: 20px 150px;
    }
</style>