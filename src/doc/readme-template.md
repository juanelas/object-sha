# object-hash

A package to perform SHA hash functions over key-value objects that works both in Node.js and native JS. It also can be used with typescript projects.

It provides a single method `digest()` that first creates an array of the object values ordered by the object keys (order in JS objects is not guaranteed); then, it JSON.stringify it; and finally it hashes it. The output is a string with the hexadecimal representation of the digest.

Internally the hash is computed using node crypto (node.js) or subtle crypto (browsers).
In order to guarantee native compatibility with browsers, the supported hash algorithms are `SHA-1`, `SHA-256`, `SHA-384` and `SHA-512`.

# JS Doc

{{>main}}