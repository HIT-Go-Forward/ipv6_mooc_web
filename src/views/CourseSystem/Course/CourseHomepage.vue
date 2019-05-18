<template>
    <div class="course-homepage">
        <div class="course-card">
            <el-row>
                <el-col :span="10">
                    <div class="course-img-div">
                        <img :src="'/media' + course.img" alt="" class="course-img">
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="course-info">
                        <div class="course-name">
                            <span>{{course.name}}</span>
                        </div>
                        <div class="course-intro">
                            <el-row>
                                <el-col :span="3">
                                    <span><strong>课程简介:</strong></span>
                                </el-col>
                                <el-col :span="21">
                                    <span v-if="course.brief">{{course.brief}}</span>
                                    <span v-else>未填写课程简介</span>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="course-user-number">
                            <span>已有{{course.userNum}}人参加该课程</span>
                        </div>
                        <div class="course-join">
                            <el-button v-if="hasJoinedCourse" class="join-button" plain type="primary" @click="joinCourse">立即加入</el-button>
                            <el-button v-if="user.type===2||user.id===course.teacher.id" class="join-button" plain type="primary" @click="enterCourse">进入课程</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-row class="course-bar">
            <el-col :span="18">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="course-detail">
                    <el-tab-pane label="课程详情" name="courseDetail">
                        <div class="course-info">
                            <div v-if="course.intro" class="info-item">
                                <div class="info-title"><i class="el-icon-setting"></i><span>课程概述</span></div>
                                <div class="info-main">
                                    <mavon-editor :toolbarsFlag="false" :value="course.intro" :subfield="false" :defaultOpen="'preview'"></mavon-editor>
                                </div>
                            </div>
                            <div v-if="course.needs" class="info-item">
                                <div class="info-title"><i class="el-icon-setting"></i><span>课程要求</span></div>
                                <mavon-editor class="info-main" :toolbarsFlag="false" :value="course.needs" :subfield="false" :defaultOpen="'preview'"></mavon-editor>
                            </div>
                            <div v-if="course.books" class="info-item">
                                <div class="info-title"><i class="el-icon-setting"></i><span>参考资料</span></div>
                                <mavon-editor class="info-main" :toolbarsFlag="false" :value="course.books" :subfield="false" :defaultOpen="'preview'"></mavon-editor>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="课程评论" name="courseComment">
                        <course-comment  :courseId="parseInt(this.$route.params.courseId)" commentType="course"/>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="6" class="course-teacher-div">
                <div class="course-teacher">
                    <div class="teacher-header">
                        <span>授课教师</span>
                    </div>
                    <div class="teacher-list">
                        <div class="teacher-info"  v-if="course.teacher!==undefined">
                            <el-row>
                                <el-col :span="8">
                                    <div v-if="course.teacher.img!==undefined" class="teacher-img">
                                        <img :src="'/media' + course.teacher.img" alt="">
                                    </div>
                                    <div v-else  class="teacher-img">
                                        <img src="../../../assets/image/avatar.jpg" alt="">
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="teacher-name">
                                        <span>{{course.teacher.name}}</span>
                                    </div>
                                    <div class="teacher-school">
                                        <span v-if="course.teacher.school">{{course.teacher.school.name}}</span>
                                        <span v-else>未填写学校</span>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import analyze from '../../../plugins/rgbaster'
    import axios from '../../../axiosIntercepter'
    import router from '../../../router'
    export default {
        name: "course-homepage",
        components:{
            courseComment: ()=>import('../../../components/common/Comment'),
        },
        data(){
            return{
                course: Object,
                user:"",
                hasJoinedCourse:false,
                activeName: 'courseDetail'
            }
        },
        watch:{
            course:function(val){
                if(val.img){
                    this.getImgCol(val.img);
                }
                if(val.id){
                    this.hasJoin();
                }
            }
        },
        created(){
            this.user = this.$store.getters.getStorge.user
            this.getCourse()
        },
        methods:{
            getCourse(){
                axios.get('/action/course/getCourseById.action', {
                    params: {
                        courseId: this.$route.params.courseId
                    }
                }).then(response => {
                        if (response.data.status === 403) {
                            this.$message.error(response.data.data);
                        }
                        else if (response.data.status === 200) {
                            this.course = response.data.data
                            this.createHistory()
                        }
                        else if (response.data.status === 500) {
                            this.$message.error('服务器出错')
                        }
                    })
                    .catch(error => {
                        this.$message.error('未连接到服务器');
                        console.log(error);
                    });
            },
            createHistory(){
                axios.get('/action/history/addNewHistory.action',{
                    params:{
                        courseId:this.$route.params.courseId
                    }
                }).then((res)=>{
                    console.log(res)
                })
            },
            changeBgColor(data){
                document.querySelector('.course-homepage').backgroundColor = data;
            },
            joinCourse(){
                axios.get("/action/course/joinCourse.action",{
                    params:{
                        courseId:this.course.id
                    }
                }).then((res)=>{
                    if(res.data==='success')
                        this.$message.success("你已经开始学习课程，请不要放弃哦")
                    else{
                        this.$message.error("学习失败？？？")
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.$message.error("应用出错或网络错误！")
                })
            },
            enterCourse(){
                router.push({path: `/course/${this.course.id}/learn`});
            },
            hasJoin(){
                console.log("course",this.course)
                axios.get('/action/course/hasJoined.action', {
                    params: {
                        courseId:this.course.id
                    }
                }).then((res)=>{
                    this.hasJoinedCourse = !(res.data === "success");
                }).catch((err)=>{
                    this.$message.error("项目出错或网络未连接")
                    console.log(err)
                })
            },
            async getImgCol(src){
                try {
                    let imgSrc ='/media' + src
                    console.log(imgSrc)
                    let imgCol = await analyze(imgSrc, {ignore: ['rgb(255,255,255)', 'rgb(0,0,0)']})
                    let arrColor = imgCol[0].color.slice(4, -1).split(',')
                    arrColor.forEach((item,index)=>{arrColor[index] = parseInt(item)})
                    while(arrColor[0]<200||arrColor[1]<200||arrColor[2]<200){
                        arrColor[0]+=15;arrColor[1]+=15;arrColor[2]+=15;
                    }
                    console.log(arrColor);
                    this.changeBgColor("rgb("+arrColor[0]+","+arrColor[1]+","+arrColor[2]+")")
                }catch (e) {
                    console.log(e)
                    this.changeBgColor("#fff")
                }
            },
            handleClick(tab){
                console.log(tab)
            }
        }
    }
</script>

<style scoped lang="less">
    .course-homepage{
    }
    .course-bar{
        margin-top: 40px;
    }
    .course-card{
        height: 20rem;
        padding-top: 1rem;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 0 10px #B09999;
    }
    .course-img{
        /* width: 100%; */
        height: 17rem;
    }
    .course-img-div{
        background-color:white;
        height: 17rem;
        width: 90%;
        margin: 20px;
        overflow: hidden;
    }
    .course-info{
        margin: 20px;
        min-height: 260px;
        text-align: left;
    }
    .course-name{
        margin-top: 10px;
        font-size: 150%;
    }
    .course-intro{
        padding: 8px;
        margin-top: 20px;
        min-height: 5rem;
        overflow: hidden;
        background-color: #fff;
    }
    .course-user-number{
        font-size: 90%;
        margin: 10px 0;
    }
    .join-button{
        width: 150px;
    }
    .course-detail{
        padding: 20px;
        margin-right: 20px;
        border-radius: 20px;
        box-shadow: 0 0 10px #B09999;
        background-color: #eee;
        min-height: 500px;
    }
    .course-detail:hover{
        box-shadow: 0 0 20px #B09999;
    }
    .course-teacher-div{
        .course-teacher{
            background-color: #eee;
            text-align: left;
            padding: 20px;
            border-radius: 20px 0 20px 20px;
            box-shadow: 0 0 10px #B09999;
        }
        .course-teacher:hover{
            box-shadow: 0 0 20px #B09999;
        }
        .teacher-header{
            padding: 0 0 10px;
            border-bottom: 1px solid #aaa;
            font-size: 15px;
        }
        .teacher-img{
            width: 60px;
            height: 60px;
        }
        img{
            width: 100%;
            border-radius: 100%;
            height: 100%;
        }
        .teacher-info{
            margin-top: 30px;
        }
        .teacher-name{
            margin-top: 10px;
        }
        .teacher-school{
            font-size: 90%;
        }
    }
    .course-info{
        text-align: left;
    }
    .info-item{
        margin: 20px 0;
    }
    .info-title{
        margin: 15px 0;
        font-size: 120%;
        font-weight: bold;
    }
    .info-main{
        font-size: 95%;
    }
</style>
