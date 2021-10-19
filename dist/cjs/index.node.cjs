'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
            const nodeAlg = algorithm.toLowerCase().replace('-', '');
            digest = require('crypto').createHash(nodeAlg).update(Buffer.from(hashInput)).digest('hex'); // eslint-disable-line
        }
        /* eslint-enable no-lone-blocks */
        return digest;
    })(obj, algorithm);
}

exports.digest = digest;
exports.hashable = hashable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubm9kZS5janMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cy9oYXNoYWJsZS50cyIsIi4uLy4uL3NyYy90cy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLFNBQVMsUUFBUSxDQUFFLEdBQVE7SUFDekIsT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLE1BQU0sT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUUsQ0FBQztBQUVELFNBQVMsd0JBQXdCLENBQUUsR0FBUTtJQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN6QyxPQUFPLEdBQUcsQ0FBQTtLQUNYO0lBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUk7WUFDbEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekMsT0FBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUN0QztZQUNELE9BQU8sSUFBSSxDQUFBO1NBQ1osQ0FBQyxDQUFBO0tBQ0g7O0lBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNwQixJQUFJLEVBQUU7U0FDTixHQUFHLENBQUMsQ0FBQyxHQUFHO1FBQ1AsT0FBTyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2pELENBQUMsQ0FBQTtBQUNOLENBQUM7QUFFRDs7Ozs7OzttQkFPeUIsR0FBVztJQUNsQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0RDs7QUNqQ0E7Ozs7Ozs7O0FBWUE7Ozs7Ozs7Ozs7Ozs7U0FhZ0IsTUFBTSxDQUFFLEdBQVEsRUFBRSxTQUFTLEdBQUcsU0FBUztJQUNyRCxNQUFNLFVBQVUsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sVUFBVSxDQUFDLDBDQUEwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUN6RjtJQUNELE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLFNBQVM7UUFDcEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQTtRQUNqQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtRQUN0RCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFRUjtZQUNMLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzVGOztRQUVELE9BQU8sTUFBTSxDQUFBO0tBQ2QsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDcEI7Ozs7OyJ9
