<template>
  <div id="app">
    <ProblemOne></ProblemOne>
    <ProblemTwo></ProblemTwo>
  </div>
</template>

<script>
import ProblemOne from './components/ProblemOne.vue'
import ProblemTwo from './components/ProblemTwo'

export default {
  name: 'app',
  components: {
    ProblemTwo,
    ProblemOne
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
