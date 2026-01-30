export function decodeHtml(html: string): string | null {
  const txt = new DOMParser().parseFromString(html, "text/html");
  return txt.documentElement.textContent;
}
