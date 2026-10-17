# Apna Digital Studio — fixed, self-contained starter

This version removes external photo dependencies and Google Fonts. All visuals are built with local CSS and the included SVG logo, so no image files are missing and the page can render without third-party image services.

## Files
- `index.html` — all page sections and form
- `styles.css` — responsive layout, illustrations, hover states and mobile menu styling
- `script.js` — mobile navigation and WhatsApp form behavior
- `assets/logo.svg` — local logo and favicon
- `functions/api/inquiries.js` — optional Cloudflare Pages Function to save leads
- `schema.sql` — D1 database table
- `wrangler.toml` — optional Wrangler configuration

## Preview locally
Open `index.html` in a browser. The WhatsApp contact form opens a pre-filled WhatsApp message; it does not send without the visitor pressing Send. For testing the database function locally, use Cloudflare Wrangler Pages dev with a D1 binding.

## Configure WhatsApp
Edit `script.js` and change `WHATSAPP_NUMBER` to your own number in international format using digits only. Pakistan example: `923001234567`.

## Deploy to Cloudflare Pages
1. Upload the complete directory to a GitHub repository.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Choose the repository. Set the build command to blank / none and output directory to `.`.
4. Deploy. Do not upload only `index.html`; upload the complete folder so CSS, JS, SVG and the `functions` route are included.

## Store enquiries in Cloudflare D1
The page can open WhatsApp without a database. To store enquiries as well:
1. Create a Cloudflare D1 database.
2. Run `schema.sql` in the D1 console.
3. In the Cloudflare Pages project, Settings → Functions → D1 database bindings, add binding name `DB` and select your database.
4. Redeploy. Test a submission and check the D1 `inquiries` table.

The project does not include a public route to read leads. Check records in the D1 console, or add a protected admin dashboard with authentication. Do not expose customer details through an unprotected endpoint.

## Notes
- The illustrations are CSS-built local visuals, not stock photos; this avoids broken external image URLs.
- Add your own privacy notice and anti-spam protection before collecting live customer details.
- Confirm your final business name and availability before purchasing a domain or using the brand commercially.
