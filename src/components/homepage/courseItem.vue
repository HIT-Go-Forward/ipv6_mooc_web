<template>
    <el-col :span="4">
        <el-card class="course-item" :body-style="{ padding: '0px'}" shadow="hover" @click.native="handleSelect(courseItem.id)">
            <div class="course-img">
                <img v-if="courseItem.img" :src="mediaIP + courseItem.img" alt="">
                <img v-else src="../../assets/image/courseDefault.jpg" alt="">
            </div>
            <div class="course-info">
                <div class="course-name">
                    <span>{{courseItem.name}}</span>
                </div>
                <div class="course-num">
                    <i class="el-icon-view">{{courseItem.userNum}}</i>
                </div>
            </div>
        </el-card>
    </el-col>

</template>

<script>
    import router from '../../router'
    export default {
        name: "course-item",
        props: {
            courseItem: {},
        },
        data() {
            return {
                mediaIP: this.$store.state.mediaIP,
            }
        },
        methods:{
            handleSelect(courseId){
                router.push({path: `/course/${courseId}/homepage`});
            }
        }
    }
</script>

<style scoped>
    img {
        height: 100%;
        width: 100%;
    }

    .course-img {
        height: 120px;
        width: 180px;
    }

    .course-info{
        text-align: left;
        margin: 0 4px;
        width: 90%;
        font-size: 13px;
    }
    .course-name{
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        color: #171717;
        font-weight: normal;
    }
    .course-item {
        background-color: #fff;
        height: 170px;
        width: 180px;
        margin: 10px 10px;
        cursor: pointer;
        box-shadow: 0 0 4px #B09999;
        border-radius: 10px;
    }
    .course-item:hover{

        box-shadow: 2px 2px 40px #B09999;
    }
    .course-num{
        margin-top: 5px;
        float: right;
    }
</style>