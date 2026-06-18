#!/bin/bash

# Gottlich Hardware - Manual Deployment Script for Hostinger
# This script deploys files via LFTP

echo "🚀 Starting deployment to Hostinger..."

# Hostinger FTP Configuration
FTP_HOST="ftp.gottlichhardware.com"  # Update if different
FTP_USER="gujaratsunmicasurat@gmail.com"
FTP_PASS="Gujarat@7412"
REMOTE_DIR="/public_html"  # Or /domains/gottlichhardware.com/public_html

# Check if lftp is installed
if ! command -v lftp &> /dev/null; then
    echo "❌ LFTP not installed. Installing..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install lftp
    else
        echo "Please install lftp manually"
        exit 1
    fi
fi

echo "📤 Uploading files to Hostinger..."

lftp -c "
set ftp:ssl-allow no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
lcd /Users/hanzalaqureshi/Sites/JioCloud/gottlich/gottlich
cd $REMOTE_DIR
mirror --reverse --delete --verbose --exclude .git --exclude .github --exclude .vscode --exclude .DS_Store --exclude deploy-manual.sh
bye
"

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful! Website is now live with maintenance mode."
    echo "🌐 Check: https://gottlichhardware.com"
else
    echo "❌ Deployment failed. Please check your FTP credentials."
fi
