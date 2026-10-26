# That Li · Portfolio

A single-page React, TypeScript, and Vite portfolio. Ordinary CSS, semantic HTML, and no router or backend. Content is based on the supplied CV, with project repositories and images supplied or requested by the owner.

## Local development and production preview

Use Node.js 22.17+ (Node 24 recommended) and npm.

```sh
npm ci
npm run dev
```

To check and preview the production build:

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

Open the address printed by Vite, normally http://127.0.0.1:4173. Stop it with Ctrl+C. Check phone and desktop widths; Tab through navigation, use the skip link, and open/download the CV. Email and phone links open the visitor's configured apps.

## Update content or the CV

- Edit `src/data/portfolio.ts` for text, contact destinations, dates, education, skills, awards, and projects. This typed file is independent of the layout. Empty section arrays hide their section and navigation link. Remove unavailable contacts instead of leaving placeholder links.
- Put verified project URLs in the optional `url` field; projects without URLs remain readable articles.
- Store images in `public/images/` and update their file, alt text, caption, dimensions, and source credits in the data file. Images open at full size and load lazily; no gallery dependency is needed.
- Replace `public/That-Li-CV.pdf` to update the PDF without changing links. If renaming it, update `cv.file` in the data file and the no-JavaScript fallback in `index.html`.
- The page title and description use the data file. The initial HTML title, favicon, and theme colour are in `index.html` and `public/favicon.svg`.
- Review the website and downloadable CV together before publishing: both contain the contact details supplied in the CV.

## GitHub Pages deployment

The target repository is **ThatLi/ThatLi.github.io**. Its public address will be **https://thatli.github.io/**. Vite's `base: '/'` is correct for this account-site repository; the CV uses `import.meta.env.BASE_URL` so it follows that base.

After explicitly deciding to publish:

1. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
2. Push the reviewed files to `main`. `.github/workflows/deploy.yml` installs the lockfile dependencies, checks types and lint, runs the content self-check, builds, and deploys `dist`.
3. Check the Actions run and resulting site, including the CV link. The workflow can also be started manually from Actions.

Pushing to `main` will publish automatically once Pages is configured. No push or publication is performed as part of local setup. A GitHub-hosted run is required to verify deployment permissions and repository Pages settings.

If moving to a project repository instead, change `base` to `'/repository-name/'` in `vite.config.ts` and update the target address here. See the [official Vite Pages deployment guide](https://vite.dev/guide/static-deploy).

## Future redesign from Figma

Provide accessible Figma frame links for desktop and phone, and specify which parts of the current content should change. Ask to implement those frames while keeping the typed content in `src/data/portfolio.ts`.

`src/App.tsx` contains the small set of page components; `src/styles.css` defines shared colours, font families, text sizes, spacing, and corner radii in `:root`. Update those tokens and component styles to match new frames. Layouts use document flow, Flexbox, and Grid. The geometric illustration is decorative CSS; no Figma integration or design-system framework is required.

System fonts keep the site self-contained, with no external font requests.

## Image sources

All images are served locally as WebP, resized and compressed without changing their contents. The original aspect ratios are preserved. Credits appear beside the images; retain them when redesigning.

- `nus-campus.webp`: [University Hall by Sengkang](https://commons.wikimedia.org/wiki/File:NUS,_University_Hall,_Nov_06.JPG), November 2006. Wikimedia Commons records unrestricted reuse permission.
- `nus-computing.webp`: [COM1 by Soccorpcomm](https://commons.wikimedia.org/wiki/File:NUS_School_of_Computing.JPG), 2003, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). This resized WebP remains under the same license; this applies to the photograph, not the rest of the site.
- `source-academy.webp`: [academy_background.jpg](https://github.com/source-academy/frontend/blob/master/src/assets/academy_background.jpg) from the Source Academy frontend repository. This is project artwork, not a screenshot or a claim of authorship. Its Apache 2.0 license is retained in `public/images/source-academy-LICENSE.txt`.
- `tuteedex-ui.webp`: [UI screenshot](https://github.com/AY2627S1-CS2103T-F13-2/tp/blob/master/docs/images/Ui.png) from the TuteeDex repository. `tuteedex-design.webp` is the owner's supplied design-board screenshot.
- `mr-krabs-event.webp`: the owner's supplied Agnes OpenClaw hackathon group photo. Upstream OpenClaw showcase images are not used to represent Mr. Krabs.
