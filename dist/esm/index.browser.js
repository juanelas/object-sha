function isObject(val) {
    return (val != null) && (typeof val === 'object') && !(Array.isArray(val));
}
function objectToArraySortedByKey(obj) {
    if (!isObject(obj) && !Array.isArray(obj)) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => {
            if (Array.isArray(item) || isObject(item)) {
                return objectToArraySortedByKey(item);
            }
            return item;
        });
    }
    // if it is an object convert to array and sort
    return Object.keys(obj) // eslint-disable-line
        .sort()
        .map((key) => {
        return [key, objectToArraySortedByKey(obj[key])];
    });
}
/**
 * If the input object is not an Array, this function converts the object to an array, all the key-values to 2-arrays [key, value] and then sort the array by the keys. All the process is done recursively so objects inside objects or arrays are also ordered. Once the array is created the method returns the JSON.stringify() of the sorted array.
 *
 * @param {object} obj the object
 *
 * @returns {string} a JSON stringify of the created sorted array
 */
function hashable (obj) {
    return JSON.stringify(objectToArraySortedByKey(obj));
}

/**
 * My module description. Please update with your module data.
 *
 * @remarks
 * This module runs perfectly in node.js and browsers
 *
 * @packageDocumentation
 */
/**
  * Returns a string with a hexadecimal representation of the digest of the input object using a given hash algorithm.
  * It first creates an array of the object values ordered by the object keys (using hashable(obj));
  * then, it JSON.stringify-es it; and finally it hashes it.
  *
  * @param obj - An Object
  * @param algorithm - For compatibility with browsers it should be 'SHA-1', 'SHA-256', 'SHA-384' and 'SHA-512'.
  *
  * @throws {RangeError}
  * Thrown if an invalid hash algorithm is selected.
  *
  * @returns a promise that resolves to a string with hexadecimal content.
  */
function digest(obj, algorithm = 'SHA-256') {
    const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    if (!algorithms.includes(algorithm)) {
        throw RangeError(`Valid hash algorithm values are any of ${JSON.stringify(algorithms)}`);
    }
    return (async function (obj, algorithm) {
        const encoder = new TextEncoder();
        const hashInput = encoder.encode(hashable(obj)).buffer;
        let digest = '';
        {
            const buf = await crypto.subtle.digest(algorithm, hashInput);
            const h = '0123456789abcdef';
            (new Uint8Array(buf)).forEach((v) => {
                digest += h[v >> 4] + h[v & 15];
            });
        }
        /* eslint-enable no-lone-blocks */
        return digest;
    })(obj, algorithm);
}

export { digest, hashable };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnJvd3Nlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RzL2hhc2hhYmxlLnRzIiwiLi4vLi4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLFFBQVEsQ0FBRSxHQUFRO0lBQ3pCLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxNQUFNLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVFLENBQUM7QUFFRCxTQUFTLHdCQUF3QixDQUFFLEdBQVE7SUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDekMsT0FBTyxHQUFHLENBQUE7S0FDWDtJQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN0QixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJO1lBQ2xCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pDLE9BQU8sd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDdEM7WUFDRCxPQUFPLElBQUksQ0FBQTtTQUNaLENBQUMsQ0FBQTtLQUNIOztJQUVELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDcEIsSUFBSSxFQUFFO1NBQ04sR0FBRyxDQUFDLENBQUMsR0FBRztRQUNQLE9BQU8sQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNqRCxDQUFDLENBQUE7QUFDTixDQUFDO0FBRUQ7Ozs7Ozs7bUJBT3lCLEdBQVc7SUFDbEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEQ7O0FDakNBOzs7Ozs7OztBQVlBOzs7Ozs7Ozs7Ozs7O1NBYWdCLE1BQU0sQ0FBRSxHQUFRLEVBQUUsU0FBUyxHQUFHLFNBQVM7SUFDckQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUM3RCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNuQyxNQUFNLFVBQVUsQ0FBQywwQ0FBMEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7S0FDekY7SUFDRCxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxTQUFTO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUE7UUFDakMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7UUFDdEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBRUM7WUFDZCxNQUFNLEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUM1RCxNQUFNLENBQUMsR0FBRyxrQkFBa0IsQ0FBQztZQUM3QixDQUFDLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7YUFDaEMsQ0FBQyxDQUFBO1NBSUg7O1FBRUQsT0FBTyxNQUFNLENBQUE7S0FDZCxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUNwQjs7OzsifQ==
