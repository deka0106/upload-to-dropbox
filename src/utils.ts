export function isDirectory(path: string): boolean {
  return path.endsWith('/')
}

export function asBoolean(s: string): boolean {
  return s.toLowerCase() === 'true'
}
