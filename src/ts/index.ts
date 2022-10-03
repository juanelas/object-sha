/**
 * My module description. Please update with your module data.
 *
 * @remarks
 * This module runs perfectly in node.js and browsers
 *
 * @packageDocumentation
 */

import hashable from './hashable'
export { default as hashable } from './hashable'

/**
  * Returns a string with a hexadecimal representation of the digest of the input object using a given hash algorithm.
  * It first creates an array of the object values ordered by the object keys (using hashable(obj));
  * then, it JSON.stringify-es it; and finally it hashes it.
  *
  * @param obj - An Object
  * @param algorithm - For compatibility with browsers it should be 'SHA-1', 'SHA-256', 'SHA-384' and 'SHA-512'.
  *
  * @throws {@link RangeError} if an invalid hash algorithm is selected.
  *
  * @returns a promise that resolves to a string with hexadecimal content.
  */
export function digest (obj: any, algorithm = 'SHA-256'): Promise<string> { // eslint-disable-line
  const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']
  if (!algorithms.includes(algorithm)) {
    throw RangeError(`Valid hash algorithm values are any of ${JSON.stringify(algorithms)}`)
  }
  return (async function (obj, algorithm) {
    const encoder = new TextEncoder()
    const hashInput = encoder.encode(hashable(obj)).buffer
    let digest = ''

    if (IS_BROWSER) {
      const buf = await crypto.subtle.digest(algorithm, hashInput)
      const h = '0123456789abcdef';
      (new Uint8Array(buf)).forEach((v) => {
        digest += h[v >> 4] + h[v & 15]
      })
    } else {
      const nodeAlg = algorithm.toLowerCase().replace('-', '')
      digest = (await import('crypto')).createHash(nodeAlg).update(Buffer.from(hashInput)).digest('hex') // eslint-disable-line
    }
    /* eslint-enable no-lone-blocks */
    return digest
  })(obj, algorithm)
}
