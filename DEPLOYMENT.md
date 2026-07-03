# Insight Wealth Crypto Hub Deployment

## Local Validation

Run these commands before every deploy:

```bash
npm run update:btc-prices
npm run lint
npm run build
```

The production build uses Next.js and Netlify's Next runtime through `@netlify/plugin-nextjs`. The project already includes `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## GitHub Push Deploy Workflow

This is the only deployment workflow for this project:

```text
Codex changes code
-> npm run lint
-> npm run build
-> git add .
-> git commit -m "clear message"
-> git push origin main
-> Netlify auto deploys
```

Never run:

```bash
netlify deploy --prod
```

Netlify deployment is handled only by GitHub automatic deploys from the `main` branch.

Netlify CLI deploy is disabled for this project because `netlify deploy --prod` repeatedly fails with `JSONHTTPError: Forbidden` even after:

- confirming `netlify status` is logged in
- confirming `.netlify/state.json` links to site ID `30efb912-abb9-49c7-b381-662f9c232a48`
- refreshing OAuth with `netlify login --new`
- confirming API read access works
- confirming the account role is Owner

Use GitHub-based Netlify automatic deploys instead.

Current GitHub repository:

```text
https://github.com/michael-sis789/insightwealth-crypto-hub
```

Future deploy process:

1. Codex edits code.
2. Codex runs:
   ```bash
   npm run lint
   npm run build
   ```
3. Codex stages changes:
   ```bash
   git add .
   ```
4. Codex commits with a clear message:
   ```bash
   git commit -m "clear message"
   ```
5. Codex pushes to GitHub:
   ```bash
   git push origin main
   ```
6. Netlify automatically deploys from the `main` branch.

Run `npm run update:btc-prices` before lint/build only when the change needs refreshed cached BTC price data.

## Auth Checks

Before making deployment-related changes, check:

```bash
git remote -v
git branch
git status
gh auth status
netlify status
```

If `gh` is not installed but `git push origin main` works over SSH, GitHub CLI is optional for this workflow.

If GitHub authentication is missing and GitHub CLI is installed, log in once:

```bash
gh auth login
```

If the GitHub repository does not exist, create it once at:

```text
https://github.com/new
```

Repository name:

```text
insightwealth-crypto-hub
```

Then set the remote to:

```bash
git remote set-url origin git@github.com:michael-sis789/insightwealth-crypto-hub.git
```

## Netlify Dashboard Setup: Existing Site

Use this path if `insightwealth-live` already exists in Netlify.

1. Open Netlify Dashboard.
2. Select site: `insightwealth-live`.
3. Go to **Site configuration** or **Site settings**.
4. Open **Build & deploy**.
5. Choose **Link repository** or **Connect repository**.
6. Select **GitHub**.
7. Authorize Netlify for the GitHub account if prompted.
8. Select the repository for this project.
9. Set production branch to `main`.
10. Confirm build command:
    ```bash
    npm run build
    ```
11. Confirm publish directory comes from `netlify.toml`:
    ```bash
    .next
    ```
12. Confirm the Next.js runtime/plugin is enabled through `@netlify/plugin-nextjs`.
13. Enable automatic deploys from the `main` branch.
14. Trigger a deploy.

## Netlify Dashboard Setup: New Site

Use this path only if you decide to create a replacement Netlify site.

1. Open Netlify Dashboard.
2. Click **Add new site**.
3. Choose **Import an existing project**.
4. Select **GitHub**.
5. Select the repository for this project.
6. Set production branch to `main`.
7. Build command:
   ```bash
   npm run build
   ```
8. Use the existing `netlify.toml`.
9. Confirm Next.js runtime/plugin is enabled.
10. Deploy.
11. If replacing the current site, move the custom domain `insightwealth.live` to the new site only after the new deploy is verified.

## Do Not Use Static Drag-And-Drop

Do not use static drag-and-drop deploy for this project.

This is a Next.js app with dynamic routes and API routes/functions:

- `/api/market`
- `/api/fear-greed`
- `/api/funding`
- `/api/etf-flow`
- dynamic dashboard pages

Drag-and-drop static deploys can break Netlify functions and dynamic Next.js behavior.

## Troubleshooting `JSONHTTPError: Forbidden`

If CLI deploy fails with `JSONHTTPError: Forbidden`:

1. Confirm the current account:
   ```bash
   netlify status
   ```
2. Confirm the site link:
   ```bash
   cat .netlify/state.json
   netlify link --id 30efb912-abb9-49c7-b381-662f9c232a48
   ```
3. Refresh CLI auth:
   ```bash
   netlify login --new
   ```
4. If deploy creation still fails, stop using CLI deploy and use GitHub auto deploy.
5. In Netlify Dashboard, confirm:
   - the site is linked to the correct GitHub repo
   - automatic deploys are enabled for `main`
   - build command is `npm run build`
   - `@netlify/plugin-nextjs` is installed and detected
   - the site is not locked, suspended, or restricted by team deploy settings

## Current Netlify Site

- Site name: `insightwealth-live`
- Site ID: `30efb912-abb9-49c7-b381-662f9c232a48`
- Production URL: `https://insightwealth.live`
- Netlify fallback URL: `https://insightwealth-live.netlify.app`
- Git provider: GitHub
- Repository: `michael-sis789/insightwealth-crypto-hub`
- Production branch: `main`
- Build command: `npm run build`
- Publish directory: `.next`
- Next.js runtime/plugin: `@netlify/plugin-nextjs`

## Current Blocker

The site is linked to GitHub automatic deploys, but Netlify currently shows:

```text
mic78ai's team has run out of credits
Your sites may go offline and production deploys and Agent Runners are currently disabled.
```

The first GitHub-triggered production deploy was created as `6a47b4f632fc98530723bf20` and skipped with:

```text
Skipped due to account credit usage exceeded
```

Resolve this in Netlify under **Usage & billing** / **Upgrade team**. After credits are restored, push to `main` or retry the skipped production deploy from the Netlify dashboard.
