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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnJvd3Nlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RzL2hhc2hhYmxlLnRzIiwiLi4vLi4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLFFBQVEsQ0FBRSxHQUFRLEVBQUE7SUFDekIsT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLE1BQU0sT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUUsQ0FBQztBQUVELFNBQVMsd0JBQXdCLENBQUUsR0FBUSxFQUFBO0FBQ3pDLElBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDekMsUUFBQSxPQUFPLEdBQUcsQ0FBQTtBQUNYLEtBQUE7QUFDRCxJQUFBLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN0QixRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSTtZQUN0QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pDLGdCQUFBLE9BQU8sd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDdEMsYUFBQTtBQUNELFlBQUEsT0FBTyxJQUFJLENBQUE7QUFDYixTQUFDLENBQUMsQ0FBQTtBQUNILEtBQUE7O0FBRUQsSUFBQSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3BCLFNBQUEsSUFBSSxFQUFFO0FBQ04sU0FBQSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUk7UUFDWCxPQUFPLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDbEQsS0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBRUQ7Ozs7OztBQU1HO0FBQ1csaUJBQUEsRUFBVyxHQUE2QixFQUFBO0lBQ3BELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3REOztBQ2pDQTs7Ozs7OztBQU9HO0FBS0g7Ozs7Ozs7Ozs7O0FBV0k7U0FDWSxNQUFNLENBQUUsR0FBUSxFQUFFLFNBQVMsR0FBRyxTQUFTLEVBQUE7SUFDckQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUM3RCxJQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sVUFBVSxDQUFDLENBQUEsdUNBQUEsRUFBMEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBQTtBQUN6RixLQUFBO0FBQ0QsSUFBQSxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxTQUFTLEVBQUE7QUFDcEMsUUFBQSxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBO0FBQ2pDLFFBQUEsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7UUFDdEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0FBRWYsUUFBZ0I7QUFDZCxZQUFBLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQzVELE1BQU0sQ0FBQyxHQUFHLGtCQUFrQixDQUFDO0FBQzdCLFlBQUEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUk7QUFDbEMsZ0JBQUEsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUNqQyxhQUFDLENBQUMsQ0FBQTtBQUNILFNBR0E7O0FBRUQsUUFBQSxPQUFPLE1BQU0sQ0FBQTtBQUNmLEtBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDcEI7Ozs7In0=
