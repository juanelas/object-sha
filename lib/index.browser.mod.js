// Use ES6 module syntax

/**
 * Return a string with a hexadecimal representation of the digest of the input object using a given hash algorithm.
 * It first creates an array of the object values ordered by the object keys (order in JS objects is not guaranteed);
 * then, it JSON.stringifie it; and finally it hashes it.
 *
 * @param {Object} obj - An obejct with pairs of key-value
 * @param {string} [algorithm = SHA-256]- For compatibility with browsers it should be 'SHA-1', 'SHA-256', 'SHA-384' and 'SHA-512'.
 *
 * @returns {Promise<string>} A promise that resolves to a string with hexadecimal content.
 */
async function digest (obj, algorithm = 'SHA-256') {
  const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']
  if (!algorithms.includes(algorithm)) {
    throw new RangeError(`Valid hash algorith values are any of ${JSON.stringify(algorithms)}`)
  }
  const encoder = new TextEncoder()
  const hashInput = encoder.encode(JSON.stringify(_objToArray(obj))).buffer
  let digest = ''
  /* eslint-disable no-lone-blocks */
  {
    const buf = await crypto.subtle.digest(algorithm, hashInput)
    const h = '0123456789abcdef';
    (new Uint8Array(buf)).forEach((v) => {
      digest += h[v >> 4] + h[v & 15]
    })
  }
  /* eslint-enable no-lone-blocks */
  return digest
}

// Returns an array with the obejct values ordered (alphabetically) by key
function _objToArray (obj) {
  const keys = Object.keys(obj)
  keys.sort()
  const arr = []
  for (const key of keys) {
    arr.push(obj[key])
  }
  return arr
}

export { digest }
