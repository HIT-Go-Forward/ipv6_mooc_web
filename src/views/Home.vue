<template>
  <div class="home">
  </div>
</template>

<script>
export default {
    name: 'home',
    components: {
        helloWorld: ()=>import('../components/HelloWorld')
    }
}
</script>

<style scoped>
</style>
