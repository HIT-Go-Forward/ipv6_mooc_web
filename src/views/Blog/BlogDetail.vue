<template>
    <div class="blog-container">
        <div class="header">
            <span></span>
        </div>
        <div class="body"></div>
        <div class="tools"></div>
    </div>
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
        width: 100%;
    }
</style>