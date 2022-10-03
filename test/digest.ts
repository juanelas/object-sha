import * as objectSha from '#pkg'

describe('testing function digest()', function () {
  const inputs = {
    valuesEqual: [
      {
        obj1: { src: 'A', dst: 'B', msg: 'hello' },
        obj2: { dst: 'B', src: 'A', msg: 'hello' }
      },
      {
        obj1: { src: 'A', dst: 'B', msg: 'goodbye!' },
        obj2: { dst: 'B', src: 'A', msg: 'goodbye!' }
      },
      {
        obj1: { src: 'A', dst: 'B', msg: { hello: 'goodbye!', goodbye: 'hello!' } },
        obj2: { dst: 'B', src: 'A', msg: { goodbye: 'hello!', hello: 'goodbye!' } }
      },
      {
        obj1: { src: 'A', dst: 'B', msg: { hello: 'goodbye!', arr: [2, 9, { b: 5, a: 7 }] } },
        obj2: { dst: 'B', src: 'A', msg: { arr: [2, 9, { a: 7, b: 5 }], hello: 'goodbye!' } }
      }
    ],
    valuesDifferent: [
      {
        obj1: { src: 'A', dst: 'B', msg: 'hello' },
        obj2: { src: 'B', dst: 'A', msg: 'hello' }
      },
      {
        obj1: { src: 'A', dst: 'B', msg: 'goodbye!' },
        obj2: { src: 'B', dst: 'A', msg: 'goodbye!' }
      },
      {
        obj1: { src: 'A', dst: 'B', msg: { hello: 'goodbye!', goodbye: 'hello!' } },
        obj2: { dst: 'B', src: 'A', msg: { hello: 'hello!', goodbye: 'goodbye!' } }
      }
    ],
    algorithms: ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512', 'default']
  }

  for (const algorithm of inputs.algorithms) {
    for (const value of inputs.valuesEqual) {
      describe(`digest(${JSON.stringify(value.obj1)}, ${algorithm}) === digest(${JSON.stringify(value.obj2)}, ${algorithm})`, function () {
        it('should be the same', async function () {
          let ret1, ret2
          if (algorithm !== 'default') {
            ret1 = await objectSha.digest(value.obj1, algorithm)
            ret2 = await objectSha.digest(value.obj2, algorithm)
          } else {
            ret1 = await objectSha.digest(value.obj1)
            ret2 = await objectSha.digest(value.obj2)
          }
          // console.log(`${ret1} === ${ret2}`)
          chai.expect(ret1).to.equal(ret2)
        })
      })
    }
    for (const value of inputs.valuesDifferent) {
      describe(`digest(${JSON.stringify(value.obj1)}, ${algorithm}) === digest(${JSON.stringify(value.obj2)}, ${algorithm})`, function () {
        it('should be different', async function () {
          let ret1, ret2
          if (algorithm !== 'default') {
            ret1 = await objectSha.digest(value.obj1, algorithm)
            ret2 = await objectSha.digest(value.obj2, algorithm)
          } else {
            ret1 = await objectSha.digest(value.obj1)
            ret2 = await objectSha.digest(value.obj2)
          }
          // console.log(`${ret1} !== ${ret2}`)
          chai.expect(ret1).to.not.equal(ret2)
        })
      })
    }
  }

  describe('testing with invalid hash algorithm', function () {
    it('should throw RangeError', function () {
      // eslint-disable-next-line
      chai.expect(() => objectSha.digest(inputs.valuesEqual[0].obj1, 'MD5')).to.throw(RangeError)
    })
  })
})
