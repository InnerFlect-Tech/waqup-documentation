# Review Status Online Storage Setup

The review status system now supports online storage via GitHub API, allowing comments and checkmarks to be shared across all users and devices.

## How It Works

1. **Local Storage (Default)**: Works immediately, stores data in browser localStorage
2. **Online Storage (GitHub API)**: Stores data in `docs/review-data.json` file in the repository

## Setting Up Online Storage

### Option 1: GitHub Personal Access Token (Recommended)

1. Create a GitHub Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name like "waQup Docs Review Status"
   - Select scope: `repo` (full control of private repositories)
   - Generate token and copy it

2. Use the token:
   - Add `?token=YOUR_TOKEN` to any documentation URL
   - Example: `https://innerflect-tech.github.io/waqup-documentation/investors/?token=ghp_xxxxxxxxxxxx`
   - The token will be saved in localStorage for future visits

3. The token is stored locally in your browser - it's not exposed in the URL after the first load

### Option 2: GitHub App (More Secure, for Team Use)

For team use, consider creating a GitHub App with limited permissions:
- Only needs write access to `docs/review-data.json`
- Can be revoked/rotated easily
- Better for production use

## Security Notes

- Tokens are stored in browser localStorage (encrypted by browser)
- Tokens are never committed to git
- Each user needs their own token
- Tokens can be revoked at any time from GitHub settings

## Fallback Behavior

- If online storage fails, the system automatically falls back to localStorage
- Data is synced: online storage is primary, localStorage is backup
- When online storage is enabled, changes sync to GitHub immediately

## File Location

Review data is stored in: `docs/review-data.json`

This file will be automatically created and updated when online storage is enabled.
