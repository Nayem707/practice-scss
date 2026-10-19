/**
 * Accepts only same-origin relative paths to prevent open-redirect attacks
 * via the `?redirect=` query parameter.
 */
export function getSafeRedirect(target: string | null, fallback: string): string {
  if (!target) return fallback;
  const isRelativePath = target.startsWith('/') && !target.startsWith('//');
  return isRelativePath && !target.includes('\\') ? target : fallback;
}
