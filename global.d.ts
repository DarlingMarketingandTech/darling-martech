// Global type declarations to avoid @types/node dependency
declare const process: {
  env: Record<string, string | undefined>
}

declare function require(id: string): unknown
