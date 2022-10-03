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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNtLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHMvaGFzaGFibGUudHMiLCIuLi8uLi9zcmMvdHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsUUFBUSxDQUFFLEdBQVEsRUFBQTtJQUN6QixPQUFPLENBQUMsR0FBRyxJQUFJLElBQUksTUFBTSxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM1RSxDQUFDO0FBRUQsU0FBUyx3QkFBd0IsQ0FBRSxHQUFRLEVBQUE7QUFDekMsSUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN6QyxRQUFBLE9BQU8sR0FBRyxDQUFBO0FBQ1gsS0FBQTtBQUNELElBQUEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFFBQUEsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFJO1lBQ3RCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDekMsZ0JBQUEsT0FBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN0QyxhQUFBO0FBQ0QsWUFBQSxPQUFPLElBQUksQ0FBQTtBQUNiLFNBQUMsQ0FBQyxDQUFBO0FBQ0gsS0FBQTs7QUFFRCxJQUFBLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDcEIsU0FBQSxJQUFJLEVBQUU7QUFDTixTQUFBLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSTtRQUNYLE9BQU8sQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNsRCxLQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFFRDs7Ozs7O0FBTUc7QUFDVyxpQkFBQSxFQUFXLEdBQTZCLEVBQUE7SUFDcEQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEQ7O0FDakNBOzs7Ozs7O0FBT0c7QUFLSDs7Ozs7Ozs7Ozs7O0FBWUk7U0FDWSxNQUFNLENBQUUsR0FBUSxFQUFFLFNBQVMsR0FBRyxTQUFTLEVBQUE7SUFDckQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUM3RCxJQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sVUFBVSxDQUFDLENBQUEsdUNBQUEsRUFBMEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBQTtBQUN6RixLQUFBO0FBQ0QsSUFBQSxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxTQUFTLEVBQUE7QUFDcEMsUUFBQSxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBO0FBQ2pDLFFBQUEsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7UUFDdEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0FBRWYsUUFBZ0I7QUFDZCxZQUFBLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQzVELE1BQU0sQ0FBQyxHQUFHLGtCQUFrQixDQUFDO0FBQzdCLFlBQUEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUk7QUFDbEMsZ0JBQUEsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUNqQyxhQUFDLENBQUMsQ0FBQTtBQUNILFNBR0E7O0FBRUQsUUFBQSxPQUFPLE1BQU0sQ0FBQTtBQUNmLEtBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDcEI7Ozs7In0=
