/**
 * My module description. Please update with your module data.
 *
 * @remarks
 * This module runs perfectly in node.js and browsers
 *
 * @packageDocumentation
 */
export { default as hashable } from './hashable';
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
export declare function digest(obj: any, algorithm?: string): Promise<string>;
//# sourceMappingURL=index.d.ts.map