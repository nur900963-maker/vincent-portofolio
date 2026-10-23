// ===== SEMUA SETTING ADA DI SINI (pengganti .env) =====
// "site"    = data publik (nama, teks, project, sosmed). Tampil di web.
// "secrets" = RAHASIA. Hanya dipakai di folder /api (server), TIDAK dikirim ke browser.
//             Jangan taruh repo ini di GitHub public kalau secrets sudah diisi.
module.exports = {
  site: {
    brand: "Vincent",
    fullName: "Vincent Portofolio",
    title: "Vincent Portofolio | Creative Technologist & UI/UX Designer",
    description: "Halo! Saya Vincent, Creative Technologist dan UI/UX Designer yang berfokus pada antarmuka futuristik dan pengalaman digital yang imersif.",
    welcomeText: "Welcome to Vincent Portofolio...",
    photo: "/Photo.jpg",
    badge: "Ready to Innovate",
    heroTitle: ["Creative", "Technologist"],
    roles: ["UI/UX Designer", "Web Developer", "Creative Coder"],
    heroText: "Halo, saya Vincent, Creative Technologist dan UI/UX Designer yang menciptakan website futuristik, elegan, dan interaktif.",
    aboutTitle: "About Me",
    aboutSubtitle: "Mengubah ide menjadi pengalaman digital.",
    aboutText: "Halo! Saya Vincent, Creative Technologist dan UI/UX Designer yang berfokus pada antarmuka futuristik serta pengalaman pengguna yang imersif, elegan, dan intuitif. Saya memadukan teknologi dan desain untuk menciptakan dunia digital yang lebih indah dan fungsional.",
    quote: "Teknologi membuka kemungkinan; desain menghadirkan makna pada setiap pengalaman digital.",
    stats: [
      { icon: "‹›", value: "{projects}", label: "TOTAL PROJECTS", desc: "Innovative web solutions crafted" },
      { icon: "◍", value: "UI/UX", label: "DESIGN FOCUS", desc: "Futuristic and immersive interfaces" },
      { icon: "▣", value: "Design + Code", label: "CREATIVE TECHNOLOGY", desc: "Turning ideas into digital experiences" },
      { icon: "▯", value: "All Devices", label: "RESPONSIVE DESIGN", desc: "Seamless experiences on every screen" }
    ],
    showcaseTitle: "Portfolio Showcase",
    showcaseText: "Explore my journey through projects and technical expertise. Each section reflects my approach to building thoughtful digital experiences.",
    // GANTI dengan project Vincent. image = path gambar di folder ini (mis. /img/p1.jpg), boleh kosong.
    projects: [
      { title: "Project Satu — Judul Project", desc: "Deskripsi singkat project pertama Vincent.", details: "Penjelasan lengkap project: fitur, teknologi, dan hasil akhirnya.", image: "", demo: "https://example.com" },
      { title: "Project Dua — Judul Project", desc: "Deskripsi singkat project kedua Vincent.", details: "Penjelasan lengkap project kedua.", image: "", demo: "https://example.com" },
      { title: "Project Tiga — Judul Project", desc: "Deskripsi singkat project ketiga Vincent.", details: "Penjelasan lengkap project ketiga.", image: "", demo: "https://example.com" }
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Node.js", "React", "Figma", "Vercel", "Git"],
    contactTitle: "Hubungi Saya",
    contactText: "Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.",
    socials: [
      { icon: "💬", name: "WhatsApp", desc: "Hubungi saya melalui WhatsApp", url: "https://wa.me/628882827923", color: "#25d366" },
      { icon: "▶", name: "YouTube", desc: "Kunjungi kanal YouTube saya", url: "https://youtube.com/@gada", color: "#ff0033" },
      { icon: "♪", name: "TikTok", desc: "Kunjungi akun TikTok saya", url: "https://tiktok.com/@gdatiktok", color: "#69c9d0" },
      { icon: "✈", name: "Telegram", desc: "Terhubung melalui Telegram", url: "https://t.me/pakvncnt", color: "#2aabee" }
    ],
    adminComment: { name: "Vincent", text: "Halo gess, welcome 👋" },
    footer: "© 2026 Vincent™. All Rights Reserved."
  },
  secrets: {
    // Database komentar: buat gratis di upstash.com (Redis) lalu isi REST URL & token
    redisUrl: "",
    redisToken: "",
    // Form kontak dikirim ke Telegram kamu: token dari @BotFather, chatId dari @userinfobot
    telegramBotToken: "",
    telegramChatId: ""
  }
};
