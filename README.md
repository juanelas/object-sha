[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# object-sha

A package to perform SHA hash functions over key-value objects that works both in Node.js and native JS. It also can be used with typescript projects.

It provides a single method `digest()` that first creates an array of the object values ordered by the object keys (order in JS objects is not guaranteed); then, it JSON.stringifies it; and finally it hashes it. The output is a string with the hexadecimal representation of the digest.

Internally the hash is computed using node crypto (node.js) or subtle crypto (browsers).
In order to guarantee native compatibility with browsers, the supported hash algorithms are `SHA-1`, `SHA-256`, `SHA-384` and `SHA-512`.

## Installation

```bash
npm install object-sha
```

# JS Doc

<a name="digest"></a>

## digest(obj, [algorithm]) ⇒ <code>Promise.&lt;string&gt;</code>
Return a string with a hexadecimal representation of the digest of the input object using a given hash algorithm.
It first creates an array of the object values ordered by the object keys (order in JS objects is not guaranteed);
then, it JSON.stringifie it; and finally it hashes it.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise that resolves to a string with hexadecimal content.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Object</code> |  | An obejct with pairs of key-value |
| [algorithm] | <code>string</code> | <code>&quot;SHA-256&quot;</code> | For compatibility with browsers it should be 'SHA-1', 'SHA-256', 'SHA-384' and 'SHA-512'. |

