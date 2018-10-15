<template>
    <div class="doneCourse">
        <course-card v-for="course in courseList" :key="course.id" :course="course"/>
    </div>
</template>

<script>
    export default {
        name: "done-course",
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