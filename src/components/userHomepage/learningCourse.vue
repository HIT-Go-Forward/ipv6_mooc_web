<template>
    <div class="learningCourse">
        <course-card v-for="course in courseList" :key="course.id" :course="course"/>
    </div>
</template>

<script>
    export default {
        name: "learning-course",
        components:{
            courseCard: ()=>import('./courseCard')
        },
        data(){
            return{
            }
        },
        props:{
            courseList: Array
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>