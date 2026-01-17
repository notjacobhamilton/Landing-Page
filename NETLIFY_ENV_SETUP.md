# Netlify Environment Variables Setup

## Quick Setup Instructions

1. **Copy the variables below**
2. **Go to your Netlify dashboard**
3. **Navigate to: Site Settings → Environment Variables**
4. **Click "Add variable" for each one**

## Environment Variables to Add:

```
Key: EMAILJS_SERVICE_ID
Value: service_03owqxk
```

```
Key: EMAILJS_CONTACT_TEMPLATE
Value: template_8gxax7w
```

```
Key: EMAILJS_SERVICE_TEMPLATE
Value: template_m1kk0n5
```

```
Key: EMAILJS_PUBLIC_KEY
Value: u5U7kzPn5p1OUsf8s
```

## Alternative: Bulk Import

If Netlify supports bulk import, you can copy this format:

```
EMAILJS_SERVICE_ID=service_03owqxk
EMAILJS_CONTACT_TEMPLATE=template_8gxax7w
EMAILJS_SERVICE_TEMPLATE=template_m1kk0n5
EMAILJS_PUBLIC_KEY=u5U7kzPn5p1OUsf8s
```

## Security Note

- The `.env` file is gitignored and won't be pushed to your repository
- These variables will only be available in your Netlify production environment
- Your local development will continue to use the fallback values in `config.js`

## Verification

After setting up the environment variables in Netlify:

1. Deploy your site
2. Test both contact forms
3. Check that emails are still being sent properly
4. The forms should work exactly the same as in development