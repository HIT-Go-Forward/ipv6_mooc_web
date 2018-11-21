<template>
    <div class="home">
        <carousel/>
        <course-by-category class="course-by-category"/>
    </div>
</template>

<script>
    export default {
        name: 'home',
        components: {
            carousel: ()=>import('../components/homepage/carousel'),
            courseByCategory: ()=>import('../components/homepage/courseByCategory'),
        },
        created:function(){
            console.log(document.location)
            document.writeln(document.location)
        }
    }
</script>

<style scoped>

</style>
