<template>
  <div>
    <div id="p1-title">
      <h1>Problem 1</h1>
    </div>
    <div id="p1-answer">
      <p>{{ lines }}</p>
      <p></p>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
const _ = require('lodash')

export default {
  name: 'ProblemOne',
  data () {
    return {
      lines: null
    }
  },
  mounted () {
    axios
      .get('https://api-v3.mbta.com/routes?filter[type]=0,1')
      .then(response => (this.lines = this.getLines(response.data.data)))
  },
  methods: {
    getLines: function (info) {
      console.log(info)
      let res = []
      info.forEach(function (el) {
        res.push(_.get(el, 'attributes.long_name'))
      })
      console.log(res)
      return res
    }
  }
}
</script>

<style scoped>

</style>
