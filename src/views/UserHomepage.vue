<template>
    <div class="userHomepage">
        <user-info-card/>
        <user-homepage-bar/>
    </div>
</template>

<script>
    export default {
        name: "user-homepage",
        components:{
            userHomepageBar: ()=>import('../components/UserHomepageBar'),
            userInfoCard: ()=>import('../components/userInfoCard')
        }
    }
</script>

<style scoped>

</style>