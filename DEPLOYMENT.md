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
-> Personal Netlify auto deploys
```

Never run:

```bash
netlify deploy --prod
```

Netlify deployment is handled only by GitHub automatic deploys from the `main` branch.
Never rely on Netlify Agent Runner for production deploys.

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
6. Personal Netlify automatically deploys from the `main` branch.

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

Use this path only if you decide to create a replacement Netlify site in the Personal Netlify account.

1. Open Netlify Dashboard.
2. Click **Add new site**.
3. Choose **Import an existing project**.
4. Select **GitHub**.
5. Select `michael-sis789/insightwealth-crypto-hub`.
6. Set production branch to `main`.
7. Build command:
   ```bash
   npm run build
   ```
8. Use the existing `netlify.toml`.
9. Confirm Next.js runtime/plugin is enabled.
10. Enable automatic deploys from `main`.
11. Deploy.
12. Test the new Netlify preview URL before moving the live domain.
13. If replacing the current site, move the custom domain `insightwealth.live` to the new site only after the new deploy is verified.

## Move From Team To Personal Netlify

Current problem: the existing project belongs to `mic78ai's team`, and production deploys are skipped because that team has exceeded credits.

Goal: keep the GitHub repo as the source of truth, but make `insightwealth.live` deploy from the Personal Netlify account.

### Current Team Site Inventory

- Site name: `insightwealth-live`
- Site ID: `30efb912-abb9-49c7-b381-662f9c232a48`
- Current owner/account: `mic78ai's team`
- Account slug: `mic78ai`
- Account type: `Free`
- Production URL: `https://insightwealth.live`
- Netlify fallback URL: `https://insightwealth-live.netlify.app`
- Custom domain: `insightwealth.live`
- Domain alias: `www.insightwealth.live`
- SSL: enabled
- Force SSL: enabled
- Managed DNS: enabled
- Git provider: GitHub
- GitHub repo: `michael-sis789/insightwealth-crypto-hub`
- Repo URL: `https://github.com/michael-sis789/insightwealth-crypto-hub`
- Production branch: `main`
- Build command: `npm run build`
- Publish directory: `.next`
- Base directory: repository root
- Next.js runtime/plugin: `@netlify/plugin-nextjs`
- Functions region: `us-east-2` / `CMH`
- Environment variables: none currently set for the project

### Direct Transfer Option

Netlify supports direct project transfer between teams when transfers are allowed, you are a Team Owner of the source team, and you are also an Owner or Developer on the destination team.

Try this path first:

1. Open Netlify Dashboard.
2. Switch to `mic78ai's team`.
3. Open project `insightwealth-live`.
4. Go to **Project configuration**.
5. Open **General**.
6. Open **Project information**.
7. Select **Transfer project**.
8. Choose the Personal Netlify account as the destination.
9. Read the warnings about plan features, members, pricing, domains, and build settings.
10. Confirm the transfer.
11. After transfer, verify:
    ```text
    Project owner/account is the Personal Netlify account
    GitHub repo is still michael-sis789/insightwealth-crypto-hub
    Branch is main
    Build command is npm run build
    Publish directory is .next
    @netlify/plugin-nextjs is still enabled
    insightwealth.live and www.insightwealth.live are still assigned
    SSL is enabled
    ```
12. If GitHub auto deploy disconnected during transfer, reconnect it:
    - Project configuration
    - Build & deploy
    - Link repository
    - GitHub
    - `michael-sis789/insightwealth-crypto-hub`
    - Branch `main`
    - Build command `npm run build`
    - Publish directory `.next`

If the Personal account does not appear as a transfer destination, create or switch to the Personal team/account in Netlify first. If there is no shared Owner/Developer path between source and destination, contact Netlify Support or use the clean migration path below.

### Clean Migration Option

Use this if direct transfer is not available.

Protect the current live site: do not delete the old `insightwealth-live` team site until the new Personal Netlify site is deployed, tested, and serving the live domain.

1. In the Personal Netlify account, click **Add new site**.
2. Choose **Import an existing project**.
3. Select **GitHub**.
4. Select repo:
   ```text
   michael-sis789/insightwealth-crypto-hub
   ```
5. Configure:
   ```text
   Branch: main
   Build command: npm run build
   Publish directory: .next
   Base directory: repository root / empty
   ```
6. Use the existing `netlify.toml`.
7. Confirm Netlify detects Next.js and enables `@netlify/plugin-nextjs`.
8. Enable automatic deploys from `main`.
9. Deploy the new Personal site.
10. Test the temporary `*.netlify.app` URL:
    ```text
    /
    /btc-dashboard
    /btc-dca-calculator
    /bull-bear-probability
    /api/market
    /api/fear-greed
    /api/funding
    /api/etf-flow
    ```
11. Confirm the GitHub push workflow triggers a new deploy on the Personal site.
12. Move the custom domain only after the new Personal site works.

### Move Custom Domain

If the direct project transfer keeps `insightwealth.live` attached, no DNS move should be needed. Verify domain assignment and SSL anyway.

If using the clean migration path:

1. In the old Team site `insightwealth-live`, go to **Domain management**.
2. Remove `insightwealth.live` and `www.insightwealth.live` from the old Team site if Netlify requires this before reusing the domain.
3. In the new Personal Netlify site, go to **Domain management**.
4. Add `insightwealth.live` as the primary custom domain.
5. Add `www.insightwealth.live` as an alias or redirect, depending on the dashboard prompt.
6. Verify DNS records. Existing DNS should normally remain:
   ```text
   @ A 75.2.60.5
   www CNAME <new-personal-site-name>.netlify.app
   ```
7. If `www` still points to the old Netlify subdomain, update it to the new Personal site's Netlify subdomain.
8. Enable or renew HTTPS certificate.
9. Enable force HTTPS.
10. Verify:
    ```text
    https://insightwealth.live
    https://www.insightwealth.live
    ```

### Post-Migration Verification

After transfer or migration:

1. Push a small documentation-only commit to GitHub `main`.
2. Confirm the Personal Netlify account receives the deploy event.
3. Confirm the deploy is not skipped for Team credit exhaustion.
4. Confirm `https://insightwealth.live` shows the latest version.
5. Confirm `https://www.insightwealth.live` redirects or aliases correctly.
6. Confirm API routes and Next.js functions work:
   ```bash
   curl -I https://insightwealth.live/api/market
   curl -I https://insightwealth.live/api/fear-greed
   curl -I https://insightwealth.live/api/funding
   curl -I https://insightwealth.live/api/etf-flow
   ```
7. Keep the old Team site until the Personal site is verified in production.

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
