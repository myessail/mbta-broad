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
      lines: null,
      info: null
    }
  },
  methods: {
    getLines: function () {
      let self = this
      return axios.get('https://api-v3.mbta.com/routes?filter[type]=0,1')
        .then(function (response) {
          self.info = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
          let res = []
          self.info.forEach(function (el) {
            res.push(_.get(el, 'attributes.long_name'))
          })
          self.lines = res
        })
    }
  },
  created () {
    this.getLines()
  }
}
</script>

<style scoped>

</style>
