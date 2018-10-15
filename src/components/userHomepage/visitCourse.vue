<template>
    <div class="visitCourse">
        <el-table :data="courseList" stipe class="table" style="width: 100%;" @row-click="handleSelect">
            <el-table-column prop="name" label="课程名" width="200"> </el-table-column>
            <el-table-column prop="address" label="详情" width="400"> </el-table-column>
            <el-table-column prop="date" label="日期"> </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: "visit-course",
        data(){
            return{
                courseList: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods:{
            handleSelect(row){
                alert(row.name)
            }
        }
    }
</script>

<style scoped>
    .table{
        width: 100%;
    }
</style>