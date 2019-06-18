<template>
  <div>
    <div id="p2-title">
      <h1>Problem 2</h1>
    </div>
    <div id="p2-part1-answer">
      <h3>Route with the most stops: {{ largestRoute }}</h3>
      <h3>Number of stops: {{ largestNumber }}</h3>
    </div>
    <div id="p2-part2-answer">
      <h3>Route with the fewest stops: {{ smallestRoute }}</h3>
      <h3>Number of stops: {{ smallestNumber }}</h3>
    </div>
    <div id="p2-part3-answer">
      <h3>Stops that connect 2 or more subway routes:</h3>
      <li v-for="(lines, station) in multipleConnections">
        {{ station }} - {{ lines }}
      </li>
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
      stopsAndLines: {},
      lines: null,
      largestRoute: null,
      largestNumber: null,
      smallestRoute: null,
      smallestNumber: 999,
      multipleConnections: null
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
        let lineName = _.get(element, 'attributes.long_name')

        console.log(lineId)
        console.log(lineName)

        let idAndName = {
          'id': lineId,
          'lineName': lineName
        }
        console.log(idAndName)
        result.push(idAndName)
      })

      console.log('ROUTES')
      console.log(result)
      self.routes = result
    },
    numStopsRoute: function (routeName) {
      let url = 'https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D='
      let urlWithRoute = url + routeName

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
        let id = _.get(route, 'id')
        let lineName = _.get(route, 'lineName')
        self.numStopsRoute(id)
          .then(function (numStops) {
            if (numStops > self.largestNumber) {
              self.largestNumber = numStops
              self.largestRoute = lineName
            }

            if (numStops < self.smallestNumber) {
              self.smallestNumber = numStops
              self.smallestRoute = lineName
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    },
    connectionHelp: function (urlWithRoute, stopsAndLines, lineName) {
      let self = this
      return axios.get(urlWithRoute)
        .then(function (response) {
          let stops = _.get(response, 'data.data')

          stops.forEach(function (stop) {
            let stopName = _.get(stop, 'attributes.name')
            let linesAtStop = _.get(stopsAndLines, stopName, [])
            linesAtStop = _.concat(linesAtStop, lineName)
            _.set(self.stopsAndLines, stopName, linesAtStop)
          })
        })
    },
    findMultipleConnections: function () {
      let self = this
      let url = 'https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D='

      self.routes.forEach(function (route) {
        let id = _.get(route, 'id')
        let lineName = _.get(route, 'lineName')
        console.log(lineName)
        let urlWithRoute = url + id

        console.log('before')
        self.connectionHelp(urlWithRoute, self.stopsAndLines, lineName)
          .then(function () {
            console.log('here')
            console.log(self.stopsAndLines)
            self.multipleConnections = _.pickBy(self.stopsAndLines, function (lines, stop) {
              console.log(lines)
              return lines.length > 1
            })
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
        self.findMultipleConnections()
      })
  }
}
</script>

<style scoped>

</style>
