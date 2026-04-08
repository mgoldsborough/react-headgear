// src/schema/builders.ts
function Product(props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: props.name
  };
  if (props.description) schema.description = props.description;
  if (props.image) schema.image = props.image;
  if (props.sku) schema.sku = props.sku;
  if (props.brand) {
    schema.brand = {
      "@type": "Brand",
      name: typeof props.brand === "string" ? props.brand : props.brand.name
    };
  }
  if (props.price !== void 0) {
    const availability = props.availability ? `https://schema.org/${props.availability}` : void 0;
    schema.offers = {
      "@type": "Offer",
      price: props.price,
      priceCurrency: props.currency || "USD",
      ...availability && { availability }
    };
  }
  if (props.rating !== void 0 && props.reviewCount !== void 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: props.rating,
      reviewCount: props.reviewCount
    };
  }
  return schema;
}
function Article(props) {
  const authors = Array.isArray(props.author) ? props.author : [props.author];
  const authorSchemas = authors.map((a) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    ...a.url && { url: a.url }
  }));
  return {
    "@context": "https://schema.org",
    "@type": props.type || "Article",
    headline: props.headline,
    ...props.description && { description: props.description },
    ...props.image && { image: props.image },
    datePublished: props.datePublished,
    ...props.dateModified && { dateModified: props.dateModified },
    author: authorSchemas.length === 1 ? authorSchemas[0] : authorSchemas
  };
}
function Organization(props) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: props.name,
    ...props.url && { url: props.url },
    ...props.logo && { logo: props.logo },
    ...props.sameAs && { sameAs: props.sameAs }
  };
}
function Person(props) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: props.name,
    ...props.url && { url: props.url },
    ...props.image && { image: props.image },
    ...props.jobTitle && { jobTitle: props.jobTitle }
  };
}
function BreadcrumbList(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...item.url && { item: item.url }
    }))
  };
}
function FAQPage(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
function WebSite(props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: props.name,
    url: props.url
  };
  if (props.searchUrl) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: props.searchUrl,
      "query-input": "required name=search_term_string"
    };
  }
  return schema;
}
function Offer(props) {
  const availability = props.availability ? `https://schema.org/${props.availability}` : void 0;
  return {
    "@type": "Offer",
    price: props.price,
    priceCurrency: props.currency || "USD",
    ...availability && { availability },
    ...props.url && { url: props.url }
  };
}

export { Article, BreadcrumbList, FAQPage, Offer, Organization, Person, Product, WebSite };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map