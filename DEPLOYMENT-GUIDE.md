# 🚀 Gottlich Hardware - Complete Deployment Guide

## ✅ What's Ready to Deploy:

1. ✅ **Admin Panel** - Complete with maintenance toggle
2. ✅ **Maintenance Page** - Professional looking page
3. ✅ **Updated .htaccess** - Admin accessible during maintenance
4. ✅ **All files committed to GitHub**

---

## 🎯 EASIEST METHOD: Hostinger File Manager (5 Minutes)

### Step 1: Login to Hostinger

1. Open: **https://hpanel.hostinger.com/**
2. Email: `gujaratsunmicasurat@gmail.com`
3. Password: `Gujarat@7412`

### Step 2: Open File Manager

1. Click **"Websites"** in left sidebar
2. Select **"gottlichhardware.com"**
3. Click **"File Manager"** button (top right area)

### Step 3: Navigate to Website Root

- Usually: `/public_html` or `/domains/gottlichhardware.com/public_html`
- This is where your `index.html` file is located

### Step 4: Upload Files

**You have 2 options:**

#### **Option A: Upload ZIP File (Recommended - Fastest)**

1. In File Manager, click **"Upload"** button
2. Upload this file: `/Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/admin-panel.zip`
3. Right-click the uploaded `admin-panel.zip`
4. Select **"Extract"**
5. Delete the zip file after extraction

Then upload these 2 files separately:
- `.htaccess` (will ask to overwrite - click YES)
- `maintenance.html` (new file)

#### **Option B: Manual Upload (More Control)**

Upload these files/folders to website root:

**Files to upload:**
```
✅ .htaccess           → REPLACE existing file
✅ maintenance.html    → NEW file
✅ admin/              → NEW folder (entire folder)
```

**From these locations on your Mac:**
```
/Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/.htaccess
/Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/maintenance.html
/Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/admin/
```

### Step 5: Verify Deployment

1. **Check Admin Panel:**
   - Visit: `https://gottlichhardware.com/admin/`
   - Should show login page ✅

2. **Check Maintenance Mode:**
   - Visit: `https://gottlichhardware.com`
   - Should still show main website (maintenance OFF by default)
   - Clear cache: `Cmd+Shift+R` if old page shows

### Step 6: Login to Admin

1. Go to: `https://gottlichhardware.com/admin/`
2. Login with:
   - **Username:** `admin`
   - **Password:** `Gottlich@2024`
3. You're in! 🎉

### Step 7: Test Maintenance Mode

1. In admin panel, click **"Maintenance Mode"** in sidebar
2. Toggle the switch **ON**
3. Click **"Save Changes"**
4. Open new incognito window
5. Visit: `https://gottlichhardware.com`
6. Should show maintenance page! ✅
7. Admin panel still accessible at `/admin/` ✅

---

## 🤖 ALTERNATIVE: Git Auto-Deployment (One-Time Setup)

If you want automatic deployment from GitHub:

### Setup Hostinger Git Integration

1. In Hostinger hPanel, go to **"Git"** section (left sidebar)
2. Click **"Create New Repository"**
3. Fill in:
   - **Repository URL:** `https://github.com/eakmal-service/Gottlich-hardware.git`
   - **Branch:** `main`
   - **Target Path:** `/public_html` (or your website directory)
4. Click **"Create"**
5. Click **"Pull"** button

**Now, whenever you run:**
```bash
git push origin main
```
**Website automatically updates!** 🚀

---

## 🔐 IMPORTANT: Change Admin Password

After first login, change the password:

### Method 1: Via Hostinger File Manager
1. Navigate to `/public_html/admin/`
2. Right-click `index.php` → Edit
3. Find line 6-7:
   ```php
   define('ADMIN_USERNAME', 'admin');
   define('ADMIN_PASSWORD', 'Gottlich@2024');
   ```
4. Change to:
   ```php
   define('ADMIN_USERNAME', 'yourusername');
   define('ADMIN_PASSWORD', 'YourSecurePassword123!');
   ```
5. Save file

### Method 2: Update Locally and Re-upload
1. Edit `/Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich/admin/index.php`
2. Change credentials
3. Re-upload file

---

## 📋 Admin Panel Features

Once logged in, you can:

### Dashboard
- ✅ View website status (Live/Maintenance)
- ✅ See file count and total size
- ✅ Quick actions

### Maintenance Mode
- ✅ Toggle ON/OFF with one click
- ✅ Customize maintenance message
- ✅ Update contact email
- ✅ Changes apply instantly

### Navigation
- 📊 Dashboard
- 🔨 Maintenance Mode
- 📁 File Manager (coming soon)
- ⚙️ Settings (coming soon)
- 📋 Activity Logs (coming soon)

---

## 🔧 Troubleshooting

### Admin Panel Shows 404
- Check folder uploaded correctly to `/public_html/admin/`
- Check folder name is exactly `admin` (lowercase)
- Verify index.php exists in admin folder

### Cannot Login
- Check username/password in `admin/index.php`
- Clear browser cookies
- Try incognito window

### Maintenance Mode Not Working
- Check `.htaccess` file uploaded correctly
- File permissions should be `644`
- Clear browser cache with `Cmd+Shift+R`

### Permission Errors
Set correct permissions in File Manager:
- **Files:** 644 (right-click → Permissions)
- **Folders:** 755
- **.htaccess:** 644

### PHP Errors
- Check PHP version (should be 7.4 or higher)
- Enable error logging in Hostinger
- Check error logs in hPanel

---

## 📱 Mobile Access

Admin panel works perfectly on:
- ✅ Desktop
- ✅ Tablets
- ✅ Smartphones

Manage your website from anywhere! 📱

---

## 🎨 Customization

### Change Admin Panel Colors

Edit `admin/admin-style.css`:
```css
:root {
    --primary-color: #667eea;  /* Your color */
    --secondary-color: #764ba2; /* Your color */
}
```

### Change Maintenance Message

Two ways:
1. **Via Admin Panel:** Login → Maintenance Mode → Edit message
2. **Manually:** Edit `maintenance.html` in File Manager

---

## 🔄 To Disable Maintenance Mode Later

### Option 1: Via Admin Panel (Easiest)
1. Login to admin panel
2. Toggle maintenance OFF
3. Save changes

### Option 2: Manually Edit .htaccess
1. Open `.htaccess` in File Manager
2. Delete lines 8-18 (MAINTENANCE MODE section)
3. Save file

---

## 📦 File Structure After Deployment

```
public_html/
├── admin/
│   ├── index.php           ← Admin backend
│   ├── login.php           ← Login page
│   ├── admin-style.css     ← Styles
│   ├── admin-script.js     ← JavaScript
│   ├── .htaccess           ← Security
│   └── README.md           ← Documentation
├── .htaccess               ← Updated with admin access
├── maintenance.html        ← Maintenance page
├── index.html              ← Your main website
└── (other website files)
```

---

## ✅ Deployment Checklist

Before going live:

- [ ] Admin panel uploaded
- [ ] .htaccess updated
- [ ] maintenance.html uploaded
- [ ] Admin login working
- [ ] Password changed
- [ ] Maintenance mode tested
- [ ] Website accessible
- [ ] Admin accessible during maintenance

---

## 🆘 Need Help?

**Quick Solutions:**

1. **FTP Method:** Run `./quick-deploy.sh` and enter FTP credentials
2. **File Manager:** Upload files manually via Hostinger panel
3. **Git Method:** Setup Git integration for auto-deployment

**Get FTP Credentials:**
- Hostinger hPanel → Websites → Files → FTP Accounts

**Support:**
- Check Hostinger documentation
- Review PHP error logs
- Contact Hostinger support

---

## 🎉 Success Indicators

You'll know it's working when:

✅ Admin panel loads at `/admin/`  
✅ Login works with credentials  
✅ Dashboard shows website stats  
✅ Maintenance toggle works  
✅ Website shows maintenance page when enabled  
✅ Admin still accessible during maintenance  

---

## 🚀 Ready to Deploy!

**Everything is prepared. Just follow Method 1 (File Manager) above.**

**Total time: ~5 minutes**

---

**Made with ❤️ for Gottlich Hardware**

Last Updated: June 18, 2026
