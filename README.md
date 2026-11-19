# cv-page — interaktywne CV Michała Bugaja

Strona-CV w stylu terminala: domyślnie ciemny motyw (przełącznik na jasny), wersje EN (`/`) i PL (`/pl/`),
terminal z komendami, filtr umiejętności podświetlający doświadczenie, animacje i sekcja muzyczna.

## Jak to działa na hostingu seohost SH2

Hosting SH2 (DirectAdmin + LiteSpeed) **nie uruchamia Node.js**, więc strona jest budowana statycznie:
Angular prerenderuje obie wersje językowe do zwykłych plików HTML w czasie builda
(`"outputMode": "static"` w `angular.json`, `RenderMode.Prerender` w `src/app/app.routes.server.ts`).
Na serwer trafia tylko zawartość `dist/cv-page/browser/` (HTML, JS, CSS, fonty, obrazki, PDF-y, `.htaccess`).
Po załadowaniu Angular „ożywia” stronę (hydration) — działają terminal, filtr i przełączniki.

## Stack

- Angular 22 (standalone, sygnały, zoneless), `@angular/ssr` tylko do prerenderu
- SCSS + CSS custom properties (tokeny motywów w `src/styles/_tokens.scss`)
- Fonty Geist i JetBrains Mono hostowane lokalnie (`@fontsource-variable/*`) — bez Google Fonts,
  bez analityki i bez cookies, więc nie potrzeba banera cookies
- Vitest (testy jednostkowe), angular-eslint

## Praca lokalna

Wymagany Node 24 (`.nvmrc`).

```bash
npm install
npm start              # serwer deweloperski: http://localhost:4200
npm test               # testy (Vitest)
npm run lint           # ESLint
npm run build          # build produkcyjny do dist/cv-page/browser
```

Podgląd dokładnie tego, co trafi na hosting (bez Node po stronie serwera):

```bash
npx http-server dist/cv-page/browser -p 4300 -c-1
```

## Gdzie zmieniać treść

| Co | Plik |
| --- | --- |
| Treść CV po angielsku | `src/app/data/cv.en.ts` |
| Treść CV po polsku | `src/app/data/cv.pl.ts` |
| Teksty interfejsu i terminala | `src/app/data/ui.en.ts`, `src/app/data/ui.pl.ts` |
| Lista umiejętności (nazwy, aliasy dla `filter`) | `src/app/data/skills.ts` |
| Domena, linki, e-mail, telefon, PDF-y | `src/app/data/site.config.ts` |
| Kolory motywów | `src/styles/_tokens.scss` |
| PDF-y do pobrania | `public/cv/michal-bugaj-cv-en.pdf`, `public/cv/michal-bugaj-cv-pl.pdf` |

W tekstach działa prosty zapis: `**pogrubienie**`, `[tekst](https://adres)`, `{platinum:2× platyna}`, `{gold:3× złoto}`.
Każdy punkt doświadczenia/projektu ma listę `skills` — od niej zależy filtr umiejętności.
Test `src/app/data/content.spec.ts` pilnuje, żeby wersja PL miała tę samą strukturę co EN.

PDF-y wygenerowano z makiety „03 · Terminal” (Chrome headless, A4). Po zmianie CV podmień oba pliki w `public/cv/`.

## Przed pierwszym publicznym uruchomieniem

1. Wpisz domenę w `SITE.url` (`src/app/data/site.config.ts`) — wtedy pojawią się canonical, hreflang i pełne adresy Open Graph.
2. Dodaj `public/sitemap.xml` z adresami `https://TWOJA-DOMENA/` i `https://TWOJA-DOMENA/pl/` oraz linię `Sitemap:` w `public/robots.txt`.
3. Uzupełnij linki `youtube` i `musicBusiness` w `site.config.ts` (puste linki są po prostu ukrywane).
4. Gdy HTTPS już działa, odkomentuj nagłówek HSTS w `public/.htaccess`.

## Deploy: GitHub Actions → SSH (rsync)

Workflow `.github/workflows/deploy.yml`: każdy push do `main` uruchamia lint, testy i build, a potem wysyła
`dist/cv-page/browser/` na serwer przez rsync po SSH. Pull requesty są tylko budowane i testowane.
Folder `.well-known/` (certyfikaty Let's Encrypt) nie jest nigdy usuwany.

### Jednorazowa konfiguracja (robisz to sam — klucze i hasła nie przechodzą przez nikogo innego)

1. **Domena i SSL** — w DirectAdmin dodaj domenę (jeśli nie jest główną), ustaw DNS na seohost
   i włącz darmowy certyfikat Let's Encrypt (SSL Certificates).
2. **SSH** — w DirectAdmin włącz dostęp SSH (jeśli jest wyłączony) i sprawdź host, port i login
   (port na seohost może być inny niż 22).
3. **Klucz do deployu** — na swoim komputerze wygeneruj osobną parę kluczy:
   ```bash
   ssh-keygen -t ed25519 -C "github-deploy cv-page" -f cv-page-deploy -N ""
   ```
   Zawartość `cv-page-deploy.pub` dodaj w DirectAdmin → SSH Keys (Authorized Keys).
4. **known_hosts** — pobierz klucz hosta (podstaw swój host i port):
   ```bash
   ssh-keyscan -p PORT HOST
   ```
5. **Sekrety w GitHubie** — repozytorium → Settings → Environments → utwórz `production` →
   Environment secrets:

   | Sekret | Wartość |
   | --- | --- |
   | `SSH_HOST` | host serwera z DirectAdmin |
   | `SSH_PORT` | port SSH |
   | `SSH_USER` | login DirectAdmin |
   | `SSH_PRIVATE_KEY` | cała zawartość pliku `cv-page-deploy` (klucz prywatny) |
   | `SSH_KNOWN_HOSTS` | wynik `ssh-keyscan` z kroku 4 |
   | `DEPLOY_PATH` | np. `domains/twoja-domena.pl/public_html` (ścieżka względem katalogu domowego) |

6. Usuń z `public_html` domyślną stronę DirectAdmin (np. `index.html`/`logo.png`) albo pozwól, by rsync ją nadpisał/usunął.
7. Zrób push do `main` (albo uruchom workflow ręcznie: Actions → Build & deploy → Run workflow).

### Ręcznie (awaryjnie)

`npm run build` i wgraj **zawartość** `dist/cv-page/browser/` (razem z ukrytym `.htaccess`) do `public_html`
przez menedżer plików DirectAdmin lub FTP.

## Struktura

```
src/app/
  core/       motyw, język, SEO, filtr skilli, przewijanie, dyrektywy animacji, rich text
  data/       treść CV (EN/PL), teksty UI, skille, konfiguracja strony
  layout/     nagłówek, stopka, pigułka aktywnego filtra
  pages/      strona CV (jedna na język)
  sections/   hero, about, skills, experience, projects, education, music, contact
  terminal/   komponent terminala + czysta logika komend (commands.ts)
public/       .htaccess, ikony, og-image, zdjęcie, PDF-y, robots.txt
```
