# LiftAdvisor

Kaldırma ekipmanları ve İSG için çevrimdışı öncelikli, çok dilli (TR/EN) danışman uygulama.
Next.js 15 (App Router) · TypeScript · Tailwind · shadcn/ui deseni · Lucide · Serwist PWA · Capacitor.

> **Durum: iskelet.** Navigasyon, i18n, çevrimdışı katman ve veri katmanı hazır; beş modülün içeriği sonraki aşamada.

```bash
npm install
npm run dev        # http://localhost:3000
npm run preview    # üretim yapısı + Service Worker, http://localhost:3000
npm run verify     # i18n + tip + lint + build
```

Mimari kararlar, yeni dil ekleme ve sonraki adımlar: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

Ortam değişkenleri için `.env.example`'a bakın (yalnızca AI ağ geçidi).
