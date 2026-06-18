# Hostinger FTP Setup Guide

## 📋 Step 1: Get FTP Credentials from Hostinger

1. **Login to Hostinger:**
   - Go to: https://hpanel.hostinger.com/
   - Email: `gujaratsunmicasurat@gmail.com`
   - Password: `Gujarat@7412`

2. **Find FTP Details:**
   - Dashboard → **Websites**
   - Select **gottlichhardware.com**
   - Go to **Files** → **FTP Accounts**
   - You'll see:
     - **FTP Host:** (e.g., `ftp.gottlichhardware.com` or IP address)
     - **FTP Username:** (usually like `u123456789` or `website@gottlichhardware.com`)
     - **FTP Port:** Usually `21`
     - **Directory:** Usually `/public_html` or `/domains/gottlichhardware.com/public_html`

3. **Create FTP Account (if not exists):**
   - Click **Create FTP Account**
   - Username: `deployment` (or any name)
   - Set password
   - Directory: `/public_html`
   - Save it!

---

## 🚀 Step 2: Manual Deployment via Hostinger File Manager (EASIEST)

**No FTP needed! Use Hostinger's built-in file manager:**

1. Login to Hostinger hPanel
2. Go to **Files** → **File Manager**
3. Navigate to `/public_html` or `/domains/gottlichhardware.com/public_html`
4. Upload these 2 files:
   - `.htaccess` (replace existing)
   - `maintenance.html` (new file)
5. Done! ✅

**File locations on your Mac:**
```
/Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/.htaccess
/Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/maintenance.html
```

---

## 🤖 Step 3: Setup GitHub Auto-Deployment (For Future)

### Option A: Using Hostinger's Git Integration (RECOMMENDED)

1. In Hostinger hPanel → Go to **Git**
2. Click **Create New Repository**
3. Repository URL: `https://github.com/eakmal-service/Gottlich-hardware.git`
4. Branch: `main`
5. Target directory: `/public_html`
6. Click **Create**
7. ✅ Now every time you push to GitHub, Hostinger will auto-pull!

### Option B: GitHub Actions (if Git not available)

Add these secrets to GitHub:
- Go to: https://github.com/eakmal-service/Gottlich-hardware/settings/secrets/actions
- Add FTP credentials found in Step 1

---

## 🆘 Quick Fix - Upload Now via Terminal

If you have FTP credentials, update `deploy-manual.sh`:

```bash
FTP_HOST="your_ftp_host"        # e.g., ftp.gottlichhardware.com
FTP_USER="your_ftp_username"    # e.g., u123456789
FTP_PASS="your_ftp_password"    # From Hostinger FTP section
REMOTE_DIR="/public_html"       # or /domains/gottlichhardware.com/public_html
```

Then run:
```bash
./deploy-manual.sh
```

---

## ✅ Verify Deployment

After deployment, check:
- https://gottlichhardware.com
- Should show maintenance page
- Clear browser cache: `Cmd+Shift+R`

---

## 🔄 To Disable Maintenance Mode Later

Edit `.htaccess` and remove/comment lines 8-18 (Maintenance Mode section)
