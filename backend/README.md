# Backend Setup Guide

This folder contains PHP scripts to handle form submissions and send emails to jrhamilton0929@gmail.com.

## Files:
- `submit-contact.php` - Handles main contact form submissions
- `submit-service-inquiry.php` - Handles service inquiry form submissions

## Deployment Steps:

### 1. Upload to Web Server
Upload the entire `backend` folder to your web server where you have PHP enabled.

### 2. Update JavaScript URLs
In your `script.js` file, update the fetch URLs:

**For main contact form:**
```javascript
const response = await fetch('https://yourdomain.com/backend/submit-contact.php', {
```

**For service inquiry form:**
```javascript
const response = await fetch('https://yourdomain.com/backend/submit-service-inquiry.php', {
```

Replace `yourdomain.com` with your actual domain.

### 3. Security Configuration
For production, update the CORS header in both PHP files:
```php
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

### 4. Email Configuration
Both scripts are already configured to send emails to:
- **To:** jrhamilton0929@gmail.com
- **Subject:** "Website Inquiry" (with different suffixes)
- **From:** noreply@yourdomain.com
- **Reply-To:** Customer's email address

## Features Included:
- ✅ Input validation and sanitization
- ✅ CORS headers for cross-origin requests
- ✅ JSON error responses
- ✅ Detailed email formatting
- ✅ Technical details (timestamp, IP, page)
- ✅ All form fields included in email

## Testing:
1. Upload files to server
2. Update JavaScript URLs
3. Test form submissions
4. Check that emails arrive at jrhamilton0929@gmail.com

## Alternative: Use a Free Service
If you prefer not to set up PHP, you can also use services like:
- EmailJS (free tier available)
- Netlify Forms
- Vercel API routes
- Firebase Functions

The current JavaScript setup will work with any of these by changing the fetch URLs.