// Wildcard declarations for importing .jsx and .js modules in a TypeScript project

declare module '*.jsx' {
  import type { ComponentType } from 'react';
  const component: ComponentType<any>;
  export default component;
  export const [key: string]: any;
}

declare module '*.js' {
  const value: any;
  export default value;
  export const [key: string]: any;
}
