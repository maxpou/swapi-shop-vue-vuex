<template>
  <div id="app">
    <shop></shop>
    <selection></selection>
  </div>
</template>

<script>
import Shop from './components/Shop'
import Selection from './components/Selection'

export default {
  name: 'app',
  components: {
    Shop,
    Selection
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
  margin-top: 60px;
}
</style>
