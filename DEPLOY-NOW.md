# 🚀 Deploy Maintenance Mode - Quick Guide

## ✅ FASTEST METHOD: Hostinger File Manager (2 Minutes)

### Step 1: Login to Hostinger
1. Open: https://hpanel.hostinger.com/
2. Email: `gujaratsunmicasurat@gmail.com`
3. Password: `Gujarat@7412`

### Step 2: Open File Manager
1. Click on **Websites** (left sidebar)
2. Select **gottlichhardware.com**
3. Click **File Manager** button (top right)

### Step 3: Upload Files
Navigate to the website root directory (usually `/public_html` or `/domains/gottlichhardware.com/public_html`)

**Upload these 2 files:**

**File 1: `.htaccess`** (REPLACE existing file)
- Location on Mac: `/Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/.htaccess`
- In File Manager: Right-click → Upload → Select file → Overwrite

**File 2: `maintenance.html`** (NEW file)
- Location on Mac: `/Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/maintenance.html`
- In File Manager: Upload this new file

### Step 4: Verify
- Visit: https://gottlichhardware.com
- You should see the maintenance page! ✅
- If old site shows, press `Cmd+Shift+R` to clear cache

---

## 🤖 ALTERNATIVE: Setup Hostinger Git (For Auto-Deployment)

If you want automatic deployment from GitHub:

### In Hostinger hPanel:
1. Go to **Git** section (in left sidebar under "Advanced")
2. Click **"Create New Repository"**
3. Fill in:
   - **Repository URL:** `https://github.com/eakmal-service/Gottlich-hardware.git`
   - **Branch:** `main`
   - **Target Path:** `/public_html` (or your website directory)
4. Click **Create**
5. Click **Pull** to deploy immediately

**Now whenever you:**
```bash
git push origin main
```
**Website automatically updates!** 🎉

---

## 📂 Files Ready for Upload

The files are already created and ready at:
```
.htaccess          → /Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/.htaccess
maintenance.html   → /Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/maintenance.html
```

Just drag and drop them in Hostinger File Manager!

---

## 🔄 To Remove Maintenance Mode Later

1. Open File Manager in Hostinger
2. Edit `.htaccess` file
3. Delete lines 8-18 (the MAINTENANCE MODE section)
4. Save
5. Website will be live again! ✅

---

## 📞 Need Help?

If you face any issues:
1. Check file permissions in File Manager (should be 644)
2. Clear browser cache
3. Check error logs in hPanel → **Logs** section
