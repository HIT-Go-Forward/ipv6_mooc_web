<template>
    <div class="carousel">
        <el-carousel type="card" height="200px">
            <el-carousel-item v-for="carousel in carouselList" :key="carousel">
                <h3>{{carousel}}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "carousel",
        data(){
            return{
                carouselList: [1,2,3,4,5,6],
            }
        }
    }
</script>

<style scoped>

</style>