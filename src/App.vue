<template>
  <div id="app">
    <!-- <h1>City Information Search</h1> -->
    <router-view></router-view> <!-- 用于路由渲染不同页面 -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
