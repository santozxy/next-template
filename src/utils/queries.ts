export function getQueryString(
  params: Record<string, string | number | boolean | object | null | undefined>
): string {
  return new URLSearchParams(JSON.stringify(params)).toString();
}

export function encodeQueryString(
  params: Record<
    string,
    | string
    | number
    | boolean
    | object
    | Array<string | number | boolean | object>
    | null
    | undefined
  >
): string {
  const keys = Object.keys(params);
  return keys.length
    ? "?" +
        keys
          .map(
            (key) =>
              encodeURIComponent(key) +
              "=" +
              encodeURIComponent(
                params[key] === undefined || params[key] === null
                  ? ""
                  : typeof params[key] === "object"
                    ? JSON.stringify(params[key])
                    : String(params[key])
              )
          )
          .join("&")
    : "";
}
