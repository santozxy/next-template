type Primitive = string | number | boolean | bigint | symbol | null | undefined;
type AnyFunction = (...args: unknown[]) => unknown;
type NonNestedValue =
  | Primitive
  | Date
  | RegExp
  | AnyFunction
  | readonly unknown[]
  | Map<unknown, unknown>
  | Set<unknown>
  | WeakMap<object, unknown>
  | WeakSet<object>;
type StringKeyOf<T> = Extract<keyof T, string>;

export type NestedKeyOf<T> = T extends object
  ? {
      [K in StringKeyOf<T>]: NonNullable<T[K]> extends NonNestedValue
        ? K
        : K | `${K}.${NestedKeyOf<NonNullable<T[K]>>}`;
    }[StringKeyOf<T>]
  : never;

export type PathValue<
  T,
  P extends string,
> = P extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? PathValue<NonNullable<T[Head]>, Tail>
    : never
  : P extends keyof T
    ? T[P]
    : never;

export function getValueByColumnKey<T, K extends NestedKeyOf<T>>(
  row: T,
  key: K
): PathValue<T, K> {
  const path = key.split(".");

  const value = path.reduce<unknown>((currentValue, pathPart) => {
    if (
      currentValue !== null &&
      typeof currentValue === "object" &&
      pathPart in currentValue
    ) {
      return (currentValue as Record<string, unknown>)[pathPart];
    }

    return undefined;
  }, row as unknown);

  return value as PathValue<T, K>;
}
