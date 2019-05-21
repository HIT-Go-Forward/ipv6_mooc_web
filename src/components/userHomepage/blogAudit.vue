<template>
    <div class="blog-audit">
        <div class="blog" v-for="blog in blogs" :key="blog.id">
            <div class="blog-header">
                <span class="blog-name" @click="gotoBlog(blog.id)">{{blog.title}}</span>
                <span class="audit-text audit-msg">审核:</span>
                <span class="audit-text audit-pass" @click="pass(blog.id)">通过</span>
                <span class="audit-text audit-reject" @click="reject(blog.id)">不通过</span>
            </div><hr/>
            <div class="blog-content" @click="gotoBlog(blog.id)">
                <span class="blog-text">这里是从博客中抽取的最开始的部分文字用于简介{{blog.blog}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from './../../axiosIntercepter'
    import router from '../../router'
    export default {
        name: "blogAudit",
        props:['blogs'],
        created(){
        },
        methods:{
            pass(blogId){
                axios.get('/action/apply/handleBlogApplies.action',{
                    params:{
                        ids:[blogId],
                        operation:"accept"
                    }
                }).then((res)=>{
                    if(res.data.status===200){
                        this.$message.success("审核通过！")
                    }
                })
            },
            reject(blogId){
                axios.get('/action/apply/handleBlogApplies.action',{
                    params:{
                        ids:[blogId],
                        operation:"reject"
                    }
                }).then((res)=>{
                    if(res.data.status===200){
                        this.$message.error("审核不通过！")
                    }
                })
            },
            gotoBlog(blogId){
                router.push('/blog/'+blogId)
            }
        }
    }
</script>

<style scoped lang="less">
    .blog-audit{
        background-color: white;
        min-height: 500px;
        padding: 2rem;
        .blog{
            width: 60%;
            margin: 0 auto 2rem auto;
        }
    }
</style>