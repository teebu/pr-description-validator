export function reFound(input: string = '', pattern: string): boolean {
  const regexPat = new RegExp(pattern, 'i')
  return input.search(regexPat) !== -1
}

export function reMatch(input: string = '', pattern: string): string | null {
  const regexPat = new RegExp(pattern, 'i')
  const match = input.match(regexPat)
  return match && match[1].trim()
}
