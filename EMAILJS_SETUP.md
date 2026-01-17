# EmailJS Setup Guide

EmailJS is a free service that allows you to send emails directly from your frontend without a backend server.

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for jrhamilton0929@gmail.com)
   - Or any other provider
4. Follow the setup instructions to connect your email
5. Note down your **Service ID** (e.g., "service_abc123")

## Step 3: Create Email Templates
Create two email templates:

### Template 1: Contact Form
1. Go to "Email Templates" → "Create New Template"
2. **Template Name:** "Contact Form Submission"
3. **Template Content:**
```
Subject: Website Inquiry - Contact Form Submission

From: {{name}} <{{email}}>
Company: {{contactCompany}}
Phone: {{contactPhone}}
Project Type: {{projectType}}
Budget: {{budget}}
Timeline: {{timeline}}
Inspiration: {{inspirationUrl}}

Message:
{{contactMessage}}

---
Technical Details:
Submitted: {{timestamp}}
Page: {{page_url}}
User Agent: {{user_agent}}
```
4. Note down your **Template ID** (e.g., "template_xyz789")

### Template 2: Service Inquiry
1. Create another template for service inquiries
2. **Template Name:** "Service Inquiry"
3. **Template Content:**
```
Subject: Website Inquiry - Service Request

From: {{name}} <{{email}}>
Service Type: {{serviceType}}

Message:
{{message}}

---
Technical Details:
Submitted: {{timestamp}}
Page: {{page_url}}
User Agent: {{user_agent}}
```
4. Note down this **Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., "user_abc123xyz")

## Step 5: Update Your JavaScript
Open `script.js` and replace these placeholders:

### For Contact Form (around line 1300):
```javascript
const response = await emailjs.send(
    'service_YOUR_ID',      // Your Service ID
    'template_CONTACT_ID',  // Your Contact Template ID  
    formObject,
    'your_public_key'       // Your Public Key
);
```

### For Service Form (around line 1080):
```javascript
const response = await emailjs.send(
    'service_YOUR_ID',      // Same Service ID
    'template_SERVICE_ID',  // Your Service Template ID
    formObject,
    'your_public_key'       // Same Public Key
);
```

## Step 6: Test Your Forms
1. Save your changes and refresh your website
2. Fill out and submit a form
3. Check your email (jrhamilton0929@gmail.com) for the message
4. Check the browser console for any errors

## EmailJS Free Limits
- 200 emails per month
- Perfect for a landing page contact form
- Can upgrade later if needed

## Troubleshooting
- Make sure all IDs are correct and in quotes
- Check browser console for error messages
- Verify your email service is properly connected
- Test templates in EmailJS dashboard first

Your forms will now send emails directly to jrhamilton0929@gmail.com without needing any backend server!