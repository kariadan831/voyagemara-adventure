// Ping IndexNow (Microsoft Bing & ChatGPT search index)
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
    "https://voyagemara-adventure.vercel.app/booking"
  ]
};

async function ping() {
  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow"
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload)
      });
      console.log(`[${endpoint}] Status: ${res.status} (${res.statusText})`);
    } catch (err) {
      console.error(`[${endpoint}] Error:`, err.message);
    }
  }
}

ping();
