<template>
    <div class="blog-container">
        <div class="header-container">
            <div class="title-div">
                <el-input type="text" placeholder="输入文章标题" class="title"></el-input>
            </div>
            <div class="release-div">
                <el-button type="danger" class="release">发表文章</el-button>
            </div>
            <div class="menu-div">
                <img src="./../../assets/image/avatar.jpg" class="menu">
            </div>
        </div>
        <div class="body">
            <mavon-editor class="editor"></mavon-editor>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ReleaseBlog",
        data(){
            return{
                dialogVisible:false,
            }
        },
        created(){
            if(this.$route.params.blogId){
                this.blogEdit = true;
                this.getBlog();
            }
        },
        methods:{
            getBlog(){

            }
        }
    }
</script>

<style scoped lang="less">
    .blog-container{
        .header-container{
            display: flex;
            align-items: center;
            justify-content: center;
            .title-div{
                width: 90%;
                margin-right: 2rem;
            }
            .release-div{
                margin-right: 1rem;
            }
            .menu-div{
                .menu{
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                }
            }
        }
        .body{
            margin-top: 1rem;
            width: 100%;
            position: absolute;
            height: 100%;
            top: 8rem;
            bottom: 2rem;
            left: 0;
            .editor{
                height: 100%;
                margin: 2rem 2rem 0 2rem;
            }
        }
    }
</style>