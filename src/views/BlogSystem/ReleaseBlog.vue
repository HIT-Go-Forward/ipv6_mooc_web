<template>
    <div class="blog-container">
        <div class="header-container">
            <div class="title-div">
                <el-input v-model="blogTitle" type="text" placeholder="输入文章标题" class="title"></el-input>
            </div>
            <div class="release-div">
                <el-button type="danger" class="release" @click="dialogVisible = true">发表文章</el-button>
            </div>
        </div>
        <div class="body">
            <mavon-editor class="editor" v-model="blogContent" @imgAdd="addImg" ref=editor></mavon-editor>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            class="release-dialog">
            <span class="release-title">发布文章</span>
            <el-form class="release-form">
                <el-form-item label="文章标签：">
                    <el-tag
                            :key="tag"
                            v-for="tag in blogLabel"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button
                            v-else
                            class="button-new-tag"
                            size="small"
                            @click="showInput">
                        + 标签
                    </el-button>
                </el-form-item>
                <span style="color: red;" v-show="labelErrorVisible">*标签不能重复</span>
                <el-form-item label="文章类型：">
                    <el-select v-model="blogKind" placeholder="请选择">
                        <el-option label="原创" value="original"></el-option>
                        <el-option label="转载" value="reprint"></el-option>
                        <el-option label="翻译" value="translate"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="博客分类：">
                    <el-select v-model="blogType" placeholder="请选择">
                        <el-option
                                v-for="tag in allBlogTypes"
                                :key="tag.id"
                                :label="tag.name"
                                :value="tag.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="私密文章：">
                    <el-radio-group v-model="blogPrivate">
                        <el-radio :label="false">公开</el-radio>
                        <el-radio :label="true">私密</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="draft()">保存为草稿</el-button>
                <el-button type="primary" @click="release()">发布文章</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from '../../axiosIntercepter'
    import router from './../../router'
    export default {
        name: "ReleaseBlog",
        data(){
            return{
                dialogVisible:false,
                blog:'',
                blogLabel:[],
                inputValue:'',
                inputVisible:'',
                labelErrorVisible:false,
                blogType:'',
                blogEdit:'',
                typeErrorVisible:false,
                blogContent:'',
                blogTitle:'',
                blogKind:'',
                blogPrivate:0,
                allBlogTypes:[],
            }
        },
        inject:["reload"],
        created(){
            this.labelErrorVisible = false;
            for(let tags of this.$store.state.tagList){
                this.allBlogTypes.push(...tags)
            }
            if(this.$route.params.blogId){
                this.blogEdit = true;
                this.getBlog();
            } else{
                this.blogType = 117;
                this.blogKind = 'original';
                this.blogPrivate = false;
            }
        },
        methods:{
            getBlog(){
                axios.get('/action/blog/viewBlogById.action',{
                    params:{
                        blogId:this.$route.params.blogId
                    }
                }).then((res)=>{
                    if(res.data.status === 200){
                        this.blogLabel = res.data.data.label?res.data.data.label.split(';'):[];
                        this.blogType = res.data.data.type?res.data.data.type:117;
                        this.blogTitle = res.data.data.title?res.data.data.title:'';
                        this.blogKind = res.data.data.kind?res.data.data.kind:'original';
                        this.blogContent = res.data.data.blog?res.data.data.blog:'';
                        this.blogPrivate = res.data.data.private?res.data.data.private:false;
                    }
                })
            },
            handleClose(tag) {
                this.blogLabel.splice(this.blogLabel.indexOf(tag), 1);
            },
            handleInputConfirm(){
                let inputValue = this.inputValue
                if(this.blogLabel.indexOf(inputValue)!==-1){
                    this.labelErrorVisible = true;
                    return;
                }else{
                    this.labelErrorVisible = false;
                }
                if (inputValue) {
                    this.blogLabel.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            draft(){
                axios.post("/action/blog/saveBlog.action",{
                    title:this.blogTitle,
                    blog:this.blogContent,
                    kind:this.blogKind,
                    type:this.blogType,
                    open:this.blogPrivate,
                    label:this.blogLabel.join(';'),
                    operation:"draft"
                }).then((res)=>{
                    if(res.data.status===200){
                        this.$message.success("保存成功！")
                        router.push("/blog/editblog/"+res.data.data)
                        this.reload();
                    } else{
                        this.$message.error(res.data.data)
                    }
                    this.reload()
                }).catch((err)=>{
                    console.log(err)
                })
            },
            release(){
                axios.post("/action/blog/saveBlog.action",{
                    title:this.blogTitle,
                    blog:this.blogContent,
                    kind:this.blogKind,
                    type:this.blogType,
                    open:this.blogPrivate,
                    label:this.blogLabel.join(';'),
                    operation:"release"
                }).then((res)=>{
                    if(res.data.status===200){
                        this.$message.success("发布成功！")
                        router.push("/blog/myblog")
                    } else{
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("网络错误！")
                    console.log(err)
                })
            },
            //删除没有
            addImg(pos, $file){
                var formdata = new FormData();
                formdata.append('image', $file);
                axios({
                    url: '/upload/resource/uploadBlogImg.action',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    // eslint-disable-next-line
                    $vm.$img2Url(pos, url);
                })
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
            top: 8rem;
            bottom: 2rem;
            left: 0;
            .editor{
                height: 100%;
                margin: 2rem 2rem 0 2rem;
            }
        }
        .release-dialog{
            text-align: left;
            .release-title{
                font-size: 1.5rem;
                font-weight: 600;
            }
            .release-form{
                .el-tag + .el-tag {
                    margin-left: 10px;
                }
                .el-tag {
                    background-color: white;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
                .button-new-tag {
                    border-radius: 10px;
                    margin-left: 10px;
                    height: 32px;
                    padding-top: 0;
                    padding-bottom: 0;
                }
                .input-new-tag {
                    width: 90px;
                    margin-left: 10px;
                    vertical-align: bottom;
                }
            }
        }
    }
</style>