<template>
    <div class="comment">
        <div class="add-common">
            <el-row>
                <mavon-editor :subfield="false" class="common-editor" v-model="newCommon" placeholder="请输入评论..." :toolbars="toolbars"/>
                <el-button type="primary" round size="medium" @click="addComment" class="add-button">发送评论</el-button>
            </el-row>
        </div>
        <div class="all-comment">
            <el-tabs v-model="activeTab" @tab-click="handleClick">
                <el-tab-pane label="全部评论" name="all">
                    <div v-for="comment in commentList" :key="comment.id">
                        <el-row class="comment-item">
                            <el-col :span="2">
                                <div class="avatar-part">
                                    <div v-if="comment.user.img">
                                        <img :src="'/media' + comment.user.img" alt="" class="avatar">
                                    </div>
                                    <div v-else>
                                        <img src="../../assets/image/avatar.png" alt="" class="avatar">
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="22" class="comment-detail">
                                <div class="comment-name">
                                    <p>{{comment.user.name}}</p>
                                </div>
                                <div class="comment-content">
                                    <mavon-editor v-model="comment.content" :toolbarsFlag="false" :subfield="false" defaultOpen="preview"/>
                                </div>
                                <div class="comment-time">
                                    <span v-if="commentType === 'lesson'">{{comment.date}}</span>
                                    <p v-else>{{comment.date}}</p>
                                    <el-button v-if="commentType === 'lesson'" :id="comment.id" type="text" size="mini" class="replay-button" @click="startReply">回复</el-button>
                                </div>
                                <div class="reply" v-if="commentType === 'lesson'">
                                    <div v-for="reply in replyList" :key="reply.id">
                                        <el-row  v-if="reply.under === comment.id">
                                            <el-col :span="24" class="reply-detail">
                                                <div class="reply-name">
                                                    <span>{{reply.user.name}}</span>
                                                    <span v-if="reply.commentId !== reply.under"> 回复 </span>
                                                    <span v-if="reply.commentId !== reply.under">{{reply.commentUser.name}}</span>
                                                </div>
                                                <div class="comment-content">
                                                    <mavon-editor v-model="reply.content" :toolbarsFlag="false" :subfield="false" defaultOpen="preview"/>
                                                </div>
                                                <div class="comment-time">
                                                    <span>{{reply.date}}</span>
                                                    <el-button :id="reply.id" type="text" size="mini" class="replay-button" @click="startReply">回复</el-button>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <div class="reply-comment" v-show="comment.replyShow">
                                    <mavon-editor :toolbarsFlag="false" :subfield="false" class="common-editor" v-model="replyCommon" placeholder="请输入回复..." :toolbars="toolbars"/>
                                    <el-button type="primary" round size="medium" @click="commentReply" class="add-button">回复</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import axios from '../../axiosIntercepter'
    // import Vue from 'vue'
    export default {
        name: "comment",
        // components:{
        //     commentReply: ()=>import('./commentReply'),
        // },
        data(){
            return{
                activeTab: "all",
                commentList: Array,
                replyList: Array,
                replyId: -1,            //回复一级id
                replyTarget: -1,        //回复对象id
                newCommon: '',
                replyCommon: '',
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: false, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: false, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                }
            }
        },
        props:{
            commentType: String,
            courseId: Number,
        },
        created(){
            this.getComment();
        },
        methods:{
            addComment(){
                let type = this.commentType==='lesson'?0:1;
                if(this.newCommon === ''){
                    this.$message.warning('评论不能为空！')
                }else{
                    axios.get('/action/CommentAndBarrage/sendComment.action', {
                        params:{
                            type: type,
                            lessonId: this.$route.params.lessonId,
                            courseId: this.courseId,
                            content: this.newCommon,
                        }})
                        .then((res)=>{
                            if(res.data.status===200){
                                this.$message.success('评论成功');
                                this.newCommon = '';
                                this.getComment();
                            } else {
                                this.$message.error(res.data.data)
                            }
                        }).catch((err)=>{
                        this.$message.error("网络连接错误！");
                        console.log(err)
                    })
                }

            },
            startReply(e){
                this.replyCommon = '';
                let id = e.target.parentNode.id;
                this.replyTarget = e.target.parentNode.id;
                for(let idx in this.replyList){
                    if(this.replyList[idx].id === parseInt(id)){
                        id = this.replyList[idx].under;
                        break;
                    }
                }
                if(this.replyId === -1){
                    for(let idx in this.commentList){
                        if(this.commentList[idx].id === parseInt(id)){
                            this.commentList[idx].replyShow = true;
                            break;
                        }
                    }
                    this.replyId = id;
                }else{
                    for(let idx in this.commentList){
                        if(this.commentList[idx].id === parseInt(this.replyId)){
                            this.commentList[idx].replyShow = false;
                            break;
                        }
                    }
                    if(this.replyId === id){
                        this.replyId = -1;
                    }else{
                        for(let idx in this.commentList){
                            if(this.commentList[idx].id === parseInt(id)){
                                this.commentList[idx].replyShow = true;
                                break;
                            }
                        }
                        this.replyId = id;
                    }
                }
            },
            commentReply(){
                if(this.replyCommon === ''){
                    this.$message.warning('回复不能为空！')
                }else{
                    axios.get('/action/CommentAndBarrage/sendComment.action', {
                        params:{
                            type: 2,
                            lessonId: this.$route.params.lessonId,
                            courseId: this.courseId,
                            commentId: this.replyTarget,
                            under: this.replyId,
                            content: this.replyCommon,
                        }})
                        .then((res)=>{
                            if(res.data.status===200){
                                this.$message.success('回复成功');
                                this.replyCommon = '';
                                this.getComment();
                            } else {
                                this.$message.error(res.data.data)
                            }
                        }).catch((err)=>{
                        this.$message.error("网络连接错误！");
                        console.log(err)
                    })
                }

            },
            handleClick(){
            },
            getComment(){
                axios.get('/action/CommentAndBarrage/getComment.action', {
                    params:{
                        type: this.commentType,
                        lessonId: this.$route.params.lessonId,
                        courseId: this.courseId,
                    }})
                    .then((res)=>{
                        if(res.data.status===200){
                            this.commentList = [];
                            this.replyList = [];
                            let comments = res.data.data;
                            for(let index in comments){
                                if(comments[index].commentId){
                                    let under = comments[index].under;
                                    if(under !== comments[index].commentId){
                                        for(let idx in this.commentList){
                                            if(this.commentList[idx].id === under){
                                                comments[index].commentUser = this.commentList[idx].user;
                                                break;
                                            }
                                        }
                                    }
                                    this.replyList.push(comments[index]);
                                } else{
                                    comments[index].replyShow = false;
                                    this.commentList.unshift(comments[index]);
                                }
                            }
                        } else {
                            this.$message.error(res.data.data)
                        }
                    }).catch((err)=>{
                    this.$message.error("网络连接错误！");
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .avatar{
        border-radius: 50%;
        width: 60px;
        float: right;
        margin: 15px 10px 0 0;
    }
    .replay-button{
        margin-left: 15px;
    }
    .comment-time{
        line-height: 4px;
        font-size: 14px;
        font-weight: 300;
    }
    .comment-item{
        margin: 10px;
    }
    .comment-name{
        line-height: 16px;
        font-size: 16px;
        font-weight: 600;
    }
    .reply-detail{
        border-top: 1px dashed #c0ccda;
        padding: 5px 0 0;
    }
    .reply-name{
        line-height: 14px;
        font-size: 14px;
        font-weight: 600;
    }
    .comment-content{
        font-weight: 400;
    }
    .comment-detail{
        padding: 0 0 20px;
        border-bottom: 1px solid #c0ccda;
    }
    .comment{
        background-color: #eee;
        text-align: left;
        min-height: 400px;
        padding: 10px;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0 0 5px #B09999;
    }
    .all-comment{
        margin: 10px;
    }
    .add-button{
        margin: 10px 10px 0;
        float: right;
    }
    .common-editor{
        margin: 10px 10px 0;
        border-radius: 0 10px 10px 10px;
        overflow: hidden;
        box-shadow: 0 0 5px #B09999;
    }

</style>