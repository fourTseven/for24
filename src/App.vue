<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: #f5f5f5;
}

#app {
  max-width: 750px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
}

.main-content {
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  background: #f5f7fa;
}
</style>
