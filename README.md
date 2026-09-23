# Novex Website

Official project website for Novex Client, kept separate from the launcher repository.

## Local development

Requires Node.js 22 or newer. There are **no npm dependencies** to install.

```sh
npm run dev
```

Open http://127.0.0.1:4173. After editing, run `npm run build` again and refresh the browser. The local server serves `dist/`.

```sh
npm run build
npm test
```

The build generates Home, Download, Privacy, Terms and License pages. It copies only public assets to `dist/`. The checks verify local links/assets, metadata, the custom-domain file, and versioned download URLs. All page/asset links are relative, so they work at both a Pages repository subpath and the custom domain.

## Update version and download links

Edit **`site.config.mjs`**. `version`, `release`, `downloads.windows`, and `downloads.linux` are the single source for all download buttons and version labels. Use public HTTPS GitHub release URLs. Never put a GitHub token or any other credential in the website.

## Deployment

`.github/workflows/pages.yml` builds, validates and deploys on every push to `main`, or through workflow_dispatch. No custom deployment secret is needed; the workflow uses GitHub's scoped built-in token and Pages OIDC permissions.

In repository Settings → Pages, select **GitHub Actions** as the build source. The deployment environment is `github-pages`.

### Custom domain

The desired domain is **novex.mcstone.no**. `public/CNAME` and `site.config.mjs` already reference it. For a custom Actions deployment, GitHub Pages also needs the domain entered in repository Settings → Pages; the CNAME file alone is not sufficient.

At your DNS provider, add/verify this record (DNS has not been changed by this project):

- Type: `CNAME`
- Name: `novex` (or `novex.mcstone.no` if your provider requires the full name)
- Target: `mysocksaregone-dev.github.io`

Do not add a second conflicting record for the same hostname. After DNS resolves and GitHub provisions the certificate, enable **Enforce HTTPS** in Pages settings. Domain verification in GitHub account Settings → Pages is recommended to prevent domain takeover.

Official instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

The fallback project URL is https://mysocksaregone-dev.github.io/Novex-Website/ until a custom domain is enabled (GitHub may redirect it once configured).

## Real launcher screenshots

`public/screenshots/` contains optimized WebP captures of **Home, Instances, Mods, Modpacks and Settings**, taken from the actual Novex Client Electron application at source commit `b45ce8c`, version 0.1.0, on 2026-09-23.

An isolated temporary profile was used, without a Microsoft or Novex account. Three empty demonstration instances were created using the existing Novex instance APIs, without installing or claiming to run Minecraft. Modrinth cards are actual live results. Settings shows only temporary demonstration paths. No UI was drawn or replaced, and no personal accounts, worlds, authentication data, or private screenshots were copied. Images were converted to WebP, without visual alteration. The logo/favicon were copied directly from the launcher assets.

To refresh images, run the real launcher with an isolated user-data profile, capture those pages, review for private information, and replace the corresponding WebP files. Keep image dimensions consistent or update the build template's width/height attributes.

## License and project information

The site deliberately uses neutral licensing language and links to the launcher's authoritative LICENSE. It does not relabel the launcher as open-source or proprietary. At creation, the checked-in launcher LICENSE was MIT. Attribution for reused launcher assets is included in `public/THIRD-PARTY-NOTICES.txt`. Third-party project names/icons in screenshots keep their respective rights.

Website privacy information describes this static site only. There are no website account forms, analytics scripts, tracking cookies, external fonts, or secret keys. GitHub may process hosting/download request information under its own privacy policy. The desktop app has separate in-app legal information.

## Verification performed

- Static build and local link/asset checks.
- Browser checks at desktop (1440px) and mobile (390px), including menu, gallery selection, modal opening/Escape, download-page navigation, legal routes, and horizontal overflow.
- Visual review of all five screenshots for private information.
- Launcher source repository remains unchanged.
