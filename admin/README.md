# Gottlich Hardware - Admin Panel

## 🚀 Features

✅ **Dashboard** - Overview of website stats and quick actions  
✅ **Maintenance Mode** - Toggle maintenance mode on/off with one click  
✅ **Custom Messages** - Edit maintenance page message and contact email  
✅ **File Manager** - Manage website files (coming soon)  
✅ **Settings** - Configure admin panel settings (coming soon)  
✅ **Activity Logs** - Track all admin actions (coming soon)  

---

## 🔐 Login Credentials

**Default credentials:**
- **Username:** `admin`
- **Password:** `Gottlich@2024`

**⚠️ IMPORTANT:** Change these credentials after first login!

To change credentials, edit `/admin/index.php`:
```php
define('ADMIN_USERNAME', 'your_username');
define('ADMIN_PASSWORD', 'your_secure_password');
```

---

## 📂 Installation

1. **Upload admin folder** to your website root directory
2. **Access admin panel** at: `https://gottlichhardware.com/admin/`
3. **Login** with default credentials
4. **Change password** immediately!

---

## 🛠️ Usage

### Toggle Maintenance Mode

1. Login to admin panel
2. Go to **Maintenance Mode** section
3. Toggle the switch ON/OFF
4. Click **Save Changes**
5. Website will immediately switch to maintenance mode!

### Customize Maintenance Message

1. Go to **Maintenance Mode** section
2. Edit the message text
3. Update contact email
4. Click **Update Message**
5. Changes will reflect on maintenance page

### Quick Actions

From Dashboard, you can:
- Toggle maintenance mode
- Manage files
- Clear cache
- Backup website

---

## 🔒 Security Features

✅ **Session-based authentication**  
✅ **Protected file access**  
✅ **Security headers enabled**  
✅ **Directory listing disabled**  
✅ **PHP error display disabled**  

### Additional Security (Optional)

Enable `.htpasswd` protection:

1. Generate password file:
```bash
htpasswd -c /path/to/.htpasswd admin
```

2. Uncomment lines in `/admin/.htaccess`:
```apache
AuthType Basic
AuthName "Admin Area"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

---

## 🎨 Customization

### Change Colors

Edit `/admin/admin-style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* Change these to your brand colors */
}
```

### Add New Sections

1. Add navigation item in `index.php`:
```html
<a href="#new-section" class="nav-item" data-section="new-section">
    <span class="icon">🎯</span>
    New Section
</a>
```

2. Add section content:
```html
<section id="new-section" class="content-section">
    <h2>New Section</h2>
    <!-- Your content here -->
</section>
```

---

## 🐛 Troubleshooting

### Cannot Login
- Check username and password in `index.php`
- Clear browser cookies and cache
- Check PHP session is working

### Maintenance Mode Not Working
- Verify `.htaccess` file permissions (644)
- Check Apache mod_rewrite is enabled
- Clear browser cache

### Permission Denied Errors
- Set correct file permissions:
  - Files: `644`
  - Directories: `755`
  - `.htaccess`: `644`

### PHP Errors
- Check PHP version (7.4+ required)
- Enable error logging in `.htaccess`
- Check server error logs

---

## 📱 Mobile Responsive

The admin panel is fully responsive and works on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones

---

## 🔄 Updates

### Version 1.0.0 (Current)
- ✅ Dashboard with stats
- ✅ Maintenance mode toggle
- ✅ Custom maintenance messages
- ✅ Secure login system
- ✅ Responsive design

### Coming Soon
- 📁 File manager with upload/delete
- ⚙️ Advanced settings panel
- 📋 Activity logging
- 📊 Analytics integration
- 👥 Multi-user support
- 🔔 Email notifications

---

## 🆘 Support

For issues or questions:
- Check the troubleshooting section
- Review PHP error logs
- Contact your hosting provider

---

## 📄 File Structure

```
admin/
├── index.php              # Main admin panel
├── login.php              # Login page
├── admin-style.css        # Stylesheet
├── admin-script.js        # JavaScript
├── .htaccess              # Security rules
├── README.md              # This file
└── settings.json          # Settings storage (auto-created)
```

---

## ⚡ Performance

- Lightweight design (~50KB total)
- No external dependencies
- Fast loading times
- Minimal server resources

---

## 🔐 Password Security Tips

1. Use strong passwords (12+ characters)
2. Mix uppercase, lowercase, numbers, symbols
3. Don't reuse passwords
4. Change passwords regularly
5. Enable `.htpasswd` for extra security

---

## 📝 License

This admin panel is part of the Gottlich Hardware website.
For internal use only.

---

**Made with ❤️ for Gottlich Hardware**
