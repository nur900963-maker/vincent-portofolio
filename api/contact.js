const { secrets: s } = require("../config.js");
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const b = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  if (b.website) return res.json({ ok: true });
  const { name, email, message } = b;
  if (!name || !email || !message) return res.status(400).json({ error: "Lengkapi semua kolom" });
  try {
    const text = `📩 Pesan baru dari portofolio\nNama: ${name}\nEmail: ${email}\n\n${message}`.slice(0, 4000);
    const r = await fetch(`https://api.telegram.org/bot${s.telegramBotToken}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: s.telegramChatId, text })
    });
    if (!r.ok) throw new Error("telegram");
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Gagal mengirim pesan. Cek telegramBotToken & telegramChatId di config.js" });
  }
};
