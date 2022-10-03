# object-sha - v2.0.6

My module description. Please update with your module data.

**`Remarks`**

This module runs perfectly in node.js and browsers

## Table of contents

### Functions

- [digest](API.md#digest)
- [hashable](API.md#hashable)

## Functions

### digest

▸ **digest**(`obj`, `algorithm?`): `Promise`<`string`\>

Returns a string with a hexadecimal representation of the digest of the input object using a given hash algorithm.
It first creates an array of the object values ordered by the object keys (using hashable(obj));
then, it JSON.stringify-es it; and finally it hashes it.

**`Throws`**

RangeError if an invalid hash algorithm is selected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `obj` | `any` | `undefined` | An Object |
| `algorithm` | `string` | `'SHA-256'` | For compatibility with browsers it should be 'SHA-1', 'SHA-256', 'SHA-384' and 'SHA-512'. |

#### Returns

`Promise`<`string`\>

a promise that resolves to a string with hexadecimal content.

#### Defined in

[index.ts:25](https://github.com/juanelas/object-sha/blob/dd2d17a/src/ts/index.ts#L25)

___

### hashable

▸ **hashable**(`obj`): `string`

If the input object is not an Array, this function converts the object to an array, all the key-values to 2-arrays [key, value] and then sort the array by the keys. All the process is done recursively so objects inside objects or arrays are also ordered. Once the array is created the method returns the JSON.stringify() of the sorted array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `string` \| `number` \| `object` | the object |

#### Returns

`string`

a JSON stringify of the created sorted array

#### Defined in

[hashable.ts:32](https://github.com/juanelas/object-sha/blob/dd2d17a/src/ts/hashable.ts#L32)
