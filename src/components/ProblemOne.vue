<template>
  <div>
    <div id="p1-title">
      <h1>Problem 1</h1>
    </div>
    <div id="p1-answer">
      <h3>{{ lines }}</h3>
      <p>
        I chose to use 'https://api-v3.mbta.com/routes?filter[type]=0,1' over 'https://api-v3.mbta.com/routes',
        since I think it's easier and safer to let the API do the filtering work between subway and non-subway routes.
      </p>
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
