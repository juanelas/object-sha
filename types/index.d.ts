/**
 * Returns a string with a hexadecimal representation of the digest of the input object using a given hash algorithm.
 * It first creates an array of the object values ordered by the object keys (using hashable(obj));
 * then, it JSON.stringify-es it; and finally it hashes it.
 *
 * @param {Object} obj - An Object
 * @param {string} [algorithm = SHA-256] - For compatibility with browsers it should be 'SHA-1', 'SHA-256', 'SHA-384' and 'SHA-512'.
 *
 * @returns {Promise<string>} A promise that resolves to a string with hexadecimal content.
 */
export function digest(obj: any, algorithm?: string): Promise<string>;
/**
 * If the input object is not an Array, this function converts the object to an array, all the key-values to 2-arrays [key, value] and then sort the array by the keys. All the process is done recursively so objects inside objects or arrays are also ordered. Once the array is created the method returns the JSON.stringify() of the sorted array.
 *
 * @param {object} obj the object
 *
 * @returns {string} a JSON stringify of the created sorted array
 */
export function hashable(obj: any): string;
