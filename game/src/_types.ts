import type { Database } from "./_generated";

export type Writeable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type { Database };
