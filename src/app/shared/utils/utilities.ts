export function truncateString(
  str: string | undefined,
  maxLength: number,
): string | undefined {
  return str?.length !== undefined && str.length > maxLength
    ? `${str.slice(0, maxLength)}...`
    : str;
}

export function openInNewTab(url: string): void {
  const newWindow = window.open(url, '_blank');
  if (newWindow) {
    newWindow.focus();
  } else {
    console.error(
      'Failed to open new tab. Please make sure pop-ups are allowed for this site.',
    );
  }
}
