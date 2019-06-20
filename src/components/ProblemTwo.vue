<template>
  <div>
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
    <div>
      <div id="p3-title">
        <h1>Problem 3</h1>
      </div>
      <div id="p3-input">
        <label>
          <input v-model="source" placeholder="Source station">
        </label>
        <label>
          <input v-model="destination" placeholder="Destination station">
        </label>
        <button v-on:click="findPath">Route me!</button>
        <h3 v-if="path.length > 0"> {{ path }}</h3>
      </div>
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
      lineConnections: {},
      largestRoute: null,
      largestNumber: null,
      smallestRoute: null,
      smallestNumber: 999,
      multipleConnections: {},
      source: null,
      destination: null,
      path: []
    }
  },
  methods: {
    getInfo: function () {
      let self = this
      return axios.get('https://api-v3.mbta.com/routes?filter[type]=0,1')
        .then(function (response) {
          self.info = response.data.data
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

        let idAndName = {
          'id': lineId,
          'lineName': lineName
        }
        result.push(idAndName)
      })

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
      return new Promise((resolve, reject) => {
        let self = this
        let url = 'https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D='

        self.routes.forEach(function (route) {
          let id = _.get(route, 'id')
          let lineName = _.get(route, 'lineName')
          let urlWithRoute = url + id

          self.connectionHelp(urlWithRoute, self.stopsAndLines, lineName)
            .then(function () {
              self.multipleConnections = _.pickBy(self.stopsAndLines, function (lines, stop) {
                return lines.length > 1
              })
            })
        })
        setTimeout(() => resolve('done'), 1000)
      })
    },
    buildConnectionsMap: function () {
      let self = this

      // populate lineConnections with each line and an empty list
      self.routes.forEach(function (route) {
        let lineName = _.get(route, 'lineName')
        _.set(self.lineConnections, lineName, [])
      })

      // go through the stops that connect multiple lines and add those lines to each other's lists
      _.keys(self.multipleConnections).forEach(function (stop) {
        let lineList = _.get(self.multipleConnections, stop)

        lineList.forEach(function (lineName) {
          let connectionList = _.get(self.lineConnections, lineName)

          lineList.forEach(function (lineToAdd) {
            if (!connectionList.includes(lineToAdd)) {
              connectionList.push(lineToAdd)
            }
          })

          _.set(self.lineConnections, lineName, connectionList)
        })
      })
    },
    findPath: function () {
      let self = this
      // find the lines that each of the stations are on
      // see if they are on the same one, otherwise just pick something
      let source = _.get(self.stopsAndLines, self.source)
      let destination = _.get(self.stopsAndLines, self.destination)

      let linesInCommon = _.intersection(source, destination)

      if (linesInCommon.length > 0) {
        self.path = linesInCommon[0]
      } else {
        let currentPath = []
        let curLine = source[0]
        let destLine = destination[0]

        currentPath.push(curLine)

        // go through lines connected to curLine, see if we can get to destLine
        // if not, pick one we haven't been to and keep trying
        while (curLine !== destLine) {
          let connectionsToCurLine = _.get(self.lineConnections, curLine)

          if (connectionsToCurLine.includes(destLine)) {
            currentPath.push(destLine)
            curLine = destLine
          } else {
            let notYetVisited = _.difference(connectionsToCurLine, currentPath)
            curLine = notYetVisited[0]
            currentPath.push(curLine)
          }
        }

        self.path = currentPath
      }
    }
  },
  created () {
    let self = this
    self.getInfo()
      .then(function () {
        self.getRoutes()
      })
      .then(function () {
        self.analyzeRoutes()
      })
      .then(function () {
        self.findMultipleConnections()
          .then(function () {
            self.buildConnectionsMap()
          })
      })
  }
}
</script>

<style scoped>

</style>
