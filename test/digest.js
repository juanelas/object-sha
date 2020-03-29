'use strict'

// Every test file (you can create as many as you want) should start like this
// Please do NOT change any line between <NODEREQUIRES> and </NODEREQUIRES>
// Please, do NOT touch. They will be automatically removed for browser tests -->
const _pkg = require('../lib/index.node')
const chai = require('chai')
// <--

const inputs = {
  values: [
    {
      obj1: { src: 'A', dst: 'B', msg: 'hello' },
      obj2: { dst: 'B', src: 'A', msg: 'hello' }
    },
    {
      obj1: { src: 'A', dst: 'B', msg: 'goodbye!' },
      obj2: { dst: 'B', src: 'A', msg: 'goodbye!' }
    }
  ],
  algorithms: ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']
}

describe('testing function digest()', function () {
  for (const algorithm of inputs.algorithms) {
    for (const value of inputs.values) {
      describe(`digest(${JSON.stringify(value.obj1)}, ${algorithm}) === digest(${JSON.stringify(value.obj2)}, ${algorithm})`, function () {
        it('should be the same', async function () {
          const ret1 = await _pkg.digest(value.obj1, algorithm) // always call you package as _pkg
          const ret2 = await _pkg.digest(value.obj2, algorithm) // always call you package as _pkg
          console.log(`${ret1} === ${ret2}`)
          chai.expect(ret1).to.equal(ret2)
        })
      })
    }
  };
})
