import { useEffect } from 'react';
import type { HeadgearConfig } from './types';
import type { Schema } from './schema/types';

/**
 * React hook for managing document head SEO metadata.
 *
 * Updates meta tags, Open Graph, Twitter Cards, and JSON-LD structured data.
 * Cleans up dynamically added elements on unmount.
 *
 * @example
 * ```typescript
 * import { useHeadgear } from 'react-headgear';
 * import { Product } from 'react-headgear/schema';
 *
 * function ProductPage({ product }) {
 *   useHeadgear({
 *     title: `${product.name} | My Store`,
 *     description: product.description,
 *     canonical: `https://mystore.com/products/${product.slug}`,
 *     schema: Product({
 *       name: product.name,
 *       price: product.price,
 *       currency: 'USD',
 *     }),
 *   });
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useHeadgear(config: HeadgearConfig): void {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    // Update document title
    const previousTitle = document.title;
    document.title = config.title;
    cleanupFns.push(() => {
      document.title = previousTitle;
    });

    // Helper to update or create meta tag
    const setMeta = (
      selector: string,
      content: string,
      attrType: 'name' | 'property' = 'name'
    ) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      const isNew = !element;

      if (!element) {
        element = document.createElement('meta');
        const attrValue = selector.match(/(?:name|property)="([^"]+)"/)?.[1];
        if (attrValue) {
          element.setAttribute(attrType, attrValue);
        }
        document.head.appendChild(element);
      }

      const previousContent = element.content;
      element.content = content;

      if (isNew) {
        cleanupFns.push(() => element?.remove());
      } else {
        cleanupFns.push(() => {
          if (element) element.content = previousContent;
        });
      }
    };

    // Helper to update or create link tag
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      const isNew = !element;

      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }

      const previousHref = element.href;
      element.href = href;

      if (isNew) {
        cleanupFns.push(() => element?.remove());
      } else {
        cleanupFns.push(() => {
          if (element) element.href = previousHref;
        });
      }
    };

    // Primary meta tags
    setMeta('meta[name="description"]', config.description);

    if (config.noindex) {
      setMeta('meta[name="robots"]', 'noindex, nofollow');
    }

    if (config.keywords && config.keywords.length > 0) {
      setMeta('meta[name="keywords"]', config.keywords.join(', '));
    }

    // Canonical URL
    if (config.canonical) {
      setLink('canonical', config.canonical);
    }

    // Open Graph tags
    const ogTitle = config.og?.title || config.title;
    const ogDescription = config.og?.description || config.description;
    const ogType = config.og?.type || 'website';

    setMeta('meta[property="og:title"]', ogTitle, 'property');
    setMeta('meta[property="og:description"]', ogDescription, 'property');
    setMeta('meta[property="og:type"]', ogType, 'property');

    if (config.og?.image) {
      const imageUrl =
        typeof config.og.image === 'string'
          ? config.og.image
          : `/og/${config.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      setMeta('meta[property="og:image"]', imageUrl, 'property');
    }

    if (config.og?.url || config.canonical) {
      setMeta(
        'meta[property="og:url"]',
        config.og?.url || config.canonical!,
        'property'
      );
    }

    if (config.og?.siteName) {
      setMeta('meta[property="og:site_name"]', config.og.siteName, 'property');
    }

    // Twitter Card tags
    const twitterCard = config.twitter?.card || 'summary_large_image';
    setMeta('meta[name="twitter:card"]', twitterCard);
    setMeta('meta[name="twitter:title"]', ogTitle);
    setMeta('meta[name="twitter:description"]', ogDescription);

    if (config.og?.image) {
      const imageUrl =
        typeof config.og.image === 'string'
          ? config.og.image
          : `/og/${config.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      setMeta('meta[name="twitter:image"]', imageUrl);
    }

    if (config.twitter?.site) {
      setMeta('meta[name="twitter:site"]', config.twitter.site);
    }

    if (config.twitter?.creator) {
      setMeta('meta[name="twitter:creator"]', config.twitter.creator);
    }

    // JSON-LD Structured Data
    if (config.schema) {
      const schemas = Array.isArray(config.schema)
        ? config.schema
        : [config.schema];

      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-headgear', 'true');
      schemaScript.textContent = JSON.stringify(
        schemas.length === 1 ? schemas[0] : schemas
      );
      document.head.appendChild(schemaScript);

      cleanupFns.push(() => schemaScript.remove());
    }

    // Cleanup function
    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [
    config.title,
    config.description,
    config.canonical,
    config.noindex,
    config.keywords,
    config.og,
    config.twitter,
    config.schema,
  ]);
}
