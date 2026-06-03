# GitHub Actions Deployment Setup

This workflow automatically deploys your website to the server whenever you push to the `main` branch.

## Setup Instructions

### Step 1: Add FTP Credentials to GitHub Secrets

1. Go to your GitHub repository: https://github.com/eakmal-service/Gottlich-hardware
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these three secrets:

   - **Secret Name:** `FTP_SERVER`
     - **Value:** Your FTP server address (e.g., `ftp.gottlichhardware.com` or `gottlichhardware.com`)
   
   - **Secret Name:** `FTP_USERNAME`
     - **Value:** Your FTP username
   
   - **Secret Name:** `FTP_PASSWORD`
     - **Value:** Your FTP password

### Step 2: Update Server Directory (if needed)

The default deployment directory is `/public_html/`. If your server uses a different directory (like `/www/`, `/httpdocs/`, or `/html/`), edit the `deploy.yml` file and change the `server-dir` value.

### Step 3: Test the Deployment

1. Commit and push any change to the `main` branch
2. Go to the **Actions** tab in your GitHub repository
3. You should see the workflow running
4. If successful, your changes will be automatically deployed to your server!

## How It Works

- **Trigger:** Automatically runs when you push to `main` branch
- **Manual Run:** Can also be triggered manually from the Actions tab
- **What it does:**
  - Checks out your code
  - Connects to your server via FTP
  - Uploads all files to the server
  - Excludes unnecessary files (`.git`, `node_modules`, etc.)

## Troubleshooting

### If deployment fails:

1. **Check FTP credentials** - Make sure they're correct in GitHub Secrets
2. **Check server directory** - Verify the `server-dir` path is correct
3. **Check FTP port** - If your server uses a non-standard port, add:
   ```yaml
   port: 21  # or your custom port
   ```
4. **Check SFTP** - If you use SFTP instead of FTP, change to:
   ```yaml
   protocol: ftps  # or sftp
   ```

### View deployment logs:

Go to **Actions** tab → Click on the workflow run → View detailed logs

## Security Note

Never commit FTP credentials directly in code. Always use GitHub Secrets!
