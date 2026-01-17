// Email Configuration
// This will load from Netlify Functions in production
// No hardcoded fallback values for security

let emailConfig = null;

// Try to load configuration from Netlify Functions
async function loadConfig() {
    try {
        const response = await fetch('/.netlify/functions/config');
        if (response.ok) {
            const config = await response.json();
            // Only update if all values are present
            if (config.serviceId && config.contactTemplateId && config.serviceTemplateId && config.publicKey) {
                emailConfig = config;
                console.log('✅ Loaded secure configuration from environment variables');
            } else {
                console.error('❌ Environment variables not properly configured');
                emailConfig = null;
            }
        } else {
            console.error('❌ Configuration function not available');
            emailConfig = null;
        }
    } catch (error) {
        console.error('❌ Error loading configuration:', error.message);
        emailConfig = null;
    }
    
    // Make config globally available
    window.emailConfig = emailConfig;
    
    // Dispatch event to notify that config is ready
    window.dispatchEvent(new CustomEvent('configReady'));
}

// Load configuration immediately
loadConfig();