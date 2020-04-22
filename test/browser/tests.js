// Every test file (you can create as many as you want) should start like this
// Please do NOT change any line between <NODEREQUIRES> and </NODEREQUIRES>
// Please, do NOT touch. They will be automatically removed for browser tests -->


// <--

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
  algorithms: ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']
};

describe('testing function hashObject()', function () {
  for (const algorithm of inputs.algorithms) {
    for (const value of inputs.valuesEqual) {
      describe(`digest(${JSON.stringify(value.obj1)}, ${algorithm}) === digest(${JSON.stringify(value.obj2)}, ${algorithm})`, function () {
        it('should be the same', async function () {
          const ret1 = await _pkg.digest(value.obj1, algorithm); // always call you package as _pkg
          const ret2 = await _pkg.digest(value.obj2, algorithm); // always call you package as _pkg
          console.log(`${ret1} === ${ret2}`);
          chai.expect(ret1).to.equal(ret2);
        });
      });
    }
    for (const value of inputs.valuesDifferent) {
      describe(`digest(${JSON.stringify(value.obj1)}, ${algorithm}) === digest(${JSON.stringify(value.obj2)}, ${algorithm})`, function () {
        it('should be different', async function () {
          const ret1 = await _pkg.digest(value.obj1, algorithm); // always call you package as _pkg
          const ret2 = await _pkg.digest(value.obj2, algorithm); // always call you package as _pkg
          console.log(`${ret1} === ${ret2}`);
          chai.expect(ret1).to.not.equal(ret2);
        });
      });
    }
  }  describe('testing with invalid hash algorithm', function () {
    it('should throw RangeError', function () {
      chai.expect(() => _pkg.digest(inputs.valuesEqual[0].obj1, 'MD5')).to.throw(RangeError);
    });
  });
});

describe('testing function digest()', function () {
  for (const algorithm of inputs.algorithms) {
    for (const value of inputs.valuesEqual) {
      describe(`digest(${JSON.stringify(value.obj1)}, ${algorithm}) === digest(${JSON.stringify(value.obj2)}, ${algorithm})`, function () {
        it('should be the same', async function () {
          const ret1 = await _pkg.digest(value.obj1, algorithm); // always call you package as _pkg
          const ret2 = await _pkg.digest(value.obj2, algorithm); // always call you package as _pkg
          console.log(`${ret1} === ${ret2}`);
          chai.expect(ret1).to.equal(ret2);
        });
      });
    }
    for (const value of inputs.valuesDifferent) {
      describe(`digest(${JSON.stringify(value.obj1)}, ${algorithm}) === digest(${JSON.stringify(value.obj2)}, ${algorithm})`, function () {
        it('should be different', async function () {
          const ret1 = await _pkg.digest(value.obj1, algorithm); // always call you package as _pkg
          const ret2 = await _pkg.digest(value.obj2, algorithm); // always call you package as _pkg
          console.log(`${ret1} === ${ret2}`);
          chai.expect(ret1).to.not.equal(ret2);
        });
      });
    }
  }});
