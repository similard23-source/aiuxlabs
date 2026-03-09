export type SEOConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  noindex?: boolean;
  ogImage?: string;
};

export const defaultSEO = {
  siteName: 'AIUXSLABS',
  twitterHandle: '@aiuxslabs',
  defaultImage: '/og-default.jpg'
};

export function absoluteUrl(path: string, site = 'https://example.com'): string {
  return new URL(path, site).toString();
}
