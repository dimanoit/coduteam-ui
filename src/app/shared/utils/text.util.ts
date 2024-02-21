export function truncateString(
  str: string | undefined,
  maxLength: number,
): string | undefined {
  return str?.length !== undefined && str.length > maxLength
    ? `${str.slice(0, maxLength)}...`
    : str;
}
