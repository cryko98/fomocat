# Fomo Cat — $FOMOCAT

Statikus one-page weboldal a Fomo Cat ($FOMOCAT) Solana memecoinhoz.
Nincs build lépés, nincs függőség — sima HTML + CSS + JS.

## Fájlok

| Fájl | Mi van benne |
| --- | --- |
| `index.html` | Az egész oldal tartalma (hero, story, tokenomics, how to buy, roadmap, FAQ) |
| `styles.css` | Design, színek (a macska bundájából: near-black + teal), reszponzív layout |
| `script.js` | CA másolás, toast, mobil menü, scroll animációk, kurzort követő macska |
| `assets/` | `fomocat-cut.png` (átlátszó hátterű macska), `icon.png` (favicon/logó), `fomocat.png` (eredeti, OG kép) |

## Élő adatok az oldalon

- **CA:** `6uYRrUWJ6ggydj1KGSgGUSCFeBG77JbQvDkCnwFxpump` (hero, copy gombbal)
- **Telegram:** `https://t.me/FOMOCATSOLS` (4 gomb)
- **pump.fun:** `https://pump.fun/coin/6uYRrUWJ6ggydj1KGSgGUSCFeBG77JbQvDkCnwFxpump` (4 gomb)

Mindegyik sima szövegként van az `index.html`-ben, kereséssel bármikor cserélhető.

Ha később X/Twitter is lesz, a Telegram gomb mintájára bemásolható egy második gomb.

## Helyi futtatás

Elég duplán kattintani az `index.html`-en, vagy:

```bash
npx serve .
```

## Deploy Vercelre

1. Vercel → **Add New → Project** → importáld a `cryko98/fomocat` repót.
2. Framework Preset: **Other**, Build Command: üres, Output Directory: üres (root).
3. Deploy. Minden `git push` után automatikusan frissül.
