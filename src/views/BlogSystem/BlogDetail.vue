<template>
    <el-col class="blog-container" :span="15" :offset="4">
        <div class="header">
            <span>{{blog.title}}</span>
        </div>
        <div class="blog-msg" v-if="blog.user">
                <img v-if="blog.user.img" :src="blog.user.img" class="blog-author-img">
                <img v-else src="./../../assets/image/avatar.png" class="blog-author-img">
                <span class="blog-user-name">{{blog.user.name}}</span><br/>
                <span class="blog-msg-date">发布时间：{{blog.uploadDate}} </span>
                <span class="blog-msg-word">字数：{{blog.word}} </span>
                <span class="blog-msg-readed">阅读：{{blog.readnum}} </span>
                <span class="blog-msg-comment">评论：{{blog.commentnum}} </span>
                <span class="blog-msg-like">喜欢：{{blog.like}}</span>
        </div>
        <div class="body">
            <mavon-editor :boxShadow="false" :toolbarsFlag="false" :value="blog.blog" :subfield="false" :defaultOpen="'preview'"></mavon-editor>
        </div>
        <div class="copyright">
            <span class="copyright-text">© 著作权归作者所有</span>
        </div>
        <div class="author">
            <div class="author-header">
                <img class="author-img" src="./../../assets/image/avatar.png">
                <div class="author-text">
                    <span class="author-name">李志琛</span>
                    <img class="author-img-male" src="./../../assets/image/male.png">
                    <img class="author-img-female" src="./../../assets/image/female.png">
                        <br/>
                    <span class="author-his">写了 492639 字，被 415442 人关注，获得了 53737 个喜欢</span>
                </div>
            </div>
            <hr width="90%"/>
            <div class="author-msg">
                <span class="author-msg-text">前500强企业营销策划，体验教育行业品牌经理，分享职场、成长与个人管理，已出版《撑过去，你终将成为更好的自己》 个人公众号：厦九九（xia991990) 微博@厦九九Joy</span>
            </div>
        </div>
        <div class="like">
            <a href="javascript:">
                <img class="like-png" src="./../../assets/image/before-like.png" v-show="like">
                <img class="like-png" src="./../../assets/image/after-like.png" v-show="!like">
                &nbsp;喜欢 | 236</a>
        </div>
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
        <div class="tools"></div>
    </el-col>
</template>

<script>
import axios from 'axios'
    export default {
        name: "BlogDetail",
        data(){
            return {
                blogId: '',
                blog: '',
                like: false,

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
        created(){
            this.getBlog();
            this.getComment();
            document.querySelector("#app").style.backgroundColor="#fff";
        },
        destroyed(){
            document.querySelector("#app").style.backgroundColor="#ddd";
        },
        methods:{
            getBlog(){
                this.blogId = this.$route.params.blogId;
                axios.get("/action/blog/getBlog.action",{
                    params:{
                        id:this.blogId,
                    }
                }).then((res)=>{
                    console.log(res.data.data)
                    this.blog = res.data.data
                })
                // axios.get("/action/blog/viewBlogById.action",{
                //     params:{
                //         blogId:'5cdc23dcd8cb515883ccc7e4'
                //     }
                // }).then((res)=>{
                //     console.log(res)
                //     // this.blog = res.data.data
                // })
            },
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

<style scoped lang="less">
    .blog-container{
        background-color: white;
        text-align: left;
        .header{
            margin: 20px 0 0 0;
            font-size: 3.7rem;
            font-weight: 700;
            line-height: 1.3;
        }
        .blog-msg{
            margin-top: 2rem;
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 2.5rem;
            .blog-author-img{
                border-radius: 50%;
                width: 5rem;
                height: 5rem;
                float:left;
                margin-right: 1rem;
            }
            .blog-author-name{
                font-size: 2rem;
                font-weight: 700;
            }
        }
        .body{
            margin-top: 3rem;
        }
        .copyright{
            height: 5rem;
            line-height: 5rem;
            .copyright-text{
                float:right;
                font-weight: 600;
                font-size: 1.2rem;
            }
        }
        .author{
            border: 1px solid #dddddd;
            border-radius: 5px;
            background-color: whitesmoke;
            /*height: 8rem;*/
            margin-bottom: 2rem;
            .author-header{
                padding: 1rem;
                .author-text{
                    .author-name{
                        line-height: 4rem;
                        padding-top: 1rem;
                        font-size: 2rem;
                        font-weight: 600;
                    }
                    .author-his{
                        line-height: 1rem;
                        color: #969696;
                        font-size: 1.2rem;
                    }
                    .author-img-male{
                        width: 2rem;
                    }
                    .author-img-female{
                        width: 2rem;
                    }
                }
                .author-img{
                    margin: 0.5rem 1rem 0.5rem 0.5rem;
                    border-radius: 50%;
                    width: 5rem;
                    height: 5rem;
                    float:left;
                }
            }
            .author-msg{
                font-size: 1.2rem;
                padding: 1rem 2rem 1rem 2rem;
                color: #969696;
            }
        }
        .like{
            a{
                text-decoration: none;
                color: #000;
            }
            margin: 2rem auto;
            font-size: 2rem;
            border: 2px red solid;
            width: 14rem;
            padding: 0.7rem;
            border-radius: 3rem;
            .like-png{
                width: 2rem;
            }
        }
    }
</style>