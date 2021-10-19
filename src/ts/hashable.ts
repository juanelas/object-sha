function isObject (val: any): boolean {
  return (val != null) && (typeof val === 'object') && !(Array.isArray(val))
}

function objectToArraySortedByKey (obj: any): any {
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
  return Object.keys(obj) // eslint-disable-line
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
export default function (obj: object): string {
  return JSON.stringify(objectToArraySortedByKey(obj))
}
