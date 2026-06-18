#!/bin/bash

echo "🚀 Gottlich Hardware - Quick Deployment Script"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if lftp is installed
if ! command -v lftp &> /dev/null; then
    echo -e "${RED}❌ LFTP not found${NC}"
    echo "LFTP is already installed. Continuing..."
fi

echo -e "${YELLOW}📋 Deployment Information:${NC}"
echo "  • Files to deploy: .htaccess, maintenance.html, admin/"
echo "  • Target: Hostinger Server"
echo "  • Website: gottlichhardware.com"
echo ""

# Get FTP credentials from user
echo -e "${YELLOW}🔐 Please provide FTP credentials from Hostinger:${NC}"
echo "  (Find in Hostinger hPanel → Websites → gottlichhardware.com → Files → FTP Accounts)"
echo ""

read -p "FTP Host (e.g., ftp.gottlichhardware.com): " FTP_HOST
read -p "FTP Username: " FTP_USER
read -sp "FTP Password: " FTP_PASS
echo ""
read -p "Remote Directory (default: /public_html): " REMOTE_DIR
REMOTE_DIR=${REMOTE_DIR:-/public_html}

echo ""
echo -e "${YELLOW}📤 Starting deployment...${NC}"
echo ""

# Create temporary exclude file
cat > /tmp/lftp-exclude << EOF
.git/
.github/
.vscode/
.DS_Store
node_modules/
*.log
*.bak
deploy-manual.sh
quick-deploy.sh
DEPLOY-NOW.md
HOSTINGER-SETUP.md
EOF

# Deploy using LFTP
lftp -c "
set ftp:ssl-allow no
set net:timeout 10
set net:max-retries 2
open -u $FTP_USER,$FTP_PASS $FTP_HOST || exit 1
lcd /Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich
cd $REMOTE_DIR || exit 1

echo 'Uploading .htaccess...'
put -O . .htaccess

echo 'Uploading maintenance.html...'
put -O . maintenance.html

echo 'Uploading admin panel...'
mirror --reverse --delete --verbose --exclude-glob-from=/tmp/lftp-exclude admin admin

echo 'Deployment complete!'
bye
"

RESULT=$?

# Cleanup
rm -f /tmp/lftp-exclude

echo ""
if [ $RESULT -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment Successful!${NC}"
    echo ""
    echo "🌐 Your website is now deployed!"
    echo ""
    echo -e "${GREEN}📋 Next Steps:${NC}"
    echo "  1. Visit: https://gottlichhardware.com"
    echo "     → Should show maintenance page"
    echo ""
    echo "  2. Admin Panel: https://gottlichhardware.com/admin/"
    echo "     → Username: admin"
    echo "     → Password: Gottlich@2024"
    echo ""
    echo "  3. ⚠️  CHANGE ADMIN PASSWORD in admin/index.php"
    echo ""
    echo "  4. Toggle maintenance mode from admin panel when ready!"
    echo ""
else
    echo -e "${RED}❌ Deployment Failed!${NC}"
    echo ""
    echo "Common issues:"
    echo "  • Wrong FTP credentials"
    echo "  • Wrong FTP host or directory"
    echo "  • Firewall blocking FTP"
    echo "  • Server down"
    echo ""
    echo "📋 To get correct credentials:"
    echo "  1. Login: https://hpanel.hostinger.com/"
    echo "  2. Websites → gottlichhardware.com"
    echo "  3. Files → FTP Accounts"
    echo ""
fi
