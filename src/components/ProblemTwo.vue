<template>
  <div>
    <div id="p2-title">
      <h1>Problem 2</h1>
    </div>
    <div id="p2-part1-answer">
      <h5>Route with the most stops: {{ largestRoute }}</h5>
      <h5>Number of stops: {{ largestNumber }}</h5>
    </div>
    <div id="p2-part2-answer">
      <h5>Route with the fewest stops: {{ smallestRoute }}</h5>
      <h5>Number of stops: {{ smallestNumber }}</h5>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
const _ = require('lodash')

export default {
  name: 'ProblemTwo',
  data () {
    return {
      info: null,
      routes: null,
      lines: null,
      largestRoute: null,
      largestNumber: null,
      smallestRoute: null,
      smallestNumber: 999
    }
  },
  methods: {
    getInfo: function () {
      let self = this
      return axios.get('https://api-v3.mbta.com/routes?filter[type]=0,1')
        .then(function (response) {
          self.info = response.data.data
          console.log(self.info)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getRoutes: function () {
      let self = this
      let result = []
      self.info.forEach(function (element) {
        let lineId = _.get(element, 'id')
        result.push(lineId)
      })

      self.routes = result
    },
    numStopsRoute: function (routeName) {
      let url = 'https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D='
      let urlWithRoute = url + routeName
      console.log(urlWithRoute)

      return axios.get(urlWithRoute)
        .then(function (response) {
          let stops = _.get(response, 'data.data')
          return stops.length
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    analyzeRoutes: function () {
      let self = this

      self.routes.forEach(function (route) {
        self.numStopsRoute(route)
          .then(function (numStops) {
            if (numStops > self.largestNumber) {
              self.largestNumber = numStops
              self.largestRoute = route
            }

            if (numStops < self.smallestNumber) {
              self.smallestNumber = numStops
              self.smallestRoute = route
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    }
  },
  created () {
    let self = this
    self.getInfo()
      .then(function () {
        self.getRoutes()
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {
        self.analyzeRoutes()
      })
  }
}
</script>

<style scoped>

</style>
