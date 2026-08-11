# Eden Heights Villa

Website for **Eden Heights Villa** — a private Airbnb home in Kiserian, Mijogoroni, Arusha, Tanzania.

Live site (after Cloudflare setup): connect this repo to Cloudflare Pages.

## Host on Cloudflare Pages

1. Open [Cloudflare Dashboard → Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. **Create** → **Pages** → **Connect to Git**
3. Select repository: `GraceMchomvu/Eden-Heights-Villa`
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
5. **Save and Deploy**

Your site will be available at something like:

`https://eden-heights-villa.pages.dev`

### Optional: custom domain

In the Pages project → **Custom domains** → add your domain (e.g. `edenheightsvilla.com`) and follow DNS instructions.

### Deploy from this folder (CLI)

```bash
npx wrangler login
npx wrangler pages deploy . --project-name=eden-heights-villa
```

## Preview locally

```bash
npx http-server -p 5500 -c-1 .
```

Then visit http://localhost:5500

## Contact

- Elisheba Chelesi — 074506244
- Goodluck Swai — 0745500519
- echelesi@gmail.com
