# 🚀 GitHub Deployment Instructions

## What You Need to Do:

### Step 1: Create GitHub Repository

1. Go to https://github.com and log in
2. Click the "+" icon (top-right) → "New repository"
3. Enter:
   - Repository name: `travel-buddy`
   - Description: "Find your perfect travel companion"
   - Visibility: **Public** (required for GitHub Pages)
   - Don't check "Initialize with README"
4. Click "Create repository"

### Step 2: Get Your GitHub Username

After creating the repo, you'll see a page with commands. Note down your username from the URL:
`https://github.com/YOUR_USERNAME/travel-buddy`

### Step 3: Update package.json

Open `package.json` and replace `YOUR_GITHUB_USERNAME` with your actual GitHub username on line 5:

```json
"homepage": "https://YOUR_ACTUAL_USERNAME.github.io/travel-buddy",
```

### Step 4: Connect and Push to GitHub

Run these commands in your terminal (replace YOUR_USERNAME):

```bash
cd "/Users/prakashranjankerketta/Desktop/Travel buddy"

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/travel-buddy.git

# Push code to GitHub
git push -u origin main
```

### Step 5: Deploy to GitHub Pages

```bash
# This will build and deploy your site
npm run deploy
```

Wait 1-2 minutes, then visit:
`https://YOUR_USERNAME.github.io/travel-buddy`

### Step 6: Enable GitHub Pages (if needed)

If the site doesn't load:
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll to "Pages" in the left sidebar
4. Under "Source", select branch: `gh-pages`
5. Click "Save"

---

## Quick Commands Reference

```bash
# After making changes to your code
git add .
git commit -m "Describe your changes"
git push

# To deploy updates
npm run deploy
```

---

## Your Site Will Be Live At:

🌐 `https://YOUR_USERNAME.github.io/travel-buddy`

---

## Troubleshooting

### If push fails with authentication error:

You may need to use a Personal Access Token:

1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use the token as your password when pushing

OR use SSH:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/travel-buddy.git
```

### If deploy fails:

1. Make sure you updated the homepage in package.json
2. Run `npm install` again
3. Try `npm run build` first to check for errors
4. Then run `npm run deploy`

---

## File Size Report

✅ Your project is GitHub-ready!
- Source code: ~420 KB
- Documentation: ~180 KB
- Total upload: ~1.6 MB
- Upload time: 2-5 seconds

node_modules (505 MB) is automatically excluded via .gitignore
