import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const siteUrl = "https://nebrex.ca";

const pages = [
  { source: "index.html", target: "src/pages/index.astro", path: "/" },
  { source: "services.html", target: "src/pages/services.html.astro", path: "/services.html" },
  { source: "pricing.html", target: "src/pages/pricing.html.astro", path: "/pricing.html" },
  { source: "process.html", target: "src/pages/process.html.astro", path: "/process.html" },
  { source: "customers.html", target: "src/pages/customers.html.astro", path: "/customers.html" },
  { source: "resources.html", target: "src/pages/resources.html.astro", path: "/resources.html" },
  { source: "contact.html", target: "src/pages/contact.html.astro", path: "/contact.html" },
  { source: "privacy.html", target: "src/pages/privacy.html.astro", path: "/privacy.html" },
  { source: "terms.html", target: "src/pages/terms.html.astro", path: "/terms.html" },
  { source: "results.html", target: "src/pages/results.html.astro", path: "/results.html" },
  { source: "solutions/hvac/index.html", target: "src/pages/solutions/hvac/index.astro", path: "/solutions/hvac/" },
  { source: "solutions/plumbing/index.html", target: "src/pages/solutions/plumbing/index.astro", path: "/solutions/plumbing/" },
  { source: "solutions/roofing/index.html", target: "src/pages/solutions/roofing/index.astro", path: "/solutions/roofing/" },
  { source: "solutions/electrical/index.html", target: "src/pages/solutions/electrical/index.astro", path: "/solutions/electrical/" }
];

const staticAssets = [
  "CNAME",
  "favicon.ico",
  "favicon-48x48.png",
  "favicon.svg",
  "googlefe3ff3435a943536.html",
  "humans.txt",
  "llms.txt",
  "robots.txt",
  "sitemap.xml"
];

function attr(source, selector) {
  const match = source.match(selector);
  return match ? decodeEntities(match[1]) : "";
}

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"');
}

function extractJsonLd(html) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  return match ? match[1].trim() : "";
}

function extractMain(html) {
  const match = html.match(/<main class="wrap" id="main-content">([\s\S]*?)<\/main>/i);
  if (!match) throw new Error("Missing main content");
  return match[1]
    .replaceAll("`r`n", "\n")
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="services.html"', 'href="/services.html"')
    .replaceAll('href="pricing.html"', 'href="/pricing.html"')
    .replaceAll('href="process.html"', 'href="/process.html"')
    .replaceAll('href="customers.html"', 'href="/customers.html"')
    .replaceAll('href="resources.html"', 'href="/resources.html"')
    .replaceAll('href="contact.html"', 'href="/contact.html"')
    .replaceAll('href="privacy.html"', 'href="/privacy.html"')
    .replaceAll('href="terms.html"', 'href="/terms.html"')
    .replaceAll('href="../../index.html"', 'href="/"')
    .replaceAll('href="../../services.html"', 'href="/services.html"')
    .replaceAll('href="../../pricing.html"', 'href="/pricing.html"')
    .replaceAll('href="../../process.html"', 'href="/process.html"')
    .replaceAll('href="../../customers.html"', 'href="/customers.html"')
    .replaceAll('href="../../resources.html"', 'href="/resources.html"')
    .replaceAll('href="../../contact.html"', 'href="/contact.html"')
    .replaceAll('href="solutions/hvac/index.html"', 'href="/solutions/hvac/"')
    .replaceAll('href="solutions/plumbing/index.html"', 'href="/solutions/plumbing/"')
    .replaceAll('href="solutions/roofing/index.html"', 'href="/solutions/roofing/"')
    .replaceAll('href="solutions/electrical/index.html"', 'href="/solutions/electrical/"')
    .replaceAll('<a class="btn btn-primary" href="/contact.html">Get Your Free Audit</a>', '<CtaButton />')
    .replaceAll('Get Your Free Audit', 'Book a Call')
    .replaceAll('Free Audit', 'Book a Call');
}

function extractPageScript(html) {
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)(?:[^>]*)>([\s\S]*?)<\/script>/gi)];
  return scripts.map((match) => match[1].replaceAll("`r`n", "\n").trim()).filter(Boolean).join("\n\n");
}

function pageFrontmatter(html, path) {
  const title = attr(html, /<title>([\s\S]*?)<\/title>/i);
  const description = attr(html, /<meta name="description" content="([^"]*)"/i);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/i) || `${siteUrl}${path === "/" ? "/" : path}`;
  const ogTitle = attr(html, /<meta property="og:title" content="([^"]*)"/i);
  const ogDescription = attr(html, /<meta property="og:description" content="([^"]*)"/i);
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]*)"/i) || canonical;
  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/i);
  const jsonLd = extractJsonLd(html);
  return { title, description, canonical, ogTitle, ogDescription, ogUrl, ogImage, jsonLd };
}

function astroPage({ meta, content, script }) {
  const ctaImport = content.includes("<CtaButton") ? '\nimport CtaButton from "../components/CtaButton.astro";' : "";
  return `---\nimport BaseLayout from "../layouts/BaseLayout.astro";${ctaImport}\n\nconst meta = ${JSON.stringify(meta, null, 2)};\n---\n\n<BaseLayout {...meta}>\n${content.trimEnd()}\n${script ? `\n  <script is:inline>\n${script.split("\n").map((line) => `    ${line}`).join("\n")}\n  </script>\n` : ""}</BaseLayout>\n`;
}

function astroNestedPage({ meta, content }) {
  const ctaImport = content.includes("<CtaButton") ? '\nimport CtaButton from "../../../components/CtaButton.astro";' : "";
  return `---\nimport BaseLayout from "../../../layouts/BaseLayout.astro";${ctaImport}\n\nconst meta = ${JSON.stringify(meta, null, 2)};\n---\n\n<BaseLayout {...meta}>\n${content.trimEnd()}\n</BaseLayout>\n`;
}

async function write(path, content) {
  const fullPath = join(root, path);
  await mkdir(dirname(fullPath), { recursive: true });
  await writeFile(fullPath, content);
}

await write("src/data/site.ts", `export const brand = {
  name: "Nebrex Automations",
  logoWord: "NEBREX",
  logoSub: "THE AI COMPANY",
  homeHref: "/",
  phoneHref: "tel:+14032200220",
  phoneLabel: "(403) 220-0220",
  emailHref: "mailto:contact@nebrex.ca",
  emailLabel: "contact@nebrex.ca",
  siteUrl: "${siteUrl}",
  footerText: "© 2026 Nebrex Automations. Made in Calgary, Alberta.",
  ctaLabel: "Book a Call",
  ctaHref: "/contact.html"
};

export const navLinks = [
  { label: "Services", href: "/services.html" },
  { label: "Customers", href: "/customers.html" },
  { label: "Pricing", href: "/pricing.html" },
  { label: "Resources", href: "/resources.html" }
];

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services.html" },
  { label: "Pricing", href: "/pricing.html" },
  { label: "Process", href: "/process.html" },
  { label: "Customers", href: "/customers.html" },
  { label: "Resources", href: "/resources.html" },
  { label: "Book a Call", href: "/contact.html" },
  { label: "Privacy", href: "/privacy.html" },
  { label: "Terms", href: "/terms.html" }
];

export const solutions = [
  { slug: "hvac", title: "HVAC", desc: "Lead response and booking workflows for HVAC teams", icon: "*" },
  { slug: "plumbing", title: "Plumbing", desc: "Missed-call recovery and quote follow-up for plumbers", icon: "+" },
  { slug: "roofing", title: "Roofing", desc: "Fast estimate follow-up and scheduling automation", icon: "#" },
  { slug: "electrical", title: "Electrical", desc: "Dispatch-ready intake and follow-up systems", icon: "=" }
];
`);

await write("src/components/Header.astro", `---\nimport { brand, navLinks, solutions } from "../data/site";\n---\n\n<header>\n  <div class="wrap">\n    <nav role="navigation" aria-label="Main navigation">\n      <a href={brand.homeHref} class="logo" aria-label={brand.name + " - home"}>\n        <img class="logo-image" src="/assets/nebrex-official-logo.png" alt="Nebrex | The AI Company" width="1172" height="281" decoding="async" />\n      </a>\n\n      <button class="mobile-menu-btn" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-links">\n        <span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span>\n      </button>\n\n      <div class="nav-links" id="nav-links">\n        <a href={navLinks[0].href}>{navLinks[0].label}</a>\n        <div class="nav-dropdown" id="solutionsDropdown">\n          <button class="nav-dropdown-toggle" type="button" aria-expanded="false" aria-haspopup="true">Solutions</button>\n          <div class="nav-dropdown-menu nav-solutions-menu" role="menu" aria-label="Solutions" data-solutions-menu="root">\n            {solutions.map((item) => (\n              <a href={"/solutions/" + item.slug + "/"} class="solution-item" role="menuitem">\n                <span class="solution-icon" aria-hidden="true">{item.icon}</span>\n                <span class="solution-copy">\n                  <strong>{item.title}</strong>\n                  <small>{item.desc}</small>\n                </span>\n              </a>\n            ))}\n          </div>\n        </div>\n        {navLinks.slice(1).map((link) => <a href={link.href}>{link.label}</a>)}\n        <a href={brand.ctaHref} class="nav-mobile-only nav-mobile-primary">{brand.ctaLabel}</a>\n      </div>\n\n      <div class="nav-actions">\n        <a href={brand.ctaHref} class="btn btn-primary nav-cta">{brand.ctaLabel}</a>\n      </div>\n    </nav>\n  </div>\n</header>\n`);

await write("src/components/Footer.astro", `---\nimport { brand, footerLinks } from "../data/site";\n---\n\n<footer>\n  <div class="wrap">\n    <p>{brand.footerText}</p>\n    <nav class="footer-nav" aria-label="Footer navigation">\n      {footerLinks.map((link, index) => (\n        <>\n          <a href={link.href}>{link.label}</a>\n          {index < footerLinks.length - 1 && <span aria-hidden="true">|</span>}\n        </>\n      ))}\n    </nav>\n  </div>\n</footer>\n`);

await write("src/components/CtaButton.astro", `---\nimport { brand } from "../data/site";\n\ninterface Props {\n  class?: string;\n}\n\nconst className = Astro.props.class || "btn btn-primary";\n---\n\n<a class={className} href={brand.ctaHref}>{brand.ctaLabel}</a>\n`);

await write("src/layouts/BaseLayout.astro", `---\nimport Header from "../components/Header.astro";\nimport Footer from "../components/Footer.astro";\nimport "../styles/global.css";\n\ninterface Props {\n  title: string;\n  description?: string;\n  canonical?: string;\n  ogTitle?: string;\n  ogDescription?: string;\n  ogUrl?: string;\n  ogImage?: string;\n  jsonLd?: string;\n}\n\nconst {\n  title,\n  description,\n  canonical,\n  ogTitle,\n  ogDescription,\n  ogUrl,\n  ogImage = "https://nebrex.ca/og-image.png",\n  jsonLd\n} = Astro.props;\n---\n\n<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>{title}</title>\n    {description && <meta name="description" content={description} />}\n    {canonical && <link rel="canonical" href={canonical} />}\n    <meta property="og:type" content="website" />\n    <meta property="og:title" content={ogTitle || title} />\n    {ogDescription || description ? <meta property="og:description" content={ogDescription || description} /> : null}\n    <meta property="og:url" content={ogUrl || canonical} />\n    <meta property="og:image" content={ogImage} />\n    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:image" content={ogImage} />\n    <link rel="icon" href="/favicon.ico" sizes="any" />\n    <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />\n    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n    <link rel="preconnect" href="https://fonts.googleapis.com" />\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Michroma&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />\n    {jsonLd && <script type="application/ld+json" set:html={jsonLd} />}\n  </head>\n  <body>\n    <div class="ambient-lines" aria-hidden="true"></div>\n    <a href="#main-content" class="skip-link">Skip to main content</a>\n    <Header />\n    <main class="wrap" id="main-content">\n      <slot />\n    </main>\n    <Footer />\n    <script src="/scripts/nav-solutions.js" defer></script>\n    <script src="/scripts/nav-main.js" defer></script>\n  </body>\n</html>\n`);

const styles = await readFile(join(root, "styles.css"), "utf8");
await write("src/styles/global.css", styles.replaceAll("`r`n", "\n"));

const mainNav = await readFile(join(root, "nav-main.js"), "utf8");
await write("public/scripts/nav-main.js", mainNav);

await write("public/scripts/nav-solutions.js", `(() => {
  function initDropdown(dropdown) {
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");
    const menu = dropdown.querySelector(".nav-solutions-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = dropdown.classList.contains("open");
      dropdown.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav-dropdown").forEach(initDropdown);
  });
})();
`);

for (const asset of staticAssets) {
  const destination = join(root, "public", asset);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(join(root, asset), destination);
}

for (const page of pages) {
  const html = await readFile(join(root, page.source), "utf8");
  const meta = pageFrontmatter(html, page.path);
  const content = extractMain(html);
  const script = extractPageScript(html);
  const isNested = page.target.includes("src/pages/solutions/");
  await write(page.target, isNested ? astroNestedPage({ meta, content }) : astroPage({ meta, content, script }));
}


