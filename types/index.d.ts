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
export function digest(obj: any, algorithm?: string): Promise<string>;
