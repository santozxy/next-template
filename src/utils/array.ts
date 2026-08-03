import { Children, isValidElement, ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

export function countActionNodes(node: ReactNode): number {
  return Children.toArray(node).reduce<number>((count, child) => {
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === Fragment
    ) {
      return count + countActionNodes(child.props.children);
    }

    return count + 1;
  }, 0);
}
