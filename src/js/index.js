'use strict';
// Use ES6 module syntax

/**
 * Return a string with a hexadecimal representation of the digest of the input object using a given hash algorithm.
 * It first creates an array of the object values ordered by the object keys (order in JS objects is not guaranteed);
 * then, it JSON.stringify it; and finally it hashes it.
 * 
 * @param {Object} obj - An obejct with pairs of key-value
 * @param {string} algorithm - For compatibility with browsers it should be 'SHA-1', 'SHA-256', 'SHA-384' and 'SHA-512'.
 * 
 * @returns {Promise<string>} A promise that resolves to a string with hexadecimal content.
 */
export async function digest(obj, algorithm = 'SHA-256') {
    const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    if (!algorithms.includes(algorithm)) {
        throw new RangeError(`Valid hash algorith values are any of ${JSON.stringify(algorithms)}`);
    }
    const encoder = new TextEncoder();
    const hash_input = encoder.encode(JSON.stringify(_objToArray(obj))).buffer;
    let digest = '';
    if (process.browser) {
        const buf = await crypto.subtle.digest(algorithm, hash_input);
        const h = '0123456789abcdef';
        (new Uint8Array(buf)).forEach((v) => {
            digest += h[v >> 4] + h[v & 15];
        });
    } else {
        const node_alg = algorithm.toLowerCase().replace('-', '');
        digest = require('crypto').createHash(node_alg).update(Buffer.from(hash_input)).digest('hex');
    }
    return digest;
}

// Returns an array with the obejct values ordered (alphabetically) by key
function _objToArray(obj) {
    const keys = Object.keys(obj);
    keys.sort();
    const arr = [];
    for (const key of keys) {
        arr.push(obj[key]);
    }
    return arr;
}
