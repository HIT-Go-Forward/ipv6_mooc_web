<template>
    <div class="course-by-category">
        <div class="category-line">
            <div v-for="category in categoryList" class="category">
                <span @click="handleClick(category.id)">{{category.name}}</span>
            </div>
        </div>
        <div v-for="courseItem in courseItemList">
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
                courseItemList: [],
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
        margin: 15px 20px;
    }
    .category:hover{
        cursor: pointer;
    }
    .course-by-category{
        height: 600px;
        background-color: #ccc;
    }
    .category-line{
    }
</style>