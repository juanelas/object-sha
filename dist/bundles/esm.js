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
 * @param obj the object
 *
 * @returns a JSON stringify of the created sorted array
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
  * @throws {@link RangeError} if an invalid hash algorithm is selected.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNtLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHMvaGFzaGFibGUudHMiLCIuLi8uLi9zcmMvdHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsUUFBUSxDQUFFLEdBQVEsRUFBQTtJQUN6QixPQUFPLENBQUMsR0FBRyxJQUFJLElBQUksTUFBTSxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM1RSxDQUFDO0FBRUQsU0FBUyx3QkFBd0IsQ0FBRSxHQUFRLEVBQUE7QUFDekMsSUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN6QyxRQUFBLE9BQU8sR0FBRyxDQUFBO0FBQ1gsS0FBQTtBQUNELElBQUEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFFBQUEsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFJO1lBQ3RCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDekMsZ0JBQUEsT0FBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN0QyxhQUFBO0FBQ0QsWUFBQSxPQUFPLElBQUksQ0FBQTtBQUNiLFNBQUMsQ0FBQyxDQUFBO0FBQ0gsS0FBQTs7QUFFRCxJQUFBLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDcEIsU0FBQSxJQUFJLEVBQUU7QUFDTixTQUFBLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSTtRQUNYLE9BQU8sQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNsRCxLQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFFRDs7Ozs7O0FBTUc7QUFDVyxpQkFBQSxFQUFXLEdBQTZCLEVBQUE7SUFDcEQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEQ7O0FDakNBOzs7Ozs7O0FBT0c7QUFLSDs7Ozs7Ozs7Ozs7QUFXSTtTQUNZLE1BQU0sQ0FBRSxHQUFRLEVBQUUsU0FBUyxHQUFHLFNBQVMsRUFBQTtJQUNyRCxNQUFNLFVBQVUsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQzdELElBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbkMsTUFBTSxVQUFVLENBQUMsQ0FBQSx1Q0FBQSxFQUEwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFBO0FBQ3pGLEtBQUE7QUFDRCxJQUFBLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLFNBQVMsRUFBQTtBQUNwQyxRQUFBLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUE7QUFDakMsUUFBQSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtRQUN0RCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7QUFFZixRQUFnQjtBQUNkLFlBQUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUE7WUFDNUQsTUFBTSxDQUFDLEdBQUcsa0JBQWtCLENBQUM7QUFDN0IsWUFBQSxDQUFDLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSTtBQUNsQyxnQkFBQSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBQ2pDLGFBQUMsQ0FBQyxDQUFBO0FBQ0gsU0FHQTs7QUFFRCxRQUFBLE9BQU8sTUFBTSxDQUFBO0FBQ2YsS0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUNwQjs7OzsifQ==
