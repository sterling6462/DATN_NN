
export function isNullOrUndefined(value?: unknown): boolean {
  return value === undefined || value === null
}

export function isObjectEmpty(obj: Record<string, unknown> = {}): boolean {
  return (
    typeof obj === 'object' &&
    (isNullOrUndefined(obj) || Object.keys(obj).length === 0)
  )
}
