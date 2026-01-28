# Shared Review Status - Quick Setup Guide

## For Both Users to See the Same Comments & Checkmarks

### Option 1: Use the Same Token (Easiest)

1. **One person sets it up:**
   - Visit: `https://innerflect-tech.github.io/waqup-documentation/enable-online-storage.html`
   - Enter your GitHub Personal Access Token
   - Click "Save Token & Enable Online Storage"
   - Click "Test Connection" to verify it works

2. **Share the token securely with the other person:**
   - Send via private message (not email or public chat)
   - They visit the same setup page and enter the token
   - Both users will now see the same data!

### Option 2: Each User Gets Their Own Token (More Secure)

1. **Each person creates their own GitHub token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name: "waQup Docs Review Status"
   - Scope: Select `repo` (full control)
   - Generate and copy the token

2. **Each person enables online storage:**
   - Visit: `https://innerflect-tech.github.io/waqup-documentation/enable-online-storage.html`
   - Enter their own token
   - Both will see the same shared data!

## How to Verify It's Working

After enabling online storage, you should see:
- 💾 **"Online storage enabled"** message under each review section
- Comments and checkmarks sync immediately
- Data is stored in `docs/review-data.json` in the GitHub repository

## Quick Access Links

- **Setup Page:** `enable-online-storage.html`
- **Internal Docs:** `index.html`
- **Investor Brief:** `investors/index.html`

## Important Security Notes

⚠️ **Never commit tokens to git or share them publicly!**

**If you've accidentally shared a token:**
1. Go to https://github.com/settings/tokens
2. Find and revoke the compromised token
3. Create a new token
4. Share the new token securely (private message only)

## Troubleshooting

- **Not seeing "Online storage enabled"?** Make sure you've saved the token using the setup page
- **Comments not syncing?** Check browser console for errors, verify token has `repo` scope
- **404 errors?** The `review-data.json` file will be created automatically on first save
