import { useEffect } from "react";
import { BRAND } from "../../config/branding";

function ensureMeta(name, attribute = "name") {
  let tag = document.head.querySelector(`meta[${attribute}='${name}']`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  return tag;
}

function ensureCanonical(url) {
  let tag = document.head.querySelector("link[rel='canonical']");
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", url);
}

function ensureStructuredData(payload) {
  const selector = "script[data-seo='person-jsonld']";
  let script = document.head.querySelector(selector);

  if (!script) {
    script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("data-seo", "person-jsonld");
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(payload);
}

export default function SeoManager({ title, description, path = "/", image = "/og-image.png", keywords = [] }) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || "https://bassamworks.dev";
    const absolutePath = path.startsWith("/") ? path : `/${path}`;
    const canonical = `${siteUrl}${absolutePath}`;
    const fallbackKeywords = ["Full Stack Developer", "React", "Laravel", "Portfolio", "Frontend Engineer"];

    document.title = `${title} | ${BRAND.name}`;

    ensureMeta("description").setAttribute("content", description);
    ensureMeta("keywords").setAttribute("content", [...fallbackKeywords, ...keywords].join(", "));

    ensureMeta("og:title", "property").setAttribute("content", `${title} | ${BRAND.name}`);
    ensureMeta("og:description", "property").setAttribute("content", description);
    ensureMeta("og:type", "property").setAttribute("content", "website");
    ensureMeta("og:url", "property").setAttribute("content", canonical);
    ensureMeta("og:image", "property").setAttribute("content", `${siteUrl}${image}`);

    ensureMeta("twitter:card", "name").setAttribute("content", "summary_large_image");
    ensureMeta("twitter:title", "name").setAttribute("content", `${title} | ${BRAND.name}`);
    ensureMeta("twitter:description", "name").setAttribute("content", description);
    ensureMeta("twitter:image", "name").setAttribute("content", `${siteUrl}${image}`);

    ensureCanonical(canonical);

    ensureStructuredData({
      "@context": "https://schema.org",
      "@type": "Person",
      name: BRAND.name,
      jobTitle: BRAND.expertise,
      url: siteUrl,
      email: "mailto:hello@bassamworks.dev",
      sameAs: ["https://github.com"],
      knowsAbout: ["React", "Laravel", "GSAP", "Tailwind CSS", "REST APIs", "MySQL"],
    });
  }, [description, image, keywords, path, title]);

  return null;
}
