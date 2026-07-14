// The installed stylis@4.4.0 ships no bundled type declarations.
declare module "stylis" {
  export type Middleware = (...args: unknown[]) => string | void;
  export const prefixer: Middleware;
  export const serialize: (...args: unknown[]) => string;
  export const compile: (value: string) => unknown[];
  export const stringify: (...args: unknown[]) => string;
}
