<template>
    <div class="comment">
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
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "comment",
        data(){
            return{
                activeTab: "all",
                commentList: Object,
            }
        },
        props:{
            commentType: String,
            id: Number,
        },
        created(){
            this.getComment();
        },
        methods:{
            addComment(){

            },
            handleClick(){

            },
            getComment(){
                axios.get('/action/CommentAndBarrage/getComment.action', {
                    params:{
                        type: this.commentType,
                        lessonId: this.$route.params.lessonId,
                        courseId: this.$route.params.courseId,
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
    .comment{
        background-color: #eee;
        text-align: left;
        height: 400px;
        padding: 10px;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0 0 5px #B09999;
    }
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
</style>