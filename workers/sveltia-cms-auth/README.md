# sveltia-cms-auth

Vendored copy of [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)
(MIT) — the GitHub OAuth relay that lets Sveltia CMS at `/admin/` authenticate
editors and commit to `brandonpittman/stoicdev`.

`src/index.js` is the upstream relay copied verbatim — only `wrangler.toml`
(name + `ALLOWED_DOMAINS`) and this README are project-specific.

A single deployed worker serves **every** deployment: `ALLOWED_DOMAINS` whitelists
`stoicdev.org` plus the Pages preview wildcard, so the CMS logs in on production
**and** on any branch-aliased preview URL. The per-deployment target **branch** is
handled separately by `scripts/set-cms-config.js`, which rewrites `backend.branch`
in `static/admin/config.yml` at build time.

## Status

- Deployed: `https://stoicdev-cms-auth.brandonpittman.workers.dev` (Brandon
  Pittman account).
- `static/admin/config.yml` → `backend.base_url` already points at it.
- **Remaining (manual):** create the GitHub OAuth App and set the two secrets
  below. Until then, live `/admin/` can't log in (local "Work with Local
  Repository" editing works with no auth).

## Finish remote login

1. Create a **GitHub OAuth App** (GitHub → Settings → Developer settings → OAuth
   Apps → New):
   - Homepage URL: `https://stoicdev.org`
   - Authorization callback URL:
     `https://stoicdev-cms-auth.brandonpittman.workers.dev/callback`

2. Set the credentials as worker secrets (from the repo root):

   ```sh
   npx wrangler secret put GITHUB_CLIENT_ID --config workers/sveltia-cms-auth/wrangler.toml
   npx wrangler secret put GITHUB_CLIENT_SECRET --config workers/sveltia-cms-auth/wrangler.toml
   ```

3. Verify: a whitelisted `site_id` should now `302` to GitHub.

   ```sh
   curl -sD- -o/dev/null "https://stoicdev-cms-auth.brandonpittman.workers.dev/auth?provider=github&site_id=stoicdev.org"
   ```

## Redeploy (if `wrangler.toml` / `src` changes)

From the **repo root**, always pass `--config`:

```sh
npx wrangler deploy --config workers/sveltia-cms-auth/wrangler.toml
```
