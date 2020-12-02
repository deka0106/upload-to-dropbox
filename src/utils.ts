export function isDirectory(path: string): boolean {
  return path.endsWith('/')
}
