import type { BreadcrumbItem } from '@/types';

/** "/admin/settings" → [{ "/admin" }, { "/admin/settings" }], skipping unlabeled segments. */
export function buildBreadcrumbs(
  pathname: string,
  labels: Readonly<Record<string, string>>,
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);

  return segments.reduce<BreadcrumbItem[]>((crumbs, _segment, index) => {
    const to = `/${segments.slice(0, index + 1).join('/')}`;
    const label = labels[to];
    return label ? [...crumbs, { label, to }] : crumbs;
  }, []);
}
