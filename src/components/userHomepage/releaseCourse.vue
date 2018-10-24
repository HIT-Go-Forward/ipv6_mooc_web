<template>
    <el-row class="release-course-part">
        <el-col :span="12" :offset="6" class="release-course-container">
            <el-form ref="form" :model="form" label-width="6em">
                <el-form-item label="课程头像：">
                    <el-upload
                            action=""
                            ref="courseImgUpload"
                            :auto-upload="false"
                            class="upload-demo"
                            :before-upload="handlePost"
                            drag
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="课程名称：">
                    <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
                </el-form-item>
                <el-form-item label="课程简介：">
                    <el-input v-model="form.courseIntro" placeholder="请输入课程简介"></el-input>
                </el-form-item>
                <el-form-item label="课程标签：">
                    <el-input v-model="form.label" placeholder="请输入课程标签，以分号隔开"></el-input>
                </el-form-item>
                <el-form-item label="提交备注：">
                    <el-input v-model="form.note" placeholder="这里可填写用于提交于管理员"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="courseReleaseSubmit">立即创建</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import axios from 'axios'
    import router from "../../router";
    export default {
        name: "release-course",
        data(){
            return {
                courseId:'',
                form:{
                    courseName:'',
                    courseIntro:'',
                    label:'',
                    note: ''
                }
            }
        },
        methods:{
            courseReleaseSubmit(){
                if(!this.form.courseName){
                    this.$message.error("请填写课程名称！")
                    return;
                }
                axios.get(this.$store.state.actionIP+"/course/addNewCourse.action",{
                    params: {
                        'courseName': this.form.courseName,
                        'courseIntro': this.form.courseIntro,
                        'note': this.form.note,
                        'label': this.form.label
                    }
            }).then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        //router.push('course/courseEdit')
                        this.courseId=res.data.data
                        this.$message.success("课程创建成功！")
                        this.$refs.courseImgUpload.submit();
                        this.$message.success("五秒后跳转到课程详情页面！")
                        setTimeout(()=>{
                            router.push('/course/'+this.courseId+'/homepage')
                        },5000)
                    } else {
                        this.$message.error("创建失败！")
                    }
                }).catch((err)=>{
                    this.$message.error("未连接到互联网！")
                    console.log(err)
                })
            },
            handlePost(file){
                let fd = new FormData()
                fd.append('file', file)
                fd.append('courseId',this.courseId)
                fd.append('type','courseImg')
                console.log(file)
                axios({
                    url: this.$store.state.actionIP+'/resource/upload.action',
                    method:'post',
                    data: fd
                }).then((res) => {
                    console.log(res)
                    if(res.data.status===200){
                        this.$message.success('上传成功')
                    } else {
                        this.$message.error("上传失败！")
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
    .release-course-part{
        padding: 3em 2em 3em 2em;
    }
    .release-course-container{
        padding: 3em 3em 3em 2em;
        border: 1px solid darkgrey;
        background-color: lightgrey;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 2px 2px 3px darkgray;
    }
</style>