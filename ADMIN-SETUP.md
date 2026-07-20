# Admin panel — how it works & the one-time login setup

Your shop content now lives in **data files**, edited through an admin panel:

- **/admin** — the Sveltia CMS admin page (log in with GitHub).
- `data/settings.json` — WhatsApp number, delivery note, minimums, range names.
- `data/products.json` — the product list (name, price, stock, photo, etc.).
- `admin/config.yml` — describes the editing fields (developer file).

When you save in the admin, it commits to this GitHub repo and Netlify
redeploys — the live site updates in about a minute.

## One-time login setup (still to do)

Login uses GitHub, so only accounts with access to this repo can get in. GitHub's
web login needs a small "OAuth relay" to complete the handshake. Steps:

1. **Deploy an OAuth relay** (free). Recommended: the ready-made
   `sveltia-cms-auth` Cloudflare Worker (or an equivalent Netlify function).
2. **Create a GitHub OAuth App** — github.com → Settings → Developer settings →
   OAuth Apps → New OAuth App:
   - Homepage URL: `https://excellentvenison.co.za`
   - Authorization callback URL: the relay's callback URL (from step 1).
   - Copy the **Client ID** and generate a **Client Secret**.
3. **Add the Client ID + Secret** to the relay's settings/environment.
4. **Set `base_url`** in `admin/config.yml` to the relay's URL (uncomment the line).
5. Go to `https://excellentvenison.co.za/admin` → **Login with GitHub** → authorise.

That's it — after that you manage everything from the admin, no code.

> Until `base_url` is set, the admin page loads but login won't complete.
> The public site works fully regardless (it just reads the data files).
