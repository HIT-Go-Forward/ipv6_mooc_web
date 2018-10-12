<template>
    <div id="app">
        <navigation/>
        <div class="main">
            <router-view/>
        </div>
        <el-footer/>
    </div>
</template>

<script>

export default {
    name: 'app',
    components: {
        navigation: ()=>import('./components/common/navigation/Navigation'),
        elFooter: ()=>import('./components/common/Footer')
    }
}
</script>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    body{
        margin: 0;
        /*background-color: #545c64;*/
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
    input[type="number"]{
      -moz-appearance: textfield;
    }
    .main{
        min-height: 600px;
    }
    .el-dialog__headerbtn{
        display: none;
    }
</style>
