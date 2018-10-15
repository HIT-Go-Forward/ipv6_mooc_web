<template>
    <div>
        <course-card v-for="course in courses" :course="course"/>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "done-course",
        components:{
            courseCard: ()=>import('./courseCard')
        },
        data(){
            return{
                courses: [],
            }
        },
        created(){
            axios.get(this.$store.state.actionIP + '/course/getUserCourses.action', {
                params: {
                    type: 'learned'
                }
            })
                .then(response => {
                    if (response.data.status === 403) {
                        this.$message.error(response.data.data);
                    }
                    else if (response.data.status === 200) {
                        this.courses = response.data.data;
                        this.registerStatus = 2;
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
        methods:{

        }

    }
</script>

<style scoped>

</style>