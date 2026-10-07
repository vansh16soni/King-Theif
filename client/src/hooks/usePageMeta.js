import { useEffect } from 'react';

const CANONICAL_BASE = 'https://rajamantri.in';

export function usePageMeta({ title, description, path = '' }) {
  useEffect(() => {
    // 1. Set document title
    const formattedTitle = title
      ? `${title} | Raja Mantri Chor Sipahi`
      : 'Raja Mantri Chor Sipahi | Indian Social Deduction Game';
    document.title = formattedTitle;

    // 2. Set or create meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);

      let twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute('content', description);
    }

    // 3. Set or update canonical URL
    const canonicalUrl = `${CANONICAL_BASE}${path.startsWith('/') ? path : `/${path}`}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Update Open Graph & Twitter URL & Title
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', formattedTitle);

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', formattedTitle);
  }, [title, description, path]);
}
