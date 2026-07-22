# Connecting this site to GitHub + Netlify (so previews are free)

This folder is already a Git repository with one commit containing your full current site. Two steps left, both need your own logins, so I can't do them for you — but each is quick.

## Step 1 — Create the GitHub repo

**If you have GitHub Desktop or the `gh` CLI installed**, this one command does everything (run it from inside this folder in Terminal):

```
gh repo create fgkids-site --private --source=. --remote=origin --push
```

**Otherwise, the manual way:**
1. Go to [github.com/new](https://github.com/new) and create a new repository named `fgkids-site` (Private is fine — Netlify can deploy from private repos). Do **not** initialize it with a README, .gitignore, or license — this folder already has a commit.
2. Copy the repo URL GitHub shows you (something like `https://github.com/your-username/fgkids-site.git`).
3. In Terminal, `cd` into this folder and run:
   ```
   git remote add origin https://github.com/your-username/fgkids-site.git
   git push -u origin main
   ```
   (Replace the URL with your actual repo URL from step 2.)

## Step 2 — Connect Netlify to the GitHub repo

1. In your Netlify dashboard, go to **Spatial Apex** (the team the site is under) → **Add new site** → **Import an existing project**.
2. Choose **GitHub**, authorize Netlify if prompted, and select the `fgkids-site` repo.
3. Build settings:
   - Build command: leave **blank** (this is a plain static site, no build step)
   - Publish directory: `/` (the repo root)
4. Click **Deploy**. This first deploy will use one production-deploy credit — after that, you're set up.
5. Once it's live and working, you can delete or disconnect your old manually-deployed site in Netlify if you don't want two copies running (optional).

## The new workflow — this is the part that saves your credits

From now on, don't push straight to `main`. Instead:

```
git checkout -b preview
# ...make your edits...
git add -A
git commit -m "describe the change"
git push origin preview
```

Netlify will automatically build a **Deploy Preview** for that branch and give you a unique throwaway URL — this costs **0 credits**, no matter how many times you push. Open that URL and review the real, live-hosted site.

When you're happy with it:

```
git checkout main
git merge preview
git push origin main
```

*That* push is what triggers a real production deploy (15 credits) — the one that goes live on fgkidsproject.com. Everything before it was free.
