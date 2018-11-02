<template>
    <el-row class="release-course-part">
        <el-col :span="16" :offset="6" class="release-course-container">
            <el-form ref="form" :model="form" label-width="6em">
                <el-form-item label="课程头像：">
                    <el-upload
                            action=""
                            ref="courseImgUpload"
                            :auto-upload="false"
                            class="upload-demo"
                            :before-upload="handlePost"
                            drag
                            :limit="1"
                            accept="image/*"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过2MB</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="课程名称：">
                    <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
                </el-form-item>
                <el-form-item label="课程简介：">
                    <el-input v-model="form.courseBrief" placeholder="请输入课程简介"></el-input>
                </el-form-item>
                <el-form-item label="课程介绍：">
                    <el-input type="textarea" :autosize="{ minRows: 4 }" v-model="form.courseIntro" placeholder="请输入课程介绍"></el-input>
                </el-form-item>
                <el-form-item label="课程要求：">
                    <el-input type="textarea" :autosize="{ minRows: 4 }" v-model="form.courseNeeds" placeholder="请输入课程要求"></el-input>
                </el-form-item>
                <el-form-item label="课程标签：">
                    <el-tag
                            :key="tag"
                            v-for="tag in label"
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
                <el-form-item label="课程分类：">
                    <template>
                        <el-select @change="changeCourse" placeholder="请选择大类" v-model="courseParentType" value="">
                            <el-option
                                    v-for="item in courseParentTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            >
                            </el-option>
                        </el-select>
                        <el-select
                                v-if="courseSonShow"
                                v-model="courseType"
                                collapse-tags
                                style="margin-left: 20px;"
                                placeholder="请选择具体分类" value="">
                            <el-option
                                    v-for="item in courseSonTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="提交备注：">
                    <el-input v-model="form.note" placeholder="这里可填写备注用于提交给管理员"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="courseReleaseSubmit">提交课程</el-button>
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
                    note: '',
                    courseBrief:'',
                    courseBook:'',
                    courseNeeds:'',
                    courseTypeId:''
                },
                inputVisible: false,
                label:[],
                inputValue: '',

                courseTypes:[],
                courseParentTypes: [],
                courseSonTypes: [],
                courseParentType:'',
                courseType: '',
                courseSonShow: false
            }
        },
        mounted:function(){
            this.getCourseType();
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
                        'courseBrief': this.form.courseBrief,
                        'courseBook': this.form.courseBook,
                        'courseNeeds': this.form.courseNeeds,
                        'courseType': this.courseType?this.courseType:this.courseParentType,
                        'note': this.form.note,
                        'label': this.label.join(';')
                    }
            }).then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        //router.push('course/courseEdit')
                        this.courseId=res.data.data
                        this.$message.success("课程提交审核成功！5秒后跳转到课程详情页面")
                        this.$refs.courseImgUpload.submit()
                        setTimeout(()=>{
                            router.push('/course/'+this.courseId+'/homepage')
                        },5000)
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("未连接到互联网！")
                    console.log(err)
                })
            },
            handleClose(tag) {
                this.label.splice(this.label.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.label.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            handlePost(file){
                const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('图片格式错误！可在课程编辑页面修改.');
                    return false
                }
                if (!isLt2M) {
                    this.$message.error('图片过大!可在课程编辑页面修改.');
                    return false
                }
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
                        setTimeout(()=>{
                            this.$message.success("图片上传成功!")
                        },1000)
                    } else {
                        this.$message.error("图片上传失败！")
                    }
                }).catch((err)=>{
                    this.$message.error("网络连接错误！")
                    console.log(err)
                })
                return false;
            },
            getCourseType(){
                axios.get(this.$store.state.actionIP+'/course/getAllCourseType.action').then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        this.courseTypes=res.data.data
                        for(let i=0;i<res.data.data.length;i++){
                            if (!res.data.data[i].parent){
                                this.courseParentTypes.push(res.data.data[i])
                            }
                        }
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("网络连接错误！")
                    console.log(err)
                })
            },
            changeCourse(){
                this.courseSonTypes = []
                this.courseType = ''
                for(let i=0;i<this.courseTypes.length;i++){
                    if(this.courseTypes[i].parent===this.courseParentType){
                        this.courseSonTypes.push(this.courseTypes[i])
                    }
                }
                this.courseSonShow = this.courseSonTypes.length > 0;
            }
        }
    }
</script>

<style scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .el-tag {
        background-color: white;
        font-size: 20px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    .button-new-tag {
        border-radius: 10px;
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
        font-size: 20px;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
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
    .el-upload__tip{
        margin-top: -1em;
    }

</style>