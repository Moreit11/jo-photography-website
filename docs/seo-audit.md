# SEO Audit — Jo Smith Photography
**Target keyword focus:** Photographer Dundee (homepage) · Wedding Photographer Dundee (services)  
**Audit date:** 2026-04-23  
**Stack:** Eleventy (11ty) + Nunjucks + Tailwind CSS

| | URL |
|---|---|
| **Production (main)** | https://jos-photography.netlify.app/ |
| **SEO branch** | https://jo-photography-seo-optimised.netlify.app/ |
| **Custom domain** | https://josphotography.com |

---

## On-Page SEO

### What Is Working Well

- **Unique title tags on 4 of 5 pages** — titles are keyword-rich and descriptive
- **Good heading hierarchy** — logical h1 → h2 → h3 flow on most pages
- **"Dundee" mentioned 15+ times** — in page titles, body copy, meta descriptions, and the services URL
- **Scottish context throughout** — references to Scottish Highlands, coastal landscapes, Edinburgh, Aberdeen, Perth, Glasgow
- **Services URL slug** — `/photography-services-dundee/` contains both service type and location keyword
- **Clean, keyword-rich URL structure** — all URLs use hyphens, no query strings or IDs
- **Strong About page** — personal bio, 10+ years experience, Scottish background, service specialisations
- **Five client testimonials** — star ratings and quotes from clients across Scottish cities (social proof)
- **Contact details visible** — email, phone, and location (Dundee, Scotland) all on the page
- **Alt text present on all images** — every gallery and service image has an alt attribute
- **Open Graph tags on every page** — `og:title`, `og:description`, `og:type`, `og:url`, `og:image`

---

### Keyword Strategy by Page

Each page should target one primary keyword and support it through the title tag, H1, meta description, and body copy. Currently most pages share the same generic keywords — the table below shows the intended target for each page and what needs to change.

| Page | URL | Primary keyword | Secondary keywords |
|---|---|---|---|
| **Homepage** | `/` | `photographer Dundee` | nature photographer Dundee, photography Dundee |
| **Wedding Photography** | `/wedding-photography-dundee/` | `wedding photographer Dundee` | Scottish wedding photographer, wedding photography Scotland |
| **Couple Photography** | `/couple-photography-dundee/` | `couple photographer Dundee` | couples photoshoot Dundee, couples photography Scotland |
| **Engagement Photoshoot** | `/engagement-photoshoot-dundee/` | `engagement photographer Dundee` | engagement photos Scotland, pre-wedding shoot Dundee |
| **About** | `/about-me/` | `photographer Dundee Jo Smith` | about Jo Smith photographer, Dundee photographer biography |
| **Portfolio** | `/photography-portfolio/` | `photography portfolio Dundee` | nature photography Scotland, landscape photography portfolio |
| **Contact** | `/contact/` | `book photographer Dundee` | contact Jo Smith photography, photography enquiries Dundee |

#### How to apply this in Eleventy

Each page's `meta_title`, `meta_description`, and `heroTitle` in front matter should lead with or contain the target keyword. The H1 on each page should match or closely echo the primary keyword.

**Homepage example (`src/index.md`):**
```yaml
meta_title: "Photographer Dundee | Jo Smith Photography"
meta_description: "Jo Smith is a professional photographer based in Dundee, Scotland. Specialising in wedding, couple, and engagement photography across Tayside and the Scottish Highlands."
heroTitle: "Dundee Photographer"
heroSubtitle: "Wedding, couple & engagement photography in Dundee and across Scotland"
```

**Wedding Photography page (`src/pages/wedding-photography.md`):**
```yaml
meta_title: "Wedding Photographer Dundee | Jo Smith Photography"
meta_description: "Professional wedding photographer based in Dundee. Capturing natural, emotional moments on your special day across Scotland. Book a free consultation today."
heroTitle: "Wedding Photographer Dundee"
```

---

### What Needs Improved

#### Missing `<meta name="description">` tag
The description is only in the Open Graph tag (`og:description`). There is no standard `<meta name="description">` in `<head>`. Google uses the standard tag for search result snippets — without it, Google auto-generates one, which is rarely ideal.

**File:** `src/_includes/head.njk` — add below the `<title>` tag:
```html
<meta name="description" content="{{ meta_description }}">
```

---

#### Page titles are not optimised for target keywords

Every page currently targets a generic variation of "nature photography" rather than the specific keyword each page should own. The homepage in particular needs to lead with "photographer Dundee" — the broadest, highest-volume local search term. Wedding-related pages need to target "wedding photographer Dundee" explicitly.

| Page | Current title | Target keyword | Recommended title |
|---|---|---|---|
| Homepage | `"Nature Photographer in Dundee"` | `photographer Dundee` | `"Photographer Dundee \| Jo Smith Photography"` |
| About | `"Nature Photographer in Dundee"` | `photographer Dundee Jo Smith` | `"About Jo Smith \| Photographer in Dundee"` |
| Portfolio | `"Nature Photography Portfolio"` | `photography portfolio Dundee` | `"Photography Portfolio \| Jo Smith, Dundee"` |
| Services | `"Nature Photography Services"` | `photography services Dundee` | `"Photography Services Dundee \| Jo Smith"` |
| Wedding Photography | *(new page)* | `wedding photographer Dundee` | `"Wedding Photographer Dundee \| Jo Smith Photography"` |
| Couple Photography | *(new page)* | `couple photographer Dundee` | `"Couple Photographer Dundee \| Jo Smith Photography"` |
| Engagement Photoshoot | *(new page)* | `engagement photographer Dundee` | `"Engagement Photographer Dundee \| Jo Smith Photography"` |

**Fix — update `meta_title` in each page's front matter:**
```yaml
# src/index.md
meta_title: "Photographer Dundee | Jo Smith Photography"

# src/pages/about.md
meta_title: "About Jo Smith | Photographer in Dundee"

# src/pages/portfolio.md
meta_title: "Photography Portfolio | Jo Smith, Dundee"

# src/pages/services.md
meta_title: "Photography Services Dundee | Jo Smith"
```

The H1 on each page should also echo the primary keyword. The homepage `heroTitle` should change from `"Jo Smith Photography"` to `"Photographer in Dundee"` or similar so the keyword appears in the most prominent heading on the page.

---

#### Duplicate H1 on the Contact page
The contact page has two `<h1>` tags — one in the hero ("Contact") and one below ("Get in Touch"). Each page must have exactly one `<h1>`.

**File:** `src/_includes/contact.njk` — change the second `<h1>` to `<h2>`.

---

#### Duplicate heading text on the Portfolio page
The portfolio page uses "My Portfolio" as both the hero `<h1>` and the gallery section `<h2>` (via `galleryTitle: "My Portfolio"` in front matter). Repeated heading text signals unclear page hierarchy.

**File:** `src/pages/portfolio.md` — change `galleryTitle`:
```yaml
galleryTitle: "Nature & Landscape Work"
```

---

#### Alt text is too generic
Alt text is present on all images (good), but most descriptions are short and vague. They miss the opportunity to include location and context keywords that help Google Images and screen readers.

| Image | Current alt | Suggested alt |
|---|---|---|
| `castle-on-lake.webp` | "Castle on lake" | "Ancient castle reflected in a Scottish loch" |
| `highland-cow.webp` | "Highland cow" | "Highland cow in a misty Scottish glen" |
| `mountain-landscape.webp` | "Mountain landscape" | "Mountain landscape in the Scottish Highlands" |
| `quiet-costal-cliff.webp` | "Quiet coastal cliff" | "Quiet coastal cliffs on the Scottish east coast near Dundee" |
| `woman-yellow-hat.webp` | "Woman in yellow hat" | "Portrait of woman in yellow hat in Scottish countryside" |
| `small-river.webp` | "Small river" | "Peaceful river flowing through Scottish woodland" |

Additionally, the lightbox modal image (`src/_includes/gallery.njk` line 34) has `alt=""` — empty alt is an accessibility and SEO flag.

**Fix — lightbox image:**
```html
<img class="lightbox__img" id="lightbox-img" ... alt="Enlarged gallery photo">
```

**Fix — update alt values in:** `src/index.md` and `src/pages/portfolio.md`

---

#### Broken Open Graph image
The `og:image` tag points to `https://josphotography/og-image.jpg` — `.com` is missing from the domain and the image file does not exist in the project. This means no image preview appears when the site is shared on social media.

**Fix:**
1. Create a 1200×630px OG image at `src/assets/media/og-image.jpg`
2. Update `src/_includes/head.njk`: `content="https://josphotography.com/assets/media/og-image.jpg"`

---

#### Missing Twitter / X Card tags
No Twitter Card meta tags are set. When shared on Twitter/X, no preview card will display.

**Fix — add to `src/_includes/head.njk`:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ meta_title }}">
<meta name="twitter:description" content="{{ meta_description }}">
<meta name="twitter:image" content="https://josphotography.com/assets/media/og-image.jpg">
```

---

#### Missing Open Graph locale and site name
```html
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="Jo Smith Photography">
```

---

#### Social media links are placeholders
Footer links point to `https://instagram.com`, `https://facebook.com`, `https://pinterest.com` with no profile slugs. These provide no SEO value and look unfinished to visitors.

**Fix:** Update each link to the real profile URL, e.g. `https://www.instagram.com/josmithphotography/`

---

#### Recommended Menu Structure

The current flat menu (About Me, Portfolio, Services, Contact) buries individual service types. A Services dropdown with named sub-pages improves usability and gives each service its own indexed URL.

**Proposed menu:**
```
Services ▾
  ├─ Wedding Photography      → /wedding-photography-dundee/
  ├─ Couple Photography       → /couple-photography-dundee/
  └─ Engagement Photoshoot    → /engagement-photoshoot-dundee/
About                         → /about-me/
Portfolio                     → /photography-portfolio/
Contact                       → /contact/
```

Each sub-page uses the Eleventy Navigation `parent` key:
```yaml
eleventyNavigation:
  key: "Wedding Photography"
  parent: "Services"
  order: 1
```

| Sub-page | URL | Meta title |
|---|---|---|
| Wedding Photography | `/wedding-photography-dundee/` | `Wedding Photographer Dundee \| Jo Smith Photography` |
| Couple Photography | `/couple-photography-dundee/` | `Couple Photographer Dundee \| Jo Smith Photography` |
| Engagement Photoshoot | `/engagement-photoshoot-dundee/` | `Engagement Photographer Dundee \| Jo Smith Photography` |

The CSS will need updating: `.primary-nav ul` should become `.primary-nav > ul` for the mobile overlay, with a separate `.primary-nav ul ul` rule for the desktop dropdown panel.

---

#### Hero CTA — "Get a Free Quote" button

The homepage hero has one CTA ("View Portfolio"). Adding a second button gives visitors an immediate conversion path.

**`src/_includes/hero.njk`** — add a second optional button slot:
```html
{% if heroButtonSecondary %}
<a href="{{ heroButtonSecondaryLink if heroButtonSecondaryLink else '/contact' }}"
   class="hero__btn hero__btn--outline">{{ heroButtonSecondary }}</a>
{% endif %}
```

**`src/index.md`** — add to front matter:
```yaml
heroButtonSecondary: "Get a Free Quote"
heroButtonSecondaryLink: "/contact/"
```

**CSS:**
```css
.hero__btn--outline {
    background: transparent;
    border: 2px solid var(--col-light);
    margin-left: var(--space-s);
}
.hero__btn--outline:hover {
    background: var(--col-light);
    color: var(--col-dark);
}
```

---

#### Keyword Opportunities

The table below maps the most valuable search terms to the page that should rank for them. Terms are grouped by intent — broad local terms sit at the top, niche long-tail terms at the bottom.

| Keyword | Monthly searches (est.) | Target page | Priority |
|---|---|---|---|
| photographer Dundee | High | Homepage | High |
| wedding photographer Dundee | High | `/wedding-photography-dundee/` | High |
| couple photographer Dundee | Medium | `/couple-photography-dundee/` | High |
| engagement photographer Dundee | Medium | `/engagement-photoshoot-dundee/` | High |
| photography Dundee | High | Homepage | Medium |
| nature photographer Dundee | Medium | Homepage / About | Medium |
| landscape photographer Scotland | Medium | Portfolio, About | Medium |
| Scottish wedding photographer | Medium | Wedding page | Medium |
| engagement photos Scotland | Low–Medium | Engagement page | Low |
| photography prints Scotland | Low | Services / About | Low |

---

## Technical SEO

### What Is Working Well

- **WebP images throughout** — all 13 portfolio images in modern WebP format (56K–389K)
- **Lazy loading on all images** — `loading="lazy"` applied across galleries and service cards
- **Responsive, mobile-first design** — viewport meta tag set, layout adapts correctly
- **Static site generation** — Eleventy pre-renders HTML; no server-side processing, fast TTFB
- **Semantic HTML structure** — proper `<main>`, `<nav>`, `<footer>`, ARIA labels on social icons
- **Google Fonts preconnect** — DNS prefetch + preconnect to `googleapis.com` reduces font load time
- **Embedded Google Map** — Dundee location shown in footer, `title` attribute set on iframe
- **Netlify hosting** — global CDN, automatic HTTPS, form handling built in

---

### What Needs Improved

#### No www / non-www redirect (301)
Without a redirect rule, `www.josphotography.com` and `josphotography.com` are treated as two separate sites by crawlers. This splits link equity and can create duplicate content in the index.

**Fix — create `netlify.toml` in the project root:**
```toml
[[redirects]]
  from   = "https://www.josphotography.com/*"
  to     = "https://josphotography.com/:splat"
  status = 301
  force  = true
```
Confirm the chosen canonical version matches the `og:url` and canonical tag values throughout.

---

#### No canonical tags
No page declares a preferred canonical URL. Google must guess which version is authoritative (trailing slash vs none, http vs https, www vs non-www).

**Fix — add to `src/_includes/head.njk`:**
```html
<link rel="canonical" href="{{ site.url }}{{ page.url }}">
```

---

#### No `sitemap.xml`
Google cannot reliably discover all pages without a sitemap. With five pages now and more planned, this should be generated automatically.

**Fix — install the Eleventy sitemap plugin:**
```bash
npm install @11ty/eleventy-plugin-sitemap
```
Or create `src/sitemap.njk` manually with one `<url>` block per page and `permalink: /sitemap.xml`.

---

#### No `robots.txt`
Crawlers receive no instructions on what to index or where the sitemap is.

**Fix — create `src/robots.njk`** with `permalink: /robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://josphotography.com/sitemap.xml
```

---

#### No schema / structured data (JSON-LD)
This is the biggest gap for local SEO. Without structured data, Google cannot machine-read that this is a local photography business in Dundee — it has to infer it from body text alone.

**Missing schemas:**
- `ProfessionalService` / `LocalBusiness` — name, address, phone, email, service area
- `Service` — one block each for Wedding, Couple, and Engagement photography
- `AggregateRating` + `Review` — the five existing testimonials can feed these directly
- `BreadcrumbList` — once the service sub-pages are created

**Minimum viable fix — add to `src/_includes/head.njk`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Jo Smith Photography",
  "url": "https://josphotography.com",
  "logo": "https://josphotography.com/assets/media/Jo-smith-photography-logo.png",
  "email": "info@josmithphotography.com",
  "telephone": "+44-123-456-7890",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dundee",
    "addressRegion": "Scotland",
    "addressCountry": "GB"
  },
  "areaServed": ["Dundee", "Scottish Highlands", "Scotland"],
  "serviceType": ["Wedding Photography", "Couple Photography", "Engagement Photography"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "5"
  }
}
</script>
```

---

#### No favicon declared in HTML
No `<link rel="icon">` tag exists in `head.njk`. Browsers show a blank tab icon, and several audit tools flag this as an error. It also affects brand trust.

**Fix — add to `src/_includes/head.njk`** (after charset meta):
```html
<link rel="icon" type="image/png" href="/assets/media/Jo-smith-photography-logo.png">
<link rel="apple-touch-icon" href="/assets/media/Jo-smith-photography-logo.png">
```
Ideally create a dedicated square 32×32px favicon rather than reusing the full logo, but the logo is a usable short-term fix.

---

#### Missing testimonial images
The testimonials template references images at `/assets/media/testimonials/sarah.jpg`, `james.jpg`, etc. — the directory does not exist. This generates broken network requests on every page that includes the testimonials section.

**Fix:** Either add the actual photos to `src/assets/media/testimonials/`, or remove the `<img>` tags and use initials/avatar placeholders instead.

---

#### Images missing width and height attributes
No gallery or service image has explicit `width` and `height` attributes. Without them, the browser cannot reserve space before images load, causing layout shift — a Core Web Vitals metric (CLS) that directly affects ranking.

**Fix:** Add `width` and `height` to every `<img>` tag matching the image's natural pixel dimensions.

---

#### Header padding missing
The `<header>` element has `class=""` (empty) and no CSS rule in `styles.css`. The logo and nav sit flush against the viewport edges with no breathing room.

**Fix — add to `src/assets/css/styles.css`:**
```css
header {
    padding: var(--space-s) var(--space-m);
    background: var(--col-light);
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}
```

`position: sticky` also keeps the nav visible as users scroll, reducing bounce on long pages.

**Secondary:** The header container uses `align-center` which is not a valid Tailwind class — change to `items-center` in `src/_includes/header.njk` to fix vertical alignment of logo and nav links.

---

#### No breadcrumb navigation
Breadcrumbs help Google understand site hierarchy and unlock richer search result display. They become especially valuable once service sub-pages are added.

Add a breadcrumb component to inner pages with a matching `BreadcrumbList` JSON-LD block.

---

#### Google Business Profile (off-site)
A verified Google Business Profile for "Jo Smith Photography" in Dundee is the single most impactful action for appearing in the local map pack. The embedded map in the footer helps, but a verified profile is what drives map pack rankings.

---

## Performance (Lighthouse Results)

Tested against the live Netlify deployment.

| Metric | Result | Target |
|---|---|---|
| First Contentful Paint | 2.1 s | < 1.8 s |
| Largest Contentful Paint | 4.3 s | < 2.5 s |
| Total Blocking Time | 520 ms | < 200 ms |
| Cumulative Layout Shift | 0 | < 0.1 ✅ |
| Speed Index | 2.1 s | < 3.4 s ✅ |

CLS is perfect. FCP, LCP, and TBT all need improvement.

---

#### Oversized images — 1,573 KiB wasted per page load
Every homepage gallery image is served at 1900px wide but displayed at ~495px. The browser downloads far more data than the screen needs.

| Image | File size | Displayed at | Est. saving |
|---|---|---|---|
| `small-river.webp` | 383 KiB | 495×391px | 357 KiB |
| `mountain-landscape-yellow.webp` | 318 KiB | 495×330px | 296 KiB |
| `woman-yellow-hat.webp` | 317 KiB | 495×330px | 296 KiB |
| `quiet-costal-cliff.webp` | 314 KiB | 495×330px | 293 KiB |
| `highland-cow.webp` | 221 KiB | 495×330px | 206 KiB |
| `Jo-smith-photography-logo.png` | 124 KiB | 114×63px | ~123 KiB |

**Fix — use `srcset` for responsive delivery:**
```html
<img
  src="/assets/media/small-river.webp"
  srcset="/assets/media/small-river-500.webp 500w,
          /assets/media/small-river-900.webp 900w,
          /assets/media/small-river.webp 1900w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Peaceful river flowing through Scottish woodland"
  loading="lazy">
```
The logo should also be resized to 228×97px (2× display size for retina) and converted to WebP.

---

#### Render-blocking CSS — 550 ms delay
Four stylesheets block the initial render:

| Resource | Block duration |
|---|---|
| Font Awesome (`cdnjs.cloudflare.com`) | 1,110 ms |
| Google Fonts | 810 ms |
| Splide CSS (`cdn.jsdelivr.net`) | 810 ms |
| `tailwind.css` (local, 9 KiB) | ~535 ms |

**Fixes:**
- **Font Awesome:** Self-host only the icon subset actually used, rather than loading `all.min.css` from CDN
- **Splide CSS:** Bundle locally rather than loading from CDN
- **Google Fonts:** Use `media="print" onload="this.media='all'"` pattern to load non-critically
- **`tailwind.css`:** Preload it — `<link rel="preload" as="style" href="/assets/tailwind/tailwind.css">`

---

#### Hero image not prioritised (LCP at 4.3 s)
The hero section is the LCP element but has no `fetchpriority` hint. The browser discovers and loads it late, delaying the largest contentful paint.

**Fix — on the hero image or background:**
```html
<img src="..." fetchpriority="high" loading="eager" ...>
```
Do not apply `loading="lazy"` to the LCP element — lazy loading the hero actively delays the most important paint on every page load.

---

#### JavaScript dependency chain (728 ms)
`main.js` imports `splide.esm.js` from CDN (25 KiB), creating a blocking chain:
`HTML → main.js → CDN → splide.esm.js`

**Fix:** Bundle Splide locally or load it with a `<script defer>` tag in `<head>` rather than as a dynamic ESM import.

---

#### Logo served as PNG (124 KiB)
The logo is the only non-WebP file on the site. Converting it to WebP saves ~106 KiB on every page load.

**Fix:** Export a 228×97px WebP version and update the `<img>` src in `src/_includes/header.njk`.

---

#### CSS not minified in production
The built `tailwind.css` is 41 KiB with whitespace. Minification would reduce this significantly.

**Fix:** Add `cssnano` to the PostCSS config for production builds, or pass `--minify` to the Eleventy build command.

---

## Priority Action List

### On-Page SEO

| # | Fix | File | Status |
|---|---|---|---|
| 1 | ~~Add `<meta name="description">` tag~~ | `head.njk` | ✅ Done |
| 2 | Fix About page title (duplicate of homepage) | `about.md` | To do |
| 3 | Fix Portfolio page title (add Dundee) | `portfolio.md` | To do |
| 4 | Fix duplicate H1 on Contact page | `contact.njk` | To do |
| 5 | Fix duplicate heading text on Portfolio page | `portfolio.md` | To do |
| 6 | Improve alt text on all gallery images | `index.md`, `portfolio.md` | To do |
| 7 | Fix empty `alt=""` on lightbox image | `gallery.njk` | To do |
| 8 | Fix broken OG image URL + create OG image | `head.njk` + new asset | To do |
| 9 | Add Twitter Card meta tags | `head.njk` | To do |
| 10 | Add `og:locale` and `og:site_name` | `head.njk` | To do |
| 11 | Update social media links to real profiles | `footer.njk` | To do |
| 12 | Restructure nav with Services dropdown + 3 sub-pages | Multiple files | To do |
| 13 | Add "Get a Free Quote" button to homepage hero | `hero.njk`, `index.md` | To do |

### Technical SEO

| # | Fix | File | Status |
|---|---|---|---|
| 1 | Add 301 redirect www → non-www | `netlify.toml` (new file) | To do |
| 2 | Add canonical tags | `head.njk` | To do |
| 3 | ~~Create `sitemap.xml`~~ | `src/sitemap.njk` | ✅ Done |
| 4 | ~~Create `robots.txt`~~ | `src/robots.njk` | ✅ Done |
| 5 | Add LocalBusiness JSON-LD schema | `head.njk` | To do |
| 6 | Add favicon markup | `head.njk` | To do |
| 7 | Fix or remove broken testimonial images | `testimonials.njk` | To do |
| 8 | Add image width/height attributes | `gallery.njk`, `services.njk` | To do |
| 9 | Fix header padding + `items-center` class | `styles.css`, `header.njk` | To do |
| 10 | Add AggregateRating + Review schema for testimonials | `head.njk` | To do |
| 11 | Add breadcrumb nav + BreadcrumbList schema | New component | To do |
| 12 | Register Google Business Profile (Dundee) | Off-site | To do |

### Performance

| # | Fix | Effort |
|---|---|---|
| 1 | Add `srcset` responsive images — saves ~1.5 MB | Medium |
| 2 | Remove `loading="lazy"` from hero, add `fetchpriority="high"` | Low |
| 3 | Convert logo to WebP, resize to display dimensions | Low |
| 4 | Reduce render-blocking CSS (Font Awesome, Splide CDN) | Medium |
| 5 | Bundle Splide locally, remove ESM CDN import chain | Medium |
| 6 | Minify CSS in production build | Low |

---

## Summary

The site has a solid foundation — modern image formats, semantic HTML, fast static generation, and good Dundee/Scotland content throughout.

**Keyword targeting** is the most immediate on-page priority. The homepage should own "photographer Dundee" — currently it targets "nature photographer in Dundee" which is narrower and lower volume. The three new service sub-pages (wedding, couple, engagement) will each target their own high-intent local keyword and collectively make the site far more competitive across the full range of photography searches in Dundee.

**Technical:** no structured data means Google can't confidently categorise this as a local Dundee photography business. No sitemap, robots.txt, or canonical tags leave indexing to chance. The www redirect consolidates link equity into one version of the domain.

**Performance:** LCP at 4.3 s is the most urgent metric. Serving 1900px images to 495px containers wastes 1.5 MB per page load — `srcset` alone would bring LCP under the 2.5 s target.

The three highest-impact changes in order:
1. Fix title tags and H1s to target "photographer Dundee" (homepage) and "wedding photographer Dundee" (wedding page) — low effort, immediate ranking signal
2. Add LocalBusiness JSON-LD schema — tells Google definitively that this is a Dundee photography business
3. Create the three service sub-pages — turns one generic Services page into three keyword-targeted landing pages
