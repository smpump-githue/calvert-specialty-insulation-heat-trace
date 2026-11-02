# Calvert Specialty Contracting LLC: Insulation & Heat Trace Site

Single-page "under construction" site for Calvert Specialty Contracting LLC
(mechanical insulation and heat tracing).

> **About this version.** This is a copy of the `calvert-specialty-insulation` site with every mention
> of firestopping removed: the service card, the 07 84 00 spec line, the page title and descriptions,
> the slogan, the search-engine data, `llms.txt`, and the share picture. Everything else is the same.
> The two versions are fully separate: their own folder, their own GitHub repo, their own Cloudflare Worker.
> Only **one** of the two should hold `calvertspecialty.com` at a time.
> Changes made to one version are **not** copied to the other automatically.

Plain HTML, CSS, and JavaScript. No build step, no npm, nothing to install.

- **Suggested GitHub repo name:** `calvert-specialty-insulation-heat-trace`
- **Cloudflare project:** a Worker named `calvert-specialty-insulation-heat-trace` (not created yet). It will be at <https://calvert-specialty-insulation-heat-trace.smpump.workers.dev>.
  It's separate from the current live site. This repo does not share any files, folders, or branches
  with the other Calvert Specialty site.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole page: text, form, SEO tags |
| `styles.css` | All styling. Colors are at the top under `:root` |
| `script.js` | Mobile menu, form sending, footer year, Google Analytics |
| `images/logo.webp`, `images/logo.png` | Header logo (WebP for most browsers, PNG as backup) |
| `images/og-image.png` | 1200x630 picture shown when the link is shared |
| `favicon.ico`, `favicon.png`, `apple-touch-icon.png` | Browser tab and phone home-screen icons (the CSC mark) |
| `robots.txt` | Tells search engines and AI crawlers they can read the site |
| `llms.txt` | Plain-language company summary for AI tools |
| `404.html` | "Page not found" page for mistyped or old links (Cloudflare uses it automatically) |
| `_redirects` | Keeps this README private: sends `/README.md` to the home page |
| `sitemap.xml` | List of pages for search engines (just one) |
| `_headers` | Security headers (Cloudflare applies them; never shown to visitors) |
| `wrangler.jsonc` | Cloudflare settings: which folder to serve, and to use `404.html` for missing pages |
| `.assetsignore` | Files Cloudflare must **not** publish: `.git`, this README, `wrangler.jsonc` |

All links to CSS, JS, images, and icons are **relative** (`styles.css`, not `/styles.css` or a full URL),
so the site works the same on a `*.workers.dev` address, a subdomain, or the main domain.

---

## 1. Preview the site on your computer (Windows / PowerShell)

**Quick look:** double-click `index.html` in File Explorer. It opens in your browser.

**Better (acts like a real web server):** open PowerShell in this folder and run:

```powershell
cd "C:\Users\scpum\OneDrive\Documents\Claude\CSC\calvert-specialty-insulation-heat-trace"
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser. Press `Ctrl + C` in PowerShell to stop it.

Check it on a phone-sized screen: in Chrome or Edge press `F12`, then `Ctrl + Shift + M`.

Note: the `_headers` file only takes effect on Cloudflare, not locally. That's normal.

---

## 2. Push to GitHub

One-time setup:

1. Go to <https://github.com/new>.
2. Repository name: `calvert-specialty-insulation-heat-trace`. Private or Public, your choice.
   Do **not** check "Add a README" (you already have one). Click **Create repository**.
3. In PowerShell, in this folder:

```powershell
cd "C:\Users\scpum\OneDrive\Documents\Claude\CSC\calvert-specialty-insulation-heat-trace"
git init
git add .
git commit -m "Initial under-construction site"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/calvert-specialty-insulation-heat-trace.git
git push -u origin main
```

Every time after that, when you change something:

```powershell
git add .
git commit -m "Describe what you changed"
git push
```

Cloudflare rebuilds the site automatically within a minute or two of each push.

---

## 3. Connect the repo to Cloudflare

This site will run as a **Cloudflare Worker** called `calvert-specialty-insulation-heat-trace`, at <https://calvert-specialty-insulation-heat-trace.smpump.workers.dev>.
Every push to `main` on GitHub redeploys it automatically within a minute or two.
The settings Cloudflare uses are in `wrangler.jsonc` in this repo (including the Worker name),
so there's nothing to type into the dashboard besides picking the repo.

**To set it up:**

1. Log in at <https://dash.cloudflare.com>.
2. **Check the account name in the top-left corner.** It must be the account that has
   `calvertspecialty.com` in its domain list. A project in any other account can't use the domain.
3. Left menu: **Workers & Pages** → **Create** → **Import a repository** (Connect to Git).
4. Pick GitHub, select `calvert-specialty-insulation-heat-trace`, name it `calvert-specialty-insulation-heat-trace`, and deploy.
   Leave the build command blank. Cloudflare reads everything else from `wrangler.jsonc`.

**GitHub access, careful here:** Cloudflare reaches GitHub through one app, "Cloudflare Workers and Pages."
Its repository list is shared by **all** your websites. At <https://github.com/settings/installations> →
**Configure**, the selected repos must always include every site repo: `calvert-specialty-insulation`,
`calvert-specialty-insulation-heat-trace`, and `calvert-specialty-website`. Don't choose "All repositories": that would also give Cloudflare your
in-house repos (like `csc-bid-intake`). If a site repo drops off the list, that site
stops updating when you push.

> Cloudflare moves dashboard buttons around now and then. If a label doesn't match exactly,
> look for the closest thing.

---

## 4. Where to change things

| What | File | What to look for |
|---|---|---|
| **Phone** | `index.html` | Search `301-686-7967` and `+13016867967`. It appears in the hero "Call" button, the contact card, and the JSON-LD block (`"telephone"`) |
| **Email** | `index.html` | Search `info@calvertspecialty.com`. Contact card and JSON-LD block |
| **Residential site link** | `index.html` | `RESIDENTIAL-URL` in the footer. See [Residential site link](#residential-site-link) |
| **Formspree form ID** | `index.html` | `FORMSPREE:`. Currently `mbgdqpbz` in `https://formspree.io/f/mbgdqpbz` |
| **Google Analytics 4 ID** | `script.js` | Line near the top: `var GA4_ID = 'G-XXXXXXXXXX';` |
| **License / insurance** | `index.html` | `PLACEHOLDER (credentials)` (two spots: the "Why" section and the contact card) |
| **Colors** | `styles.css` | Top of the file under `:root`. Blue and red are taken from the logo |
| **Logo** | `images/` | See "Logo files" below |

### Formspree setup

1. Sign up at <https://formspree.io>, click **+ New Form**, name it "Bid invites", set the email it sends to.
2. Copy the form's endpoint. It looks like `https://formspree.io/f/xyzabcd`. The ID is the last part.
3. Paste that ID after `/f/` in the form's `action` in `index.html` (done: the site uses `mbgdqpbz`).
4. Send a test from the live `*.workers.dev` site. The first submission may ask you to confirm your email in Formspree.
5. If you turn on domain restrictions in Formspree, allow **both** `calvert-specialty-insulation-heat-trace.smpump.workers.dev` and `calvertspecialty.com`.

Until you add the ID, the form shows a message telling visitors to call or email instead.
The form already has a hidden "honeypot" field (`_gotcha`) that catches most spam bots.

### Google Analytics 4 setup

1. In GA4: **Admin** → **Data streams** → pick or create a Web stream for this site.
2. Copy the **Measurement ID** (starts with `G-`).
3. In `script.js`, replace `G-XXXXXXXXXX` with it. Commit and push.

While it says `G-XXXXXXXXXX`, analytics is off and no Google code loads.
(GA lives in `script.js` instead of the HTML so the security headers can block inline scripts.)

### Logo files

The web logo files were made from your originals in
`Documents\Calvert Specialty Contracting\Logo\Logo Files`:

- Header logo: `WK-Calvert Specialty Contracting-R6 LO-FF-01.png` (the version with transparency), trimmed and shrunk to 640px wide.
- Icons: `WK-Calvert Specialty Contracting_CSC only.jpg`, centered on a white square.

The originals (`.psd`, `.ai`, `.eps`) are 6806px wide and several MB. They are too big for a web page and
browsers can't show `.psd`/`.ai`/`.eps` at all, so don't copy them into this repo.

To swap in a different version of the logo, export a PNG with a transparent background, crop it tight,
resize it to 640px wide, and save it over `images/logo.png`. Then make `images/logo.webp` from it
(<https://squoosh.app> works), or just delete `logo.webp` and the `<source ...>` line above the logo in `index.html`.
If the new file isn't 640x75, update the `width` and `height` numbers on the logo `<img>` tag to match.

---

## 5. Adding photos and testimonials later

**Photos**

1. Make a folder named `images` in this project.
2. Shrink photos before adding them: about 1600px wide max, saved as `.webp` or `.jpg`, under ~300 KB each.
   (<https://squoosh.app> does this for free in the browser.)
3. In `index.html`, find the commented-out **PROJECTS** section. Remove the `<!--` and `-->` around it.
4. For each photo, copy the `<figure>` block. Use relative paths like `images/hospital-chw.webp`,
   write a real `alt` description of what's in the photo, and set `width` and `height` to the photo's real size.
5. Only use photos of work you actually did, and get the GC's or owner's OK before naming a project.

You'll want a little CSS for the photos. Add this to the bottom of `styles.css`:

```css
.project img { width: 100%; height: auto; border-radius: var(--radius); }
.project figcaption { color: var(--ink-muted); font-size: 0.95rem; margin-top: 0.5rem; }
```

**Testimonials**

1. Get the quote in writing (an email is fine) and ask if you can use their name and company.
2. Uncomment the **TESTIMONIALS** section in `index.html` and fill it in.
3. Add a link to `#projects` or `#testimonials` in the nav list if you want them in the menu.

---

## Site URL locations

The site's full web address appears in **exactly 6 places**. Every one is marked with the
comment `SITE-URL`. Search the project for `SITE-URL` to find them all.

| # | File | What |
|---|---|---|
| 1 | `index.html` | `<link rel="canonical" href="...">` |
| 2 | `index.html` | `<meta property="og:url" content="...">` |
| 3 | `index.html` | `<meta property="og:image" content=".../images/og-image.png">` |
| 4 | `index.html` | `"url": "..."` inside the JSON-LD block |
| 5 | `robots.txt` | `Sitemap: .../sitemap.xml` |
| 6 | `sitemap.xml` | `<loc>...</loc>` |

They currently say `https://calvert-specialty-insulation-heat-trace.smpump.workers.dev/`.
When this site goes live on the main domain, change all 6 to `https://calvertspecialty.com/`
(keep the trailing `/`, and keep `images/og-image.png` on the end of #3 and `sitemap.xml` on the end of #5).

Fast way in PowerShell (from this folder):

```powershell
Select-String -Path index.html, robots.txt, sitemap.xml -Pattern "workers.dev"
```

That lists every line still pointing at the old address. Edit each one, then run it again: no results means you're done.

---

## Residential site link

The footer has a small link: "Looking for residential services? Visit our residential site."
It points to **`https://residential.calvertspecialty.com/`**, which will be the new home of the site
that's on `calvertspecialty.com` today (the `calvert-specialty-website` project).

That address doesn't exist yet. Set it up **before** you swap (it doesn't affect the live site):

1. Cloudflare dashboard → **Workers & Pages** → click the **old** (residential) site's project.
2. Open its custom-domain settings (see [Where custom domains live](#where-custom-domains-live)).
3. Add `residential.calvertspecialty.com`. Wait for **Active**.
4. Open `https://residential.calvertspecialty.com` and confirm the residential site loads.

The residential site now answers on both addresses. After the swap, `calvertspecialty.com` moves to
this site and `residential.calvertspecialty.com` stays with the residential site.

- **Want a different address?** (for example `home.calvertspecialty.com`) Use it in step 3, then change the link
  in `index.html` (search `RESIDENTIAL-URL`). It's the only place it appears.
- **After the swap**, the residential site's own canonical/OG/sitemap URLs still say `calvertspecialty.com`.
  Update those in **that** repo to `https://residential.calvertspecialty.com/` so search engines don't
  mix up the two sites. (The two repos stay separate. This repo doesn't touch the other one.)

---

## Getting found by search engines and AI tools

**Already built into the site:**

| What | Why it matters |
|---|---|
| All text is plain HTML (nothing hidden behind JavaScript) | Search engines and AI crawlers read the full page on the first pass |
| Title, description, headings in order | What Google and Bing show in results |
| `sitemap.xml` + `robots.txt` | Tells crawlers what to read. `robots.txt` names the major AI crawlers (ChatGPT, Claude, Perplexity, Google Gemini, Apple) as allowed |
| JSON-LD block in `index.html` | Business name, phone, email, service area, services, and spec sections in a format machines read directly |
| `llms.txt` | A plain-language summary of the company written for AI tools (same idea as the one on the residential site) |
| Exact trade terms and CSI section numbers | Matches how estimators and AI tools search: "23 07 00 insulation sub Baltimore" |

**What you need to do after launch** (these live in your accounts, not in the code):

1. **Check Cloudflare isn't blocking AI crawlers.** This is the big one. Cloudflare can block AI bots for
   a domain no matter what `robots.txt` says. Dashboard → click `calvertspecialty.com` → look for
   **AI Crawl Control** (or **Security** → **Bots** / **Settings**) → make sure **Block AI bots** is off,
   and that **Managed robots.txt** isn't adding "Disallow" rules for AI crawlers.
   Then open `https://calvertspecialty.com/robots.txt` in a browser. It should match this repo's `robots.txt`.
2. **Google Search Console** (<https://search.google.com/search-console>): add `calvertspecialty.com` as a
   Domain property (Cloudflare can verify it in one click), then **Sitemaps** → submit `sitemap.xml`.
   This also feeds Google's AI Overviews and Gemini.
3. **Bing Webmaster Tools** (<https://www.bing.com/webmasters>): sign in, choose **Import from Google Search Console**,
   then submit `sitemap.xml`. Bing's index feeds Microsoft Copilot and is used by other AI search tools,
   so don't skip it.
4. **Google Business Profile** (<https://business.google.com>): set it up as a **service-area business** and
   **hide your address**, listing DC, Baltimore, and Northern Virginia as the service area. Use the same name
   (with LLC), phone, and website as the site. This is what shows up for "insulation contractor near me" and in Maps.
5. **Keep the details identical everywhere.** Same name, phone, and email on the site, Google Business Profile,
   the one-page ad, and any directory listings (BBB, local builders' exchanges, plan rooms). Search engines and AI
   tools trust a business more when the details match across sources.

Search engines usually take days to a few weeks to pick up a new site. Submitting the sitemap speeds that up.

---

## SWAPPING SITES

You have two separate Cloudflare projects, **in the same Cloudflare account**:

- **Old site:** the current live Calvert Specialty project (on `calvertspecialty.com` today)
- **This site:** `calvert-specialty-insulation-heat-trace` (a Worker)

If the other commercial version (`calvert-specialty-insulation`) is the one on `calvertspecialty.com`,
treat **it** as the "old" project in the steps below: remove the domain from it, then add it here.

### Where custom domains live

Cloudflare has two kinds of projects, and the domain settings are in different places:

| Project type | How to tell | Where to add or remove a domain |
|---|---|---|
| **Worker** (this site) | Address ends in `.workers.dev` | Project → **Settings** → **Domains & Routes** → **+ Add** → **Custom domain** (remove with the **⋯** menu next to it) |
| **Pages** | Address ends in `.pages.dev` | Project → **Custom domains** tab → **Set up a custom domain** (remove with the **⋯** menu next to it) |

The steps below say "custom-domain settings" so they work for either type.

"Going live" just means moving the custom domains `calvertspecialty.com` and
`www.calvertspecialty.com` from one project to the other. No code changes are needed
to swap, except updating the 6 URL spots so search engines see the right address.
Plan on 10-15 minutes, and a few minutes where the site may show a security
warning while Cloudflare issues the new certificate.

### Step 1: Test this site on its workers.dev address first

1. Open `https://calvert-specialty-insulation-heat-trace.smpump.workers.dev` on your phone and your computer.
2. Tap through every menu link. Open and close the mobile menu.
3. Send a real test through the form and confirm the email arrives.
4. Tap the phone number and email links to make sure they're right.
5. Optional: in Chrome, `F12` → **Lighthouse** tab → Mobile → **Analyze page load**.

Don't swap until all of that works.

### Step 2: Remove the domain from the OLD project

1. Cloudflare dashboard → **Workers & Pages**.
2. Click the **old** site's project.
3. Open its custom-domain settings (see [Where custom domains live](#where-custom-domains-live)).
4. Next to `calvertspecialty.com`, click the **⋯** menu → **Remove** → confirm.
5. Do the same for `www.calvertspecialty.com`.
6. **Leave `residential.calvertspecialty.com` on this project.** That's where the footer link on the new site points.
   (If you haven't added it yet, do it now. See [Residential site link](#residential-site-link).)

The old site still works at its own Cloudflare address and at `residential.calvertspecialty.com`. Nothing is deleted.

### Step 3: Add the domain to THIS project

1. **Workers & Pages** → click `calvert-specialty-insulation-heat-trace`.
2. **Settings** → **Domains & Routes** → **+ Add** → **Custom domain**.
3. Type `calvertspecialty.com` → **Add domain**.
4. Repeat for `www.calvertspecialty.com`.
5. Wait until both show **Active** (usually a few minutes).

**About DNS:** because `calvertspecialty.com` is already on Cloudflare, Cloudflare updates the DNS
records for you when you add the custom domain. You don't need to touch your registrar.
Changes usually take effect within minutes.

If Cloudflare says a DNS record already exists, go to the domain's **DNS** → **Records** page,
find the record for `calvertspecialty.com` (shown as `@`) or `www` that still points to the **old**
project, delete it, and repeat Step 3 so Cloudflare creates the right one.

### Step 4: Update the URL spots, commit, and push

1. Change the 6 [Site URL locations](#site-url-locations) to `https://calvertspecialty.com/`.
2. In PowerShell:

```powershell
git add .
git commit -m "Point site URLs to calvertspecialty.com"
git push
```

3. Wait for the Cloudflare deploy to finish (Workers & Pages → this project → **Deployments**).
4. Clear the cache (see the checklist below).

### Step 5: Confirm the www redirect, both ways

Open each of these in a private/incognito window:

- `https://www.calvertspecialty.com` → should land on `https://calvertspecialty.com` (or whichever one you've chosen as the main one)
- `https://calvertspecialty.com` → should load directly, with no loop back to www
- `http://calvertspecialty.com` → should switch to `https://`

If www doesn't redirect, the redirect is usually a zone-level rule: domain → **Rules** →
**Redirect Rules**. Cloudflare has a ready-made "Redirect from WWW to root" template.
That rule belongs to the domain, not to either project, so it keeps working after any swap.

### Swapping back (to the old site)

Same steps, other direction:

1. **This project** → **Settings** → **Domains & Routes** → remove `calvertspecialty.com` and `www.calvertspecialty.com`.
2. **Old project** → its custom-domain settings → add both back. Wait for **Active**.
3. If Cloudflare complains about an existing record, delete the old record in **DNS** → **Records** and add the domain again.
4. In this repo, change the 6 URL spots back to `https://calvert-specialty-insulation-heat-trace.smpump.workers.dev/`, commit, and push.
   (The old site already has its own URLs, so it needs no changes.)
5. Check the www redirect both ways again (Step 5), and run the checklist below.

---

## Swap checklist

Run through this every time you swap, in either direction:

- [ ] **Form still sends.** Submit a test on the live domain and confirm the email arrives.
      If Formspree has domain restrictions on, make sure the live domain is allowed.
- [ ] **GA4 is the right property.** The site on `calvertspecialty.com` should send data to the GA4 property
      you want for that site. GA4 → **Reports** → **Realtime**, load the live site, and confirm you show up.
- [ ] **Cloudflare cache cleared.** Dashboard → click `calvertspecialty.com` → **Caching** →
      **Configuration** → **Purge Everything**. Then reload the site in a private window.
- [ ] **www and root both work** (Step 5 above).
- [ ] **Residential link works.** Click the footer link on the live site and confirm the residential site opens.
- [ ] **Crawlers can read it.** Open `/robots.txt` on the live domain and confirm Cloudflare isn't blocking AI bots,
      then resubmit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
      See [Getting found by search engines and AI tools](#getting-found-by-search-engines-and-ai-tools).
- [ ] **URL spots match the live domain** (`Select-String` command in [Site URL locations](#site-url-locations)).
