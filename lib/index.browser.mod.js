function isObject (val) {
  return (val != null) && (typeof val === 'object') && !(Array.isArray(val))
}

function objectToArraySortedByKey (obj) {
  if (!isObject(obj) && !Array.isArray(obj)) {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (Array.isArray(item) || isObject(item)) {
        return objectToArraySortedByKey(item)
      }
      return item
    })
  }
  // if it is an object convert to array and sort
  return Object.keys(obj)
    .sort()
    .map((key) => {
      return [key, objectToArraySortedByKey(obj[key])]
    })
}

/**
 * If the input object is not an Array, this function converts the object to an array, all the key-values to 2-arrays [key, value] and then sort the array by the keys. All the process is done recursively so objects inside objects or arrays are also ordered. Once the array is created the method returns the JSON.stringify() of the sorted array.
 *
 * @param {object} obj the object
 *
 * @returns {string} a JSON stringify of the created sorted array
 */
function hashable (obj) {
  return JSON.stringify(objectToArraySortedByKey(obj))
}

/**
 * Returns a string with a hexadecimal representation of the digest of the input object using a given hash algorithm.
 * It first creates an array of the object values ordered by the object keys (using hashable(obj));
 * then, it JSON.stringify-es it; and finally it hashes it.
 *
 * @param {Object} obj - An Object
 * @param {string} [algorithm = SHA-256] - For compatibility with browsers it should be 'SHA-1', 'SHA-256', 'SHA-384' and 'SHA-512'.
 *
 * @throws {RangeError} Invalid hash algorithm
 *
 * @returns {Promise<string>} A promise that resolves to a string with hexadecimal content.
 */
function digest (obj, algorithm = 'SHA-256') {
  const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']
  if (!algorithms.includes(algorithm)) {
    throw new RangeError(`Valid hash algorith values are any of ${JSON.stringify(algorithms)}`)
  }
  return (async function (obj, algorithm) {
    const encoder = new TextEncoder()
    const hashInput = encoder.encode(hashable(obj)).buffer
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
  })(obj, algorithm)
}

export { digest, hashable }
