[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
{{GITHUB_ACTIONS_BADGES}}

# {{PKG_NAME}}

A package to compute the SHA hash of a JS Object. It works in Node.js and native JS and can be directly imported into TypeScript projects (types provided).

It includes two methods `hashable(obj)` and `digest(obj)` (see [API Ref Doc](#api-reference-documentation) below):

- `hashable(obj)` prepares any object with no known order to be hashable. It recursively traverses the input to find `Object`s. Then every `Object` is converted to an array sorted by key of 2-arrays [key, value]. The final result is JSON.stringify-ed and returned as a string. Since a specific order is now guaranteed, we can safely use the output as the input for any hash algorithm.

- `digest(obj, [algorithm])` performs an SHA-2 hash to the input obj, which is first made hashable with `hashable(obj)`. The output is a string with the hexadecimal representation of the digest. Internally the hash is computed using node crypto (node.js) or subtle crypto (browsers). Supported hash algorithms are `SHA-1`, `SHA-256`, `SHA-384` and `SHA-512`.

## Usage

`{{PKG_NAME}}` can be imported to your project with `npm`:

```console
npm install {{PKG_NAME}}
```

Then either require (Node.js CJS):

```javascript
const {{PKG_CAMELCASE}} = require('{{PKG_NAME}}')
```

or import (JavaScript ES module):

```javascript
import * as {{PKG_CAMELCASE}} from '{{PKG_NAME}}'
```

The appropriate version for browser or node is automatically exported.

You can also download the {{IIFE_BUNDLE}}, the {{ESM_BUNDLE}} or the {{UMD_BUNDLE}} and manually add it to your project, or, if you have already installed `{{PKG_NAME}}` in your project, just get the bundles from `node_modules/{{PKG_NAME}}/dist/bundles/`.

An example of usage could be:

```typescript
const {{PKG_CAMELCASE}} = require('{{PKG_NAME}}') // or import * as {{PKG_CAMELCASE}} from '{{PKG_NAME}}'

const obj1 = { src: 'A', dst: 'B', msg: { hello: 'goodbye!', arr: [2, 9, { b: 5, a: 7 }] } }
const obj2 = { dst: 'B', src: 'A', msg: { arr: [2, 9, { a: 7, b: 5 }], hello: 'goodbye!' } }

console.log({{PKG_CAMELCASE}}.hashable(obj1)) // [["dst","B"],["msg",[["arr",[2,9,[["a",7],["b",5]]]],["hello","goodbye!"]]],["src","A"]]
console.log({{PKG_CAMELCASE}}.hashable(obj2)) // [["dst","B"],["msg",[["arr",[2,9,[["a",7],["b",5]]]],["hello","goodbye!"]]],["src","A"]]

{{PKG_CAMELCASE}}.digest(obj1).then(console.log) // 6269af73d25f886a50879942cdf5c40500371c6f4d510cec0a67b2992b0a9549
{{PKG_CAMELCASE}}.digest(obj2).then(console.log) // 6269af73d25f886a50879942cdf5c40500371c6f4d510cec0a67b2992b0a9549

{{PKG_CAMELCASE}}.digest(obj1, 'SHA-512').then(console.log) // f3325ec4c42cc0154c6a9c78446ce3915196c6ae62d077838b699ca83faa2bd2c0639dd6ca43561afb28bfeb2ffd7481b45c07eaebb7098e1c62ef3c0d441b0b
{{PKG_CAMELCASE}}.digest(obj2, 'SHA-512').then(console.log) // f3325ec4c42cc0154c6a9c78446ce3915196c6ae62d077838b699ca83faa2bd2c0639dd6ca43561afb28bfeb2ffd7481b45c07eaebb7098e1c62ef3c0d441b0b

```

## API reference documentation

[Check the API](./docs/API.md)
