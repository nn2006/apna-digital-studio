// Cloudflare Pages Function: POST /api/inquiries
// Configure a Cloudflare D1 database binding named DB in Pages settings.
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: "Database is not configured." }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON." }, 400); }
  const name = String(body.name || "").trim().slice(0, 100);
  const business = String(body.business || "").trim().slice(0, 150);
  const service = String(body.service || "").trim().slice(0, 100);
  const phone = String(body.phone || "").trim().slice(0, 30);
  const message = String(body.message || "").trim().slice(0, 1500);
  if (!name || !service || !phone) return json({ error: "Name, service and phone are required." }, 400);
  try {
    await env.DB.prepare("INSERT INTO inquiries (name, business, service, phone, message, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))")
      .bind(name, business, service, phone, message).run();
    return json({ ok: true });
  } catch { return json({ error: "Could not save enquiry." }, 500); }
}
