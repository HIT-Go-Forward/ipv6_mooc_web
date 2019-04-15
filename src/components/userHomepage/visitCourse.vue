<template>
    <div class="visitCourse">
        <el-table :data="visitCourse" stipe class="table" style="width: 100%;" @row-click="handleSelect">
            <el-table-column prop="date" :formatter="timeFormat" label="时间" width="300"> </el-table-column>
            <el-table-column prop="courseName" label="课程" width="400"> </el-table-column>
            <el-table-column prop="intro" label="介绍"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from '../../axiosIntercepter'
    export default {
        name: "visit-course",
        data(){
            return{
            }
        },
        props:{
            visitCourse: Array
        },
        created(){
        },
        methods:{
            timeFormat(row, column) {
                let time = row[column.property];
                if(time===null){
                    return time;
                }else{
                    let date= new Date(Date.parse(time));
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let hour = date.getHours();
                    let minute = date.getMinutes();
                    month = month < 10 ? '0' + month : month;
                    day = day < 10 ? '0' + day : day;
                    hour = hour < 10 ? '0' + hour : hour;
                    minute = minute < 10 ? '0' + minute : minute;
                    return year + '-' + month + '-' + day + ' | ' + hour + ':' + minute;
                }
            },
            handleSelect(row){
                axios.get('/action/course/getCourseById.action', {
                    params: {
                        courseId: row.courseId
                    }
                })
                    .then(response => {
                        if (response.data.status === 403) {
                            this.$message.error(response.data.data);
                        }
                        else if (response.data.status === 200) {
                            //TODO
                            console.log(response.data.data)
                        }
                        else if (response.data.status === 500) {
                            this.$message.error('服务器出错')
                        }
                    })
                    .catch(error => {
                        this.$message.error('未连接到服务器');
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    .table{
        width: 100%;
    }
</style>