# Netlify Deployment Instructions

## Environment Variables Setup

After deploying to Netlify, set these environment variables in your Netlify dashboard:

1. Go to your Netlify site dashboard
2. Navigate to: Site Settings → Environment Variables
3. Add these variables:

```
EMAILJS_SERVICE_ID = service_03owqxk
EMAILJS_CONTACT_TEMPLATE = template_8gxax7w
EMAILJS_SERVICE_TEMPLATE = template_m1kk0n5
EMAILJS_PUBLIC_KEY = u5U7kzPn5p1OUsf8s
```

## Security Notes

- EmailJS credentials are now stored in config.js with fallbacks
- Environment variables provide additional security layer in production
- Content Security Policy headers configured for XSS protection
- All static assets have proper caching headers

## Deployment Steps

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Set the environment variables as shown above
4. Deploy!

The site will automatically use environment variables when available, falling back to the config.js values for local development.

## Files Modified for Production

- `script.js` - Removed debug logs, uses secure config
- `config.js` - Centralized EmailJS configuration
- `netlify.toml` - Deployment and security configuration
- `index.html` - Added config.js script inclusion

All functionality has been preserved while making the deployment production-ready and secure.