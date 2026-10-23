const { secrets: s } = require("../config.js");
const redis = async (cmd) => {
  const r = await fetch(s.redisUrl, { method: "POST", headers: { Authorization: "Bearer " + s.redisToken }, body: JSON.stringify(cmd) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
};
module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      const list = await redis(["LRANGE", "comments", 0, 99]);
      return res.json(list.map((x) => JSON.parse(x)));
    }
    if (req.method === "POST") {
      const b = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      if (b.website) return res.json({ ok: true });
      const ip = String(req.headers["x-forwarded-for"] || "x").split(",")[0];
      if (!(await redis(["SET", "rl:" + ip, "1", "NX", "EX", 20]))) return res.status(429).json({ error: "Tunggu 20 detik sebelum komentar lagi" });
      const name = String(b.name || "").trim().slice(0, 30);
      const text = String(b.text || "").trim().slice(0, 300);
      const photo = typeof b.photo === "string" && b.photo.startsWith("data:image/") && b.photo.length < 150000 ? b.photo : "";
      if (!name || !text) return res.status(400).json({ error: "Nama dan komentar wajib diisi" });
      await redis(["LPUSH", "comments", JSON.stringify({ name, text, photo, t: Date.now() })]);
      await redis(["LTRIM", "comments", 0, 499]);
      return res.json({ ok: true });
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: "Server error: " + e.message });
  }
};
