<template>
    <div class="course-by-category">
        <div class="category-line">
            <div v-for="category in categoryList" class="category" :key="category.id">
                <span @click="handleClick(category.id)">{{category.name}}</span>
            </div>
            <div class="visit-all">
                <span>查看全部>></span>
            </div>
        </div>
        <div v-for="courseItem in courseItemList" :key="courseItem.id">
            <course-item :courseItem="courseItem"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "course-by-category",
        components:{
            courseItem: ()=>import('./courseItem'),
        },
        data(){
            return{
                courseItemList: [{id:'1',name:'数据库分析与设计红红',userNum:'1234'},{},{},{},{},{},{}],
                categoryList: [{name:'经济管理',id:'1'},{name:'工商管理',id:'2'},{name:'电子商务',id:'3'}],
            }
        },
        methods:{
            handleClick(id){
                //TODO 跳转对应类别课程
                console.log(id);
            }
        }
    }
</script>

<style scoped>
    .category{
        float: left;
        display: inline-block;
        margin: 15px 20px 10px 20px;
        cursor: pointer;
    }
    .category:hover{
        color: forestgreen;
        margin-top: 16px;
    }
    .course-by-category{
        margin: 0;
        padding: 20px;
        border-radius: 15px;
        height: 600px;
        background-color: #ccc;
        box-shadow: 0 0 10px #B09999;
    }
    .course-by-category:hover{
        box-shadow: 0 0 20px #B09999;
    }
    .category-line{
        display: block;
        height: 50px;
        border-bottom: 1px dashed #aaa;
    }
    .visit-all{
        float: right;
        display: inline-block;
        margin: 15px 20px 10px 20px;
        cursor: pointer;
    }
    .visit-all:hover{
        color: forestgreen;
        margin-top: 16px;
    }
</style>