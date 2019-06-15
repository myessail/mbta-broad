import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import moxios from 'moxios'
import ProblemOne from '@/components/ProblemOne.vue'

const testData = {
  'data': [{
    'attributes': {
      'long_name': 'Red Line'
    }
  }, {
    'attributes': {
      'long_name': 'Mattapan Trolley'
    }
  }, {
    'attributes': {
      'long_name': 'Orange Line'
    }
  }, {
    'attributes': {
      'long_name': 'Green Line B'
    }
  }, {
    'attributes': {
      'long_name': 'Green Line C'
    }
  }, {
    'attributes': {
      'long_name': 'Green Line D'
    }
  }, {
    'attributes': {
      'long_name': 'Green Line E'
    }
  }, {
    'attributes': {
      'long_name': 'Blue Line'
    }
  }]
}

describe('ProblemOne', function () {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should return the correct list of lines', function () {
    moxios.stubRequest('https://api-v3.mbta.com/routes?filter[type]=0,1', {
      status: 200,
      responseText: testData
    })

    const wrapper = mount(ProblemOne)

    expect(wrapper.vm.$data.lines).to.eq(null)
    wrapper.vm.getLines().then(() => {
      expect(wrapper.vm.$data.lines).to.not.equal(null)
      expect(wrapper.vm.$data.lines).to.have.length(8)
      expect(wrapper.vm.$data.lines).to.be.an('array')
    })
  })
})
