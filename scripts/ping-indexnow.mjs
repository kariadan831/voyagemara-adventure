// Ping IndexNow — notifies Bing, ChatGPT Search, Yandex, DuckDuckGo & Perplexity index
// Run: node scripts/ping-indexnow.mjs

const payload = {
  host: "voyagemara-adventure.vercel.app",
  key: "c0f9a2e6b8d44e51871a39f60bc5781a",
  keyLocation: "https://voyagemara-adventure.vercel.app/c0f9a2e6b8d44e51871a39f60bc5781a.txt",
  urlList: [
    "https://voyagemara-adventure.vercel.app/",
    "https://voyagemara-adventure.vercel.app/safaris/maasai-mara",
    "https://voyagemara-adventure.vercel.app/safaris/amboseli",
    "https://voyagemara-adventure.vercel.app/safaris/samburu",
    "https://voyagemara-adventure.vercel.app/safaris/lake-nakuru",
    "https://voyagemara-adventure.vercel.app/safaris/lake-naivasha",
    "https://voyagemara-adventure.vercel.app/safaris/nairobi-national-park",
    "https://voyagemara-adventure.vercel.app/about",
    "https://voyagemara-adventure.vercel.app/booking",
    "https://voyagemara-adventure.vercel.app/llms.txt",
    "https://voyagemara-adventure.vercel.app/sitemap.xml"
  ]
};

// All IndexNow-compatible endpoints (each notifies their respective search engine)
// Bing  → feeds Microsoft Copilot + ChatGPT Search
// Yandex → feeds Yandex AI
// IndexNow.org → broadcasts to all partners (DuckDuckGo, Ecosia, Qwant, Seznam)
const endpoints = [
  "https://api.indexnow.org/indexnow",       // Broadcasts to all IndexNow partners
  "https://www.bing.com/indexnow",            // Microsoft Bing → Copilot → ChatGPT Search
  "https://yandex.com/indexnow",              // Yandex search
  "https://search.seznam.cz/indexnow",        // Seznam (European search)
];

async function ping() {
  console.log("🚀 Pinging IndexNow endpoints for VoyageMara Safaris...\n");

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload)
      });
      const statusIcon = res.status === 200 || res.status === 202 ? "✅" : "⚠️";
      console.log(`${statusIcon} [${endpoint}] → ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error(`❌ [${endpoint}] Error: ${err.message}`);
    }
  }

  console.log("\n✅ Done! Your pages have been submitted to Bing, Copilot, ChatGPT Search, and Yandex.");
  console.log("⏳ Perplexity picks up changes via Bing index — expect visibility within 24–72 hours.");
  console.log("⏳ Claude (Anthropic) crawls via ClaudeBot — no manual submission needed.");
  console.log("⏳ Google Gemini uses Google Search index — submit sitemap in Search Console.");
}

ping();
