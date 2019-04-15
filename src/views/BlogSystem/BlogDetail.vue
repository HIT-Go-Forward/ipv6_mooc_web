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
        <div class="author">
            
        </div>
        <div class="comment">

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
                blogId:'',
                blog:'',
            }
        },
        created(){
            this.getBlog();
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
    }
</style>