import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import moxios from 'moxios'
import ProblemTwo from '@/components/ProblemTwo.vue'
import _ from 'lodash'

const redLine = require('./redLine.json')
const blueLine = require('./blueLine.json')
const orangeLine = require('./orangeLine.json')
const greenB = require('./greenB.json')
const greenC = require('./greenC.json')
const greenD = require('./greenD.json')
const greenE = require('./greenE.json')
const mattapan = require('./mattapan.json')

const infoData = {
  'data': [{
    'attributes': {
      'color': 'DA291C',
      'description': 'Rapid Transit',
      'direction_destinations': ['Ashmont/Braintree', 'Alewife'],
      'direction_names': ['South', 'North'],
      'fare_class': 'Rapid Transit',
      'long_name': 'Red Line',
      'short_name': '',
      'sort_order': 10010,
      'text_color': 'FFFFFF',
      'type': 1
    },
    'id': 'Red',
    'links': { 'self': '/routes/Red' },
    'relationships': { 'line': { 'data': { 'id': 'line-Red', 'type': 'line' } }, 'route_patterns': {} },
    'type': 'route'
  }, {
    'attributes': {
      'color': 'DA291C',
      'description': 'Rapid Transit',
      'direction_destinations': ['Mattapan', 'Ashmont'],
      'direction_names': ['Outbound', 'Inbound'],
      'fare_class': 'Rapid Transit',
      'long_name': 'Mattapan Trolley',
      'short_name': '',
      'sort_order': 10011,
      'text_color': 'FFFFFF',
      'type': 0
    },
    'id': 'Mattapan',
    'links': { 'self': '/routes/Mattapan' },
    'relationships': { 'line': { 'data': { 'id': 'line-Mattapan', 'type': 'line' } }, 'route_patterns': {} },
    'type': 'route'
  }, {
    'attributes': {
      'color': 'ED8B00',
      'description': 'Rapid Transit',
      'direction_destinations': ['Forest Hills', 'Oak Grove'],
      'direction_names': ['South', 'North'],
      'fare_class': 'Rapid Transit',
      'long_name': 'Orange Line',
      'short_name': '',
      'sort_order': 10020,
      'text_color': 'FFFFFF',
      'type': 1
    },
    'id': 'Orange',
    'links': { 'self': '/routes/Orange' },
    'relationships': { 'line': { 'data': { 'id': 'line-Orange', 'type': 'line' } }, 'route_patterns': {} },
    'type': 'route'
  }, {
    'attributes': {
      'color': '00843D',
      'description': 'Rapid Transit',
      'direction_destinations': ['Boston College', 'Park Street'],
      'direction_names': ['West', 'East'],
      'fare_class': 'Rapid Transit',
      'long_name': 'Green Line B',
      'short_name': 'B',
      'sort_order': 10032,
      'text_color': 'FFFFFF',
      'type': 0
    },
    'id': 'Green-B',
    'links': { 'self': '/routes/Green-B' },
    'relationships': { 'line': { 'data': { 'id': 'line-Green', 'type': 'line' } }, 'route_patterns': {} },
    'type': 'route'
  }, {
    'attributes': {
      'color': '00843D',
      'description': 'Rapid Transit',
      'direction_destinations': ['Cleveland Circle', 'North Station'],
      'direction_names': ['West', 'East'],
      'fare_class': 'Rapid Transit',
      'long_name': 'Green Line C',
      'short_name': 'C',
      'sort_order': 10033,
      'text_color': 'FFFFFF',
      'type': 0
    },
    'id': 'Green-C',
    'links': { 'self': '/routes/Green-C' },
    'relationships': { 'line': { 'data': { 'id': 'line-Green', 'type': 'line' } }, 'route_patterns': {} },
    'type': 'route'
  }, {
    'attributes': {
      'color': '00843D',
      'description': 'Rapid Transit',
      'direction_destinations': ['Riverside', 'Government Center'],
      'direction_names': ['West', 'East'],
      'fare_class': 'Rapid Transit',
      'long_name': 'Green Line D',
      'short_name': 'D',
      'sort_order': 10034,
      'text_color': 'FFFFFF',
      'type': 0
    },
    'id': 'Green-D',
    'links': { 'self': '/routes/Green-D' },
    'relationships': { 'line': { 'data': { 'id': 'line-Green', 'type': 'line' } }, 'route_patterns': {} },
    'type': 'route'
  }, {
    'attributes': {
      'color': '00843D',
      'description': 'Rapid Transit',
      'direction_destinations': ['Heath Street', 'Lechmere'],
      'direction_names': ['West', 'East'],
      'fare_class': 'Rapid Transit',
      'long_name': 'Green Line E',
      'short_name': 'E',
      'sort_order': 10035,
      'text_color': 'FFFFFF',
      'type': 0
    },
    'id': 'Green-E',
    'links': { 'self': '/routes/Green-E' },
    'relationships': { 'line': { 'data': { 'id': 'line-Green', 'type': 'line' } }, 'route_patterns': {} },
    'type': 'route'
  }, {
    'attributes': {
      'color': '003DA5',
      'description': 'Rapid Transit',
      'direction_destinations': ['Bowdoin', 'Wonderland'],
      'direction_names': ['West', 'East'],
      'fare_class': 'Rapid Transit',
      'long_name': 'Blue Line',
      'short_name': '',
      'sort_order': 10040,
      'text_color': 'FFFFFF',
      'type': 1
    },
    'id': 'Blue',
    'links': { 'self': '/routes/Blue' },
    'relationships': { 'line': { 'data': { 'id': 'line-Blue', 'type': 'line' } }, 'route_patterns': {} },
    'type': 'route'
  }],
  'jsonapi': { 'version': '1.0' }
}

const testRoutes = [
  {
    'id': 'Red',
    'lineName': 'Red Line'
  },
  {
    'id': 'Mattapan',
    'lineName': 'Mattapan Trolley'
  },
  {
    'id': 'Orange',
    'lineName': 'Orange Line'
  },
  {
    'id': 'Green-B',
    'lineName': 'Green Line B'
  },
  {
    'id': 'Green-C',
    'lineName': 'Green Line C'
  },
  {
    'id': 'Green-D',
    'lineName': 'Green Line D'
  },
  {
    'id': 'Green-E',
    'lineName': 'Green Line E'
  },
  {
    'id': 'Blue',
    'lineName': 'Blue Line'
  }
]

const dummyRedStops = {
  'data': [
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    }
  ]
}

const dummyOrangeStops = {
  'data': [
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    }
  ]
}

const dummyGreenStops = {
  'data': [
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    }
  ]
}

const dummyBlueStops = {
  'data': [
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    },
    {
      'blah': 'blah'
    }
  ]
}

describe('ProblemTwo', function () {
  beforeEach(() => {
    moxios.install()

    moxios.stubRequest('https://api-v3.mbta.com/routes?filter[type]=0,1', {
      status: 200,
      responseText: infoData
    })
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should populate info', function () {
    let wrapper = mount(ProblemTwo)
    expect(wrapper.vm.$data.lines).to.eq(null)
    return wrapper.vm.getInfo()
      .then(function () {
        let expectedInfo = _.get(infoData, 'data')
        expect(wrapper.vm.$data.info).to.deep.equal(expectedInfo)
      })
  })

  it('should populate routes', function () {
    let wrapper = mount(ProblemTwo)
    expect(wrapper.vm.$data.lines).to.eq(null)
    expect(wrapper.vm.$data.routes).to.eq(null)

    return wrapper.vm.getInfo()
      .then(function () {
        wrapper.vm.getRoutes()

        expect(wrapper.vm.$data.routes).to.have.length(8)
        expect(wrapper.vm.$data.routes).to.deep.equal(testRoutes)
      })
  })

  it('should find the correct longest/shortest lines and their lengths', function () {
    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Red', {
      status: 200,
      responseText: dummyRedStops
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Blue', {
      status: 200,
      responseText: dummyBlueStops
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Orange', {
      status: 200,
      responseText: dummyOrangeStops
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Green-E', {
      status: 200,
      responseText: dummyGreenStops
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Green-D', {
      status: 200,
      responseText: dummyGreenStops
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Green-C', {
      status: 200,
      responseText: dummyGreenStops
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Green-B', {
      status: 200,
      responseText: dummyGreenStops
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Mattapan', {
      status: 200,
      responseText: dummyGreenStops
    })

    let wrapper = mount(ProblemTwo)
    return wrapper.vm.getInfo()
      .then(function () {
        wrapper.vm.getRoutes()
      })
      .then(function () {
        return new Promise(function (resolve) {
          wrapper.vm.analyzeRoutes()
          setTimeout(function () {
            resolve()
          }, 1000)
        })
          .then(function () {
            expect(wrapper.vm.$data.largestNumber).to.eq(6)
            expect(wrapper.vm.$data.largestRoute).to.eq('Red Line')

            expect(wrapper.vm.$data.smallestNumber).to.eq(4)
            expect(wrapper.vm.$data.smallestRoute).to.eq('Blue Line')
          })
      })
  })

  it('should find stops with multiple connections', function () {
    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Red', {
      status: 200,
      responseText: redLine
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Blue', {
      status: 200,
      responseText: blueLine
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Orange', {
      status: 200,
      responseText: orangeLine
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Green-E', {
      status: 200,
      responseText: greenE
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Green-D', {
      status: 200,
      responseText: greenD
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Green-C', {
      status: 200,
      responseText: greenC
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Green-B', {
      status: 200,
      responseText: greenB
    })

    moxios.stubRequest('https://api-v3.mbta.com/stops?include=route&filter%5Broute%5D=Mattapan', {
      status: 200,
      responseText: mattapan
    })

    let wrapper = mount(ProblemTwo)
    return wrapper.vm.getInfo()
      .then(function () {
        wrapper.vm.getRoutes()
      })
      .then(function () {
        return new Promise(function (resolve) {
          wrapper.vm.analyzeRoutes()
          setTimeout(function () {
            resolve()
          }, 1000)
        })
      })
  })
})
