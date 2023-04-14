declare function export_default(obj: object | number | string): string;

declare function digest(obj: any, algorithm?: string): Promise<string>;

export { digest, export_default as hashable };
