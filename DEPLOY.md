# Deploy your live site (do this once)

GitHub Pages is **not automatic** — you must click one setting.

## Step 1 — Wait for Actions (after push)

Open: https://github.com/Lu3ky13/lu3ky13-portfolio/actions

Wait until **"Publish site to gh-pages"** shows a green checkmark.

## Step 2 — Turn on Pages (required)

1. Open: https://github.com/Lu3ky13/lu3ky13-portfolio/settings/pages
2. **Build and deployment → Source:** choose **Deploy from a branch**
3. **Branch:** `gh-pages` → folder **`/ (root)`**
4. Click **Save**

## Step 3 — Open your site

After 1–2 minutes:

**https://lu3ky13.github.io/lu3ky13-portfolio/**

---

## Still not working?

| Problem | Fix |
|---------|-----|
| Repo is Private | Settings → General → change to **Public** |
| No `gh-pages` branch | Re-run the Actions workflow |
| 404 after Save | Wait 3 min, then Ctrl+Shift+R |

## Update site later

```powershell
cd "c:\Users\jrt\Downloads\JS_Scraper\lu3ky13-site"
git add .
git commit -m "update site"
git push
```

Actions will rebuild `gh-pages` automatically.
