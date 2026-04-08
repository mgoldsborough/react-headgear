# react-headgear: The AI-Native SEO Library for React

> Intent-based API. Self-documenting types. Built for agents.

**Package name:** `react-headgear`

**Tagline:** "Gear up your document head. SEO that explains itself."

## Problem Statement

React SPAs have fragmented SEO tooling:

| Concern | Current Solution | Problem |
|---------|------------------|---------|
| Meta tags | react-helmet | Runtime-only, no SSR integration |
| Structured data | Manual JSON-LD | No types, no validation, error-prone |
| OG images | @vercel/og | Vercel-only, no build-time option |
| Sitemaps | Separate tools | Disconnected from routes |
| Validation | Google Search Console | Delayed feedback (days) |

**Core insight:** These tools treat SEO as a runtime concern when it should be a build-time concern. Crawlers need content before JavaScript executes.

**AI insight:** These tools are built for humans reading docs. AI agents work differently:

| Human Developer | AI Agent |
|-----------------|----------|
| Reads README, tutorials | Reads types, infers from examples |
| Learns incrementally over weeks | Must understand in one context window |
| Tolerates ambiguity | Needs explicit constraints or fails |
| Debugs with intuition | Needs actionable error messages |
| Remembers past usage | Stateless, re-learns each session |

---

## AI-Native Design Principles

### 1. Intent-Based API

AI expresses what it wants, library handles implementation:

```typescript
// Old approach: AI must know SEO implementation details
useHeadgear({
  title: '...',
  description: '...',
  og: { type: 'product', ... },
  schema: Product({ ... }),
});

// AI-native: Express intent, library handles the rest
useHeadgear(presets.ecommerce.productPage({
  name: 'Widget Pro',
  price: 29.99,
  currency: 'USD',
  image: '/widget.png',
}));
```

### 2. Self-Documenting Types

Types encode valid options and teach usage in-context:

```typescript
interface ProductSchema {
  /**
   * Product name for search results and social cards.
   * Keep under 60 chars for full display in Google.
   * @example "iPhone 15 Pro Max 256GB"
   */
  name: string;

  /**
   * Price in decimal format. Required for Google rich results.
   * @example 999.99
   */
  price: number;

  /**
   * ISO 4217 currency code.
   */
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY';
}
```

### 3. Introspection API

Let AI ask the library what it needs:

```typescript
import { describe, validate, preview } from 'react-headgear';

// AI asks: "What do I need for a product page?"
describe('productPage');
// Returns: { required: [...], optional: [...], defaults: {...}, example: {...} }

// AI validates before applying
validate(config);
// Returns: { valid: false, errors: [...], warnings: [...] }

// AI previews output without side effects
preview(config);
// Returns: { meta: [...], jsonLd: {...}, ogImage: { url, width, height } }
```

### 4. Actionable Error Messages

```typescript
// Bad: AI can't recover
Error: Invalid schema

// Good: AI knows exactly what to do
Error: Product.offers.price is required for Google rich results.
Fix: Add offers: { price: number, priceCurrency: string }
Docs: https://headgear.dev/schemas/product#offers
```

### 5. Presets for Common Patterns

AI doesn't need to be an SEO expert:

```typescript
import { presets } from 'react-headgear';

// E-commerce
presets.ecommerce.productPage(product)
presets.ecommerce.categoryPage(category, products)

// Content
presets.blog.articlePage(post)
presets.blog.authorPage(author)

// SaaS
presets.saas.landingPage(hero)
presets.saas.pricingPage(plans)
```

### 6. Ship AI Context

Include files optimized for LLM consumption:

```
react-headgear/
├── AI.md              # Context-efficient usage guide
├── TOOLS.json         # MCP/function-calling tool definitions
├── examples/          # Copy-paste examples per use case
```

### 7. MCP Server / Tool Definitions

Ship tool schemas for Claude, GPT, and other agents:

```json
{
  "name": "generate_seo_config",
  "description": "Generate SEO configuration for a React page",
  "parameters": {
    "pageType": { "enum": ["product", "article", "landing", "pricing"] },
    "data": { "type": "object" }
  }
}
```

---

## Solution

One package that handles everything crawlers and social platforms need:

- **Typed structured data** with schema.org builders
- **OG image generation** at build time with templates
- **Build-time validation** that catches errors before deploy
- **Sitemap generation** from route config
- **Runtime hook** for dynamic content

## Package Structure

```
react-headgear/
├── AI.md                     # LLM-optimized usage guide (context-efficient)
├── TOOLS.json                # MCP/function-calling tool definitions
├── src/
│   ├── index.ts              # Main exports: useHeadgear, presets, describe, validate, preview
│   ├── presets/
│   │   ├── index.ts          # All preset exports
│   │   ├── ecommerce.ts      # productPage, categoryPage, cartPage, checkoutPage
│   │   ├── blog.ts           # articlePage, authorPage, indexPage, tagPage
│   │   ├── saas.ts           # landingPage, pricingPage, featurePage, aboutPage
│   │   └── docs.ts           # guidePage, apiPage, changelogPage
│   ├── introspection/
│   │   ├── describe.ts       # Describe preset requirements
│   │   ├── validate.ts       # Validate config with actionable errors
│   │   └── preview.ts        # Preview output without side effects
│   ├── schema/
│   │   ├── index.ts          # All schema builders
│   │   ├── types.ts          # Schema.org type definitions (JSDoc-rich)
│   │   ├── product.ts
│   │   ├── article.ts
│   │   ├── organization.ts
│   │   ├── breadcrumb.ts
│   │   ├── faq.ts
│   │   └── ...
│   ├── og/
│   │   ├── index.ts          # ogImage function
│   │   ├── templates/
│   │   │   ├── product.tsx
│   │   │   ├── article.tsx
│   │   │   ├── simple.tsx
│   │   │   └── profile.tsx
│   │   ├── render.ts         # Satori + resvg-js
│   │   └── fonts.ts          # Font loading utilities
│   ├── vite/
│   │   ├── index.ts          # Vite plugin
│   │   ├── crawler.ts        # Route discovery
│   │   ├── generator.ts      # Build-time generation
│   │   └── sitemap.ts
│   └── react/
│       ├── index.ts
│       ├── useSEO.ts         # Runtime hook
│       └── SEOProvider.tsx   # Optional context
├── examples/
│   ├── ecommerce-product.ts  # Copy-paste example
│   ├── blog-article.ts
│   ├── saas-pricing.ts
│   └── custom-schema.ts
├── package.json
└── tsconfig.json
```

**Subpath exports:**
```json
{
  "name": "react-headgear",
  "exports": {
    ".": "./dist/index.js",
    "./schema": "./dist/schema/index.js",
    "./og": "./dist/og/index.js",
    "./vite": "./dist/vite/index.js"
  }
}
```

## API Design

### Primary API: Intent-Based Presets (AI-Optimized)

```typescript
import { useHeadgear, presets } from 'react-headgear';

// E-commerce product page - AI just passes product data
useHeadgear(presets.ecommerce.productPage({
  name: 'Widget Pro',
  price: 29.99,
  currency: 'USD',
  image: '/widget.png',
  description: 'The best widget money can buy',
  sku: 'WIDGET-001',
  inStock: true,
}));
// Automatically generates: title, meta description, OG tags, Twitter cards,
// Product schema, BreadcrumbList, and OG image config

// Blog article
useHeadgear(presets.blog.articlePage({
  title: 'How to Build SEO for SPAs',
  author: { name: 'Jane Doe', url: '/authors/jane' },
  publishedAt: '2025-01-15',
  image: '/blog/spa-seo.png',
  tags: ['seo', 'react', 'spa'],
}));

// SaaS pricing page
useHeadgear(presets.saas.pricingPage({
  title: 'Pricing',
  plans: [
    { name: 'Starter', price: 0 },
    { name: 'Pro', price: 29 },
    { name: 'Enterprise', price: null },
  ],
}));
```

### Introspection API (AI Tooling)

```typescript
import { describe, validate, preview } from 'react-headgear';

// AI discovers what's needed
const spec = describe('ecommerce.productPage');
// {
//   required: ['name', 'price', 'currency'],
//   optional: ['description', 'image', 'sku', 'brand', 'inStock'],
//   defaults: { currency: 'USD', inStock: true },
//   example: { name: 'Widget', price: 29.99, currency: 'USD' }
// }

// AI validates before applying
const result = validate(presets.ecommerce.productPage({ name: 'Widget' }));
// {
//   valid: false,
//   errors: [{ field: 'price', message: 'Required for Google rich results', fix: 'Add price: number' }],
//   warnings: [{ field: 'image', message: 'Recommended for social sharing' }]
// }

// AI previews output without side effects
const output = preview(presets.ecommerce.productPage({ name: 'Widget', price: 29.99 }));
// {
//   meta: [
//     { name: 'title', content: 'Widget | Store' },
//     { property: 'og:type', content: 'product' },
//     ...
//   ],
//   jsonLd: { '@type': 'Product', name: 'Widget', ... },
//   ogImage: { template: 'product', props: {...}, url: '/og/widget.png' }
// }
```

### Advanced API: Full Control

```typescript
import { useHeadgear } from 'react-headgear';
import { Product, BreadcrumbList } from 'react-headgear/schema';
import { ogImage } from 'react-headgear/og';

// When presets don't fit, use the full API
useHeadgear({
  title: 'Widget Pro - My Store',
  description: 'The best widget money can buy',
  canonical: 'https://mystore.com/products/widget-pro',

  og: {
    type: 'product',
    image: ogImage({
      template: 'product',
      props: {
        title: 'Widget Pro',
        price: '$29.99',
        image: '/widget.png',
      },
    }),
  },

  schema: [
    Product({
      name: 'Widget Pro',
      description: 'The best widget',
      offers: {
        price: 29.99,
        priceCurrency: 'USD',
        availability: 'InStock',
      },
    }),
    BreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
      { name: 'Widget Pro' },
    ]),
  ],
});
```

### Schema Builders

```typescript
// Typed, validated, composable
import { Product, Organization, Offer } from 'react-headgear/schema';

const schema = Product({
  name: 'Widget Pro',
  brand: Organization({ name: 'Acme Corp' }),
  offers: Offer({
    price: 29.99,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  }),
});
// TypeScript errors on wrong types or missing required fields
```

### OG Image Templates

```typescript
import { ogImage, templates } from 'react-headgear/og';

// Built-in templates
ogImage({ template: 'simple', props: { title, subtitle } })
ogImage({ template: 'article', props: { title, author, date } })
ogImage({ template: 'product', props: { title, price, image } })
ogImage({ template: 'profile', props: { name, avatar, bio } })

// Custom template
ogImage({
  template: ({ title, tag }) => (
    <div style={{ display: 'flex', background: '#1a1a1a' }}>
      <span>{tag}</span>
      <h1>{title}</h1>
    </div>
  ),
  props: { title: 'My Post', tag: 'Engineering' },
})
```

### Vite Plugin

```typescript
// vite.config.ts
import { headgear } from 'react-headgear/vite';

export default defineConfig({
  plugins: [
    react(),
    headgear({
      site: {
        url: 'https://example.com',
        name: 'My Site',
      },

      routes: {
        include: ['/', '/about', '/pricing'],
        dynamic: {
          '/blog/:slug': async () => getPosts().map(p => ({ slug: p.slug })),
          '/products/:id': async () => getProducts().map(p => ({ id: p.id })),
        },
      },

      og: { enabled: true, outputDir: 'og' },
      sitemap: { enabled: true },
      validate: { strict: true },
    }),
  ],
});
```

## Build Output

```
dist/
├── index.html
├── og/
│   ├── index.png
│   ├── products/widget-pro.png
│   └── blog/my-first-post.png
├── sitemap.xml
└── robots.txt
```

## Schema Types (v1)

Priority schema.org types for initial release:

1. Product
2. Article / BlogPosting
3. Organization
4. BreadcrumbList
5. FAQPage / Question
6. WebSite
7. Person
8. Review / AggregateRating
9. Offer
10. ImageObject

## Dependencies

```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  },
  "optionalDependencies": {
    "satori": "^0.10.0",
    "@resvg/resvg-js": "^2.6.0"
  }
}
```

Optional deps for OG generation keeps core lightweight.

## Implementation Phases

### Phase 1: Core + AI Foundation
- [ ] `useSEO` hook with meta tag management
- [ ] 5-6 schema builders (Product, Article, Organization, BreadcrumbList, FAQ, WebSite)
- [ ] Self-documenting types with rich JSDoc (examples, constraints, recommendations)
- [ ] Introspection API: `describe()`, `validate()`, `preview()`
- [ ] Actionable error messages with fix suggestions

### Phase 2: Presets + OG Images
- [ ] Intent-based presets (ecommerce, blog, saas, docs)
- [ ] Satori integration for OG images
- [ ] 4 built-in templates (simple, article, product, profile)
- [ ] Custom template support
- [ ] Font handling

### Phase 3: Vite Plugin + Build-Time
- [ ] Route discovery
- [ ] Build-time OG generation
- [ ] Sitemap generation
- [ ] Build-time validation warnings/errors

### Phase 4: AI Tooling + Polish
- [ ] AI.md context-efficient documentation
- [ ] TOOLS.json with MCP/function-calling definitions
- [ ] Example files for each preset
- [ ] Documentation site
- [ ] More schema types
- [ ] Edge runtime support (optional)

## Competitive Landscape

### Meta Tag Management

| Package | Downloads | Strengths | Weaknesses |
|---------|-----------|-----------|------------|
| **react-helmet** | ~3M/week | De facto standard, simple API | Unmaintained, no SSR, runtime-only |
| **react-helmet-async** | ~1.5M/week | SSR support, maintained | Just meta tags, no structured data |
| **@americanexpress/react-seo** | ~5K/week | Clean API, OG + Twitter | No structured data, limited adoption |
| **react-super-seo** | <1K/week | All-in-one meta tags | Small community, no build-time |

**Gap:** All are runtime-only. None integrate with build tooling.

### Structured Data

| Package | Downloads | Strengths | Weaknesses |
|---------|-----------|-----------|------------|
| **schema-dts** | ~100K/week | Google-backed, complete types, 1.1K stars | Types only, no rendering, no React integration |
| **react-schemaorg** | ~5K/week | Uses schema-dts, React component | Just renders JSON-LD, no validation, minimal features |
| **react-structured-data** | <1K/week | Simple API | 6 years unmaintained |

**Gap:** schema-dts provides types but no ergonomic builders. react-schemaorg is a thin wrapper. No validation, no DX.

### Next.js Specific

| Package | Downloads | Strengths | Weaknesses |
|---------|-----------|-----------|------------|
| **next-seo** | ~500K/week | Comprehensive, many JSON-LD components, well-maintained | **Next.js only**, won't work with Vite/CRA SPAs |

**JSON-LD components in next-seo:** ArticleJsonLd, RecipeJsonLd, OrganizationJsonLd, FAQPageJsonLd, ProductJsonLd, CourseJsonLd, and more.

**Gap:** This is what we want to build, but for any React SPA, not just Next.js.

### OG Image Generation

| Package | Downloads | Strengths | Weaknesses |
|---------|-----------|-----------|------------|
| **@vercel/og** | ~300K/week | Great DX, Satori-based | **Vercel Edge only**, no build-time |
| **satori** | ~400K/week | Core library, flexible | Low-level, requires setup, font pain |
| **satori-og** | <1K/week | Satori wrapper for SSGs | Astro-focused, limited templates |
| **remix-og-image** | <1K/week | Build-time, Playwright-based | Remix-only, heavy (browser screenshots) |
| **astro-opengraph-images** | ~3K/week | Build-time, good DX | Astro-only |

**Gap:** No framework-agnostic, Vite-compatible, build-time OG image solution with good DX.

### Sitemap Generation

Most solutions are framework-specific (next-sitemap, astro-sitemap) or disconnected from routing.

**Gap:** No integration between route config, SEO metadata, and sitemap generation for SPAs.

---

## Opportunity Summary

| Capability | Best Existing | Our Advantage |
|------------|---------------|---------------|
| Meta tags | react-helmet | Build-time + runtime, validation |
| Structured data | next-seo (Next only) | Framework-agnostic, typed builders |
| OG images | @vercel/og (Vercel only) | Build-time, any host, templates |
| Sitemap | Separate tools | Integrated with routes |
| Validation | None | Build-time errors, dev warnings |
| **AI usability** | **None** | **Intent API, introspection, MCP tools** |

**The opportunity:** next-seo's feature set + @vercel/og's DX, but framework-agnostic and **AI-native**.

No existing SEO library is designed for AI agents. They all assume a human reading docs. We can be first.

---

## Package Name

**`react-headgear`** - Confirmed available on npm.

Why it works:
- Plays on "helmet" (the incumbent) but distinct
- "Headgear" = gear for your document head
- Memorable, easy to type
- No conflicts with existing packages

---

## Open Questions

1. Should we wrap schema-dts types or create our own simplified subset?
2. Build-time OG: Satori (fast, limited CSS) vs Playwright (slow, pixel-perfect)?
3. How to handle dynamic routes without a server (data loaders at build time)?
4. Should v1 include sitemap generation or defer to Phase 2?

---

## AI-Native Differentiation

### Why This Matters Now

- **AI coding assistants are mainstream**: Claude, Cursor, Copilot are writing production code
- **Libraries compete for AI attention**: The library an AI can use correctly wins adoption
- **First-mover advantage**: No SEO library is AI-native today

### How We Win

1. **Discoverability**: AI finds us via types, not docs
2. **Correctness**: Introspection API prevents mistakes before they happen
3. **Efficiency**: Presets reduce tokens needed to accomplish task
4. **Recoverability**: Actionable errors guide AI to fix issues

### Success Metrics

- AI can implement correct SEO for a product page in < 5 messages
- Zero "undefined is not a function" errors from AI-generated code
- AI prefers seo-kit over react-helmet when given a choice
- MCP tool adoption by Claude Code, Cursor, etc.

---

## Sample AI.md (Ships with Package)

```markdown
# react-headgear

SEO for React SPAs. Meta tags, structured data, OG images.

## Quick Start (90% of use cases)

\`\`\`typescript
import { useHeadgear, presets } from 'react-headgear';

// Product page
useHeadgear(presets.ecommerce.productPage({
  name: 'Widget Pro',
  price: 29.99,
  currency: 'USD',
  image: '/widget.png',
}));

// Blog post
useHeadgear(presets.blog.articlePage({
  title: 'My Post',
  author: { name: 'Jane' },
  publishedAt: '2025-01-15',
}));

// SaaS landing
useHeadgear(presets.saas.landingPage({
  title: 'My App',
  description: 'The best app',
}));
\`\`\`

## Available Presets

| Preset | Use Case |
|--------|----------|
| `presets.ecommerce.productPage` | Product detail pages |
| `presets.ecommerce.categoryPage` | Category/collection pages |
| `presets.blog.articlePage` | Blog posts, articles |
| `presets.blog.authorPage` | Author profile pages |
| `presets.saas.landingPage` | Marketing landing pages |
| `presets.saas.pricingPage` | Pricing comparison pages |

## Introspection (for validation)

\`\`\`typescript
import { describe, validate, preview } from 'react-headgear';

describe('ecommerce.productPage')  // What fields are required?
validate(config)                    // Is this config valid?
preview(config)                     // What will be generated?
\`\`\`

## Custom (when presets don't fit)

\`\`\`typescript
import { useHeadgear, Product, ogImage } from 'react-headgear';

useHeadgear({
  title: 'Page Title',
  description: 'Page description',
  schema: [Product({ name: '...', price: 29.99 })],
  ogImage: ogImage({ template: 'product', props: {...} }),
});
\`\`\`
\`\`\`
```

---

## Sample TOOLS.json (MCP/Function Calling)

```json
{
  "tools": [
    {
      "name": "seo_describe_preset",
      "description": "Get required and optional fields for an SEO preset",
      "parameters": {
        "type": "object",
        "properties": {
          "preset": {
            "type": "string",
            "enum": ["ecommerce.productPage", "ecommerce.categoryPage", "blog.articlePage", "blog.authorPage", "saas.landingPage", "saas.pricingPage"],
            "description": "The preset to describe"
          }
        },
        "required": ["preset"]
      }
    },
    {
      "name": "seo_validate_config",
      "description": "Validate an SEO configuration and get actionable errors",
      "parameters": {
        "type": "object",
        "properties": {
          "preset": { "type": "string" },
          "data": { "type": "object" }
        },
        "required": ["preset", "data"]
      }
    },
    {
      "name": "seo_preview_output",
      "description": "Preview the meta tags, JSON-LD, and OG image that will be generated",
      "parameters": {
        "type": "object",
        "properties": {
          "preset": { "type": "string" },
          "data": { "type": "object" }
        },
        "required": ["preset", "data"]
      }
    }
  ]
}
```
