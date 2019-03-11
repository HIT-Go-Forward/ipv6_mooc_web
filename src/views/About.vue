<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script scope>
  singleton = function(name){
    this.name = name;
  }
  singleton.prototype.getName = function(){
    alert(this.name)
  }
  singleton.getInstance = (function(){
    var instance;
    return function(name){
      if(!instance){
        instance = new singleton(name);
      }
    }
  })();

</script>
