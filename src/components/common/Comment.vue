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
                newCommon: '',
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