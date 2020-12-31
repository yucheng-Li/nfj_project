<template>

  <div id="app">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
      <router-view class="router-view"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>
<style>
html,body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
