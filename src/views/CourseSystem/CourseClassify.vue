<template>
    <div class="course-classify">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrunmb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程分类</el-breadcrumb-item>
            <el-breadcrumb-item>{{categoryList[categoryId-1].name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row justify="center">
            <el-col :span="21" class="main-class">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane class="category" v-for="category in categoryList" :key="category.id" :label="category.name" :name="category.name">
                        <el-button
                                :data-id="tag.id"
                                @click="clickTag"
                                class="tag"
                                :type="tag.id === tagId?'success':'text'"
                                v-for="tag in tagList[categoryId]"
                                :key="tag.id">
                        {{tag.name}}
                        </el-button>
                    </el-tab-pane>
                </el-tabs>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import axios from '../../axiosIntercepter'
    export default {
        name: "course-classify",
        data() {
            return{
                categoryId : parseInt(this.$route.params.type),
                tagId: parseInt(this.$route.params.type),
                activeName: null
            }
        },
        computed: {
            ...mapState({
                categoryList : state => state.categoryList,
                tagList : state => state.tagList,
            })
        },
        mounted(){
            this.activeName = categoryList[this.$route.params.type].name
        },
        methods:{
            clickCategory: function(event){
                this.categoryId = event.currentTarget.dataset.id
            },
            handleClick: function (tab) {
                this.categoryId = tab.$vnode.data.key
            },
            getCourseByTag: function () {

            }
        }

    }
</script>

<style scoped>
    .category{
        font-size: 30px;
    }
    .breadcrunmb{
        margin: 0 0 20px 30px;
    }
    .categoryList{
        margin-left: 30px;
        text-align: left;
        height: 200px;
        padding: 20px 30px;
        background-color: #ccc;
    }

</style>