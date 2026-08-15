// Declarations for importing .jsx modules in a TypeScript project
declare module "*.jsx" {
  const component: any;
  export default component;
}
