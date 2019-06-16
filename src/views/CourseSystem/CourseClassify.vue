<template>
    <div class="course-classify">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrunmb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程分类</el-breadcrumb-item>
            <el-breadcrumb-item>{{categoryList[categoryId-1].name}}</el-breadcrumb-item>
        </el-breadcrumb>
            <el-row justify="center">
                <el-col :span="24" class="main-class">
                    <div class="choose">
                        <el-tabs v-if="categoryList" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane class="category" v-for="category in categoryList" :key="category.id" :label="category.name" :name="category.name">
                                <el-button @click="clickTag" :data-id="category.id" class="tag" type="text">全部</el-button>
                                <el-button
                                        :data-id="tag.id"
                                        @click="clickTag"
                                        class="tag detail-tag"
                                        type="text"
                                        v-for="tag in tagList[categoryId-1]"
                                        :key="tag.id">
                                    {{tag.name}}
                                </el-button>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="courses">
                        <el-row>
                            <course-item  v-for="courseItem in courseItemList" :key="courseItem.id" :courseItem="courseItem"/>
                        </el-row>
                        <el-pagination
                                v-if="courseItemList"
                                background
                                @current-change="handleCurrentChange"
                                layout="prev, pager, next"
                                :page-size="pageSize"
                                :total="30">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>


    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import axios from '../../axiosIntercepter'
    export default {
        components: {
            courseItem: ()=>import('../../components/Homepage/courseItem'),
        },
        name: "course-classify",
        data() {
            return{
                categoryId : parseInt(this.$route.params.type),
                tagId: parseInt(this.$route.params.type),
                activeName: null,
                courseItemList: null,
                pageSize: 6,
            }
        },
        computed: {
            ...mapState({
                categoryList : state => state.categoryList,
                tagList : state => state.tagList,
            })
        },
        mounted(){
            // if(!this.categoryList){
            //     var interval = setInterval(() => {
            //         if(this.categoryList){
                        this.activeName = this.categoryList[this.$route.params.type-1].name
                        // clearInterval(interval)
                    // }
                // },1000)
            // }
        },
        methods:{
            // clickCategory: function(event){
            //     this.categoryId = event.currentTarget.dataset.id
            //     this.tagId = event.currentTarget.dataset.id
            // },
            handleClick: function (tab) {
                this.categoryId = tab.$vnode.data.key
                this.tagId = tab.$vnode.data.key
            },
            clickTag: function (e) {
                this.tagId = e.currentTarget.dataset.id
                this.getCourseByTag(1)
            },
            getCourseByTag: function (page) {
                axios.get('/action/course/getCourseByType.action',{
                    params:{
                        typeId: this.tagId,
                        start: (page-1)* this.pageSize,
                        length: page * this.pageSize,
                    }
                }).then((res)=>{
                    if(res.data.status===200){
                        this.courseItemList = res.data.data
                    }
                })
            },
            handleCurrentChange: function (val) {
                this.getCourseByTag(val)
            }
        }

    }
</script>

<style scoped>
    .category{
        font-size: 30px;
    }
    .breadcrunmb{
        margin: 0 0 30px 30px;
    }
    .detail-tag{
        margin-left: 30px;
    }
    .categoryList{
        margin-left: 30px;
        text-align: left;
        height: 200px;
        padding: 20px 30px;
        background-color: #ccc;
    }
    .tag{
        float: left;
    }
    .choose{
        margin-bottom: 40px;
        margin-left: 30px;
        padding: 20px;
        border-radius: 15px;
        height: 6rem;
        background-color: #eee;
        box-shadow: 0 0 10px #B09999;
    }
    .courses{
        margin-top: 40px;
        margin-bottom: 40px;
        margin-left: 30px;
        padding: 20px;
        border-radius: 15px;
        min-height: 18rem;
        background-color: #eee;
        box-shadow: 0 0 10px #B09999;
    }
    .breadcrunmb{
        margin-left: 40px;
    }

</style>