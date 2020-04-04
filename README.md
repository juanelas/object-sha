[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# object-sha

A package to compute the SHA hash of a JS Object. It works in Node.js and native JS and be directly imported into TypeScript projects.

It provides two methods `hashable(obj)` and `digest(obj)` (see [JS Doc](#js-doc) below):

- `hashable(obj)` prepares any object with no known order to be hashable. It recursively traverses the input to find `Object`s. Then every `Object` is converted to an array sorted by key of 2-arrays [key, value]. The final result is JSON.stringify-ed and returned as a string. Since a specific order is now guranteed, we can safely use the output as the input for any hash algorithm.

- `digest(obj, [algorithm])` performs a SHA-2 hash to the input obj, wich is first made hashable with `hashable(obj)`. The output is a string with the hexadecimal representation of the digest. Internally the hash is computed using node crypto (node.js) or subtle crypto (browsers). Supported hash algorithms are `SHA-1`, `SHA-256`, `SHA-384` and `SHA-512`.

## Installation

```terminal
npm install object-sha
```

## Usage examples

```javascript
const objectSha = require('object-sha') // or import * as objectSha from 'object-sha'

const obj1 = { src: 'A', dst: 'B', msg: { hello: 'goodbye!', arr: [2, 9, { b: 5, a: 7 }] } }
const obj2 = { dst: 'B', src: 'A', msg: { arr: [2, 9, { a: 7, b: 5 }], hello: 'goodbye!' } }

console.log(objectSha.hashable(obj1)) // [["dst","B"],["msg",[["arr",[2,9,[["a",7],["b",5]]]],["hello","goodbye!"]]],["src","A"]]
console.log(objectSha.hashable(obj2)) // [["dst","B"],["msg",[["arr",[2,9,[["a",7],["b",5]]]],["hello","goodbye!"]]],["src","A"]]

objectSha.digest(obj1).then(console.log) // 6269af73d25f886a50879942cdf5c40500371c6f4d510cec0a67b2992b0a9549
objectSha.digest(obj2).then(console.log) // 6269af73d25f886a50879942cdf5c40500371c6f4d510cec0a67b2992b0a9549

objectSha.digest(obj1, 'SHA-512').then(console.log) // f3325ec4c42cc0154c6a9c78446ce3915196c6ae62d077838b699ca83faa2bd2c0639dd6ca43561afb28bfeb2ffd7481b45c07eaebb7098e1c62ef3c0d441b0b
objectSha.digest(obj2, 'SHA-512').then(console.log) // f3325ec4c42cc0154c6a9c78446ce3915196c6ae62d077838b699ca83faa2bd2c0639dd6ca43561afb28bfeb2ffd7481b45c07eaebb7098e1c62ef3c0d441b0b

```

# JS Doc

## Functions

<dl>
<dt><a href="#hashable">hashable(obj)</a> ⇒ <code>string</code></dt>
<dd><p>If the input object is not an Array, this function converts the object to an array, all the key-values to 2-arrays [key, value] and then sort the array by the keys. All the process is done recursively so objects inside objects or arrays are also ordered. Once the array is created the method returns the JSON.stringify() of the sorted array.</p>
</dd>
<dt><a href="#digest">digest(obj, [algorithm])</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Returns a string with a hexadecimal representation of the digest of the input object using a given hash algorithm.
It first creates an array of the object values ordered by the object keys (using hashable(obj));
then, it JSON.stringify-es it; and finally it hashes it.</p>
</dd>
</dl>

<a name="hashable"></a>

## hashable(obj) ⇒ <code>string</code>
If the input object is not an Array, this function converts the object to an array, all the key-values to 2-arrays [key, value] and then sort the array by the keys. All the process is done recursively so objects inside objects or arrays are also ordered. Once the array is created the method returns the JSON.stringify() of the sorted array.

**Kind**: global function  
**Returns**: <code>string</code> - a JSON stringify of the created sorted array  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | the object |

<a name="digest"></a>

## digest(obj, [algorithm]) ⇒ <code>Promise.&lt;string&gt;</code>
Returns a string with a hexadecimal representation of the digest of the input object using a given hash algorithm.
It first creates an array of the object values ordered by the object keys (using hashable(obj));
then, it JSON.stringify-es it; and finally it hashes it.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise that resolves to a string with hexadecimal content.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Object</code> |  | An Object |
| [algorithm] | <code>string</code> | <code>&quot;SHA-256&quot;</code> | For compatibility with browsers it should be 'SHA-1', 'SHA-256', 'SHA-384' and 'SHA-512'. |

