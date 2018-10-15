<template>
    <div>
        <div>
            <h1>还未处理的教师申请</h1>
            <el-table :data="unhandled" style="width: 100%;" height="250" max-height="400">
                <el-table-column prop="id" sortable label="标号" width="100"></el-table-column>
                <el-table-column prop="user.name" sortable label="申请者" width="100"></el-table-column>
                <el-table-column prop="note" sortable label="申请理由" width="300"></el-table-column>
                <el-table-column prop="time" sortable label="申请时间" width="200"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="access(scope.$index,scope.row.id)">通过</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="refuse(scope.$index,scope.row.id)">不通过</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="审核备注">
                    <template slot-scope="scope">
                        <el-input v-model="verify_note[scope.$index]"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <h1>已经处理完成的教师申请</h1>
            <el-table :data="handled" style="width: 100%" height="250" max-height="400">
                <el-table-column prop="id" sortable label="标号" width="100"></el-table-column>
                <el-table-column prop="user.name" sortable label="申请者" width="100"></el-table-column>
                <el-table-column prop="note" sortable label="申请理由" width="300"></el-table-column>
                <el-table-column prop="time" sortable label="申请时间" width="200"></el-table-column>
                <el-table-column prop="handler.name" sortable label="处理人" width="200"></el-table-column>
                <el-table-column prop="handleTime" sortable label="处理时间" width="200"></el-table-column>
                <el-table-column prop="handleNote" sortable label="审核备注"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "teacherAudit",
        props:["handled","unhandled"],
        data(){
            return {
                verify_note: []
            }
        },
        methods:{
            access(index,applyId){
                axios.get(this.$store.state.actionIP+'/apply/acceptTeacherApply.action',{
                    params:{
                        applyId:applyId,
                        note:this.verify_note[index]
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        this.$message.success("审核已通过！")
                        this.$emit('teacherAuditAll')
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("未连接到互联网！")
                    console.log(err)
                })
            },
            refuse(index,applyId){
                axios.get(this.$store.state.actionIP+'/apply/rejectTeacherApply.action',{
                    params:{
                        applyId:applyId,
                        note:this.verify_note[index]
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        this.$message.success("审核已拒绝！")
                        this.$emit("teacherAuditAll")
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("未连接到互联网！")
                    console.log(err)
                })
            }
        },
    }
</script>

<style scoped>

</style>