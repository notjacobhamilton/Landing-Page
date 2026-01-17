# Local Development Setup

## EmailJS Configuration for Local Testing

For local development, you need to create a local configuration file since the hardcoded values have been removed for security.

### Step 1: Create Local Config File

Copy `config.local.example.js` to `config.local.js`:

```bash
cp config.local.example.js config.local.js
```

### Step 2: Add Your EmailJS Credentials

Edit `config.local.js` and replace the placeholder values:

```javascript
// Development Configuration
const emailConfigDev = {
    serviceId: 'service_03owqxk',           // Your EmailJS Service ID
    contactTemplateId: 'template_8gxax7w',  // Your Contact Template ID
    serviceTemplateId: 'template_m1kk0n5',  // Your Service Template ID  
    publicKey: 'u5U7kzPn5p1OUsf8s'        // Your EmailJS Public Key
};

// For local development, uncomment the line below:
window.emailConfig = emailConfigDev;
```

### Step 3: Test Locally

Run your local server:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000` and test the contact forms.

## Production Deployment

In production (Netlify), the configuration is loaded from environment variables via the serverless function. No hardcoded values are needed.

## Security Notes

- `config.local.js` is gitignored and will not be committed
- Production uses secure environment variables only
- No secrets are exposed in the deployed code