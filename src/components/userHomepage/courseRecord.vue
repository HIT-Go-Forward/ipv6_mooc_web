<template>
    <div>
        <div class="applyingCourse">
            <h1>正在申请的课程</h1>
            <el-table :data="applying" stipe class="table" style="width: 100%;" height="400px" @row-click="handleSelect">
                <el-table-column prop="createDate" :formatter="timeFormat" label="创建时间" width="300"> </el-table-column>
                <el-table-column prop="name" label="课程名称" width="400"> </el-table-column>
                <el-table-column prop="type.name" label="类型"> </el-table-column>
            </el-table>
        </div>
        <div class="applyingCourse">
            <h1>已经通过的课程</h1>
            <el-table :data="released" stipe class="table" style="width: 100%;" height="400px" @row-click="handleSelect">
                <el-table-column prop="createDate" :formatter="timeFormat" label="创建时间" width="300"> </el-table-column>
                <el-table-column prop="name" label="课程名称" width="400"> </el-table-column>
                <el-table-column prop="type.name" label="类型"> </el-table-column>
            </el-table>
        </div>
        <div class="applyingCourse">
            <h1>被拒绝的课程</h1>
            <el-table :data="rejected" stipe class="table" style="width: 100%;" height="400px" @row-click="handleSelect">
                <el-table-column prop="createDate" :formatter="timeFormat" label="创建时间" width="300"> </el-table-column>
                <el-table-column prop="name" label="课程名称" width="400"> </el-table-column>
                <el-table-column prop="type.name" label="类型"> </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import router from '../../router'
    export default {
        name: "releasedCourse",
        props:{
            released:Array,
            applying:Array,
            rejected:Array
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
                router.push('/course/'+row.id+'/learn');
            }
        }
    }
</script>

<style scoped>

</style>