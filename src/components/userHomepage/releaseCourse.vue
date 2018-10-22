<template>
    <el-row class="release-course-container">
        <el-col :span="16" :offset="4">
            <el-form ref="form" :model="form" label-width="4em">
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
                <el-form-item label="课程名称">
                    <el-input v-model="form.courseName"></el-input>
                </el-form-item>
                <el-form-item label="课程简介">
                    <el-input v-model="form.courseIntro"></el-input>
                </el-form-item>
                <el-form-item label="课程标签">
                    <el-input v-model="form.label"></el-input>
                </el-form-item>
                <el-form-item label="提交备注">
                    <el-input v-model="form.note"></el-input>
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
    // import router from './../../router'
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

</style>