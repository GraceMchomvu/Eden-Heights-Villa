# Eden Heights Villa — client handover

Static website for **Eden Heights Villa**, a private Airbnb home in Kiserian, Mjohoroni, Arusha, Tanzania.

GitHub: https://github.com/GraceMchomvu/Eden-Heights-Villa

This is a finished static site (HTML, CSS, JavaScript, and photos). There is no database and no build step. Open a page, edit the text or swap a photo, save, and deploy.

**Do not rename the HTML files.** Menu labels and live URLs depend on the current names.

---

## Site map

| Menu name | File | What it is |
| --- | --- | --- |
| Home | `index.html` | Landing page |
| Villa | `about-us.html` | About the house |
| Tourism | `tourism.html` | Nearby parks and day trips |
| Services | `our-services.html` | Amenities and extras |
| Packages | `our-packages.html` | Stay packages (Enquire goes to Contact) |
| Gallery | `photo-section.html` | Photo gallery |
| Contact | `contact-us.html` | Phone, email, WhatsApp, location |
| Book Stay | `booking-room-selector.html` | Booking start → `booking-details.html` |
| Transport | `wellness-and-spa.html` | Airport and local transport |

`404.html` is the “page not found” screen.

---

## Folder layout

```
Eden-Heights-Villa/
  index.html              and the other live pages listed above
  css/                    styles (edit css/eden.css for villa-specific look)
  js/                     site scripts (js/main.js is the villa script)
  js/vendor/              libraries (jQuery, Bootstrap, carousel) — leave as-is
  fonts/                  icon fonts — leave as-is
  images/eden/            all villa photos and logos
  images/bg.png           background texture
  images/selector-image.png
  wrangler.toml           Cloudflare Pages config
  _headers                Cloudflare cache headers
  favicon.ico             browser tab icon
```

Villa photos and logos live only in `images/eden/`. Put new photos there, then point the matching `<img src="...">` in the HTML at the new filename.

---

## How to change content

### Text
Open the HTML page in any editor. Search for the heading or paragraph and replace the wording. Keep the surrounding HTML tags.

### Photos
1. Add the new file to `images/eden/` (`.jpg` or `.png`).
2. In the page, find the old `src="images/eden/..."` and change it to the new filename.
3. Keep the same image size idea: wide photos for banners, room photos for cards.

### Logo
Header logo: `images/eden/logo-horizontal-clear.png`  
Footer logo: `images/eden/logo-footer.png`

### Contacts
Update phone numbers and email in `contact-us.html` and in the footer of each page (search for `0745` or `echelesi`).

---

## Preview on your computer

From this folder, in Terminal / PowerShell:

```bash
python -m http.server 8765
```

Then open http://localhost:8765

---

## Host on Cloudflare Pages

1. Open [Cloudflare Dashboard → Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. **Create** → **Pages** → **Connect to Git**
3. Select repository: `GraceMchomvu/Eden-Heights-Villa`
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
5. **Save and Deploy**

The live URL will look like `https://eden-heights-villa.pages.dev`.

### Custom domain
In the Pages project → **Custom domains** → add your domain and follow the DNS steps.

### Deploy with CLI (optional)

```bash
npx wrangler login
npx wrangler pages deploy . --project-name=eden-heights-villa
```

---

## Contacts (on the site)

- Elisheba Chelesi — 074506244
- Goodluck Swai — 0745500519
- echelesi@gmail.com
