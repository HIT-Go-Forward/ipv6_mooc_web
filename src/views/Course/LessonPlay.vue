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
        <el-row class="video">
            <el-col :span="20">
                播放器
            </el-col>
            <el-col :span="2">
            </el-col>
        </el-row>
        <el-row class="comment">
            <div class="add-comment">
                <el-row>
                    <el-col :span="20">
                        <el-input type="textarea" size="small" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入评论" class="comment-input"/>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="addComment" class="add-button">发送</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="all-comment">
                <el-tabs v-model="activeTab" @tab-click="handleClick">
                    <el-tab-pane label="全部评论" name="all">

                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "lesson-play",
        data(){
            return{
                activeTab: "all",
                lesson: Object,
                commentList: Object,
            }
        },
        created(){
            this.getLesson();
            this.getComment();
        },
        methods:{
            handleClick(){

            },
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
            getComment(){
                axios.get(this.$store.state.actionIP+'/CommentAndBarrage/getComment.action', {
                    params:{
                        type: "lesson",
                        lessonId: this.$route.params.lessonId,
                    }})
                    .then((res)=>{
                        if(res.data.status===200){
                            this.commentList = res.data.data;
                        } else {
                            this.$message.error(res.data.data)
                        }
                    }).catch((err)=>{
                    this.$message.error("网络连接错误！")
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .all-comment{
        margin: 10px;
    }
    .add-button{
        margin-top: 10px;
    }
    .comment-input{
        width: 95%;
        margin: 10px;
    }
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
    .comment{
        background-color: #eee;
        text-align: left;
        height: 400px;
        padding: 10px;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0 0 5px #B09999;
    }
    .video{
        background-color: #eee;
        text-align: left;
        height: 400px;
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