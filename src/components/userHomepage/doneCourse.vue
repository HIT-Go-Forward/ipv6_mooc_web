<template>
    <div>
        <course-card v-for="course in courses" :course="course"/>

    </div>
</template>

<script>
    export default {
        name: "done-course",
        components:{
            courseCard: ()=>import('../common/courseCard')
        },
        data(){
            return{
                courses: ['战德臣','张岩'],
            }
        }

    }
</script>

<style scoped>

</style>