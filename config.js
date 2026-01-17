// Email Configuration - Version 2.0 (Fixed)
// This will load from Netlify Functions in production
// Temporary fallback for immediate functionality

let emailConfig = {
    serviceId: 'service_03owqxk',
    contactTemplateId: 'template_8gxax7w',
    serviceTemplateId: 'template_m1kk0n5',
    publicKey: 'u5U7kzPn5p1OUsf8s'
};

// Make config immediately available
window.emailConfig = emailConfig;
console.log('✅ Initial emailConfig set (v2.0):', window.emailConfig);

// Try to load secure configuration from Netlify Functions (override fallback)
async function loadConfig() {
    console.log('🔄 Attempting to load config from Netlify function...');
    try {
        const response = await fetch('/.netlify/functions/config');
        console.log('📡 Function response status:', response.status);
        
        if (response.ok) {
            const config = await response.json();
            console.log('📥 Received config from function:', {
                hasServiceId: !!config.serviceId,
                hasContactTemplate: !!config.contactTemplateId,
                hasServiceTemplate: !!config.serviceTemplateId,
                hasPublicKey: !!config.publicKey
            });
            
            // Only update if all values are present
            if (config.serviceId && config.contactTemplateId && config.serviceTemplateId && config.publicKey) {
                emailConfig = config;
                window.emailConfig = config;
                console.log('✅ Loaded secure configuration from environment variables');
            } else {
                console.log('⚠️ Using fallback configuration (some env vars missing)');
            }
        } else {
            console.log('⚠️ Using fallback configuration (function not available, status:', response.status + ')');
        }
    } catch (error) {
        console.log('⚠️ Using fallback configuration (error loading from function):', error.message);
    }
    
    // Final check
    console.log('🏁 Final emailConfig:', window.emailConfig);
    
    // Dispatch event to notify that config is ready (even if using fallback)
    window.dispatchEvent(new CustomEvent('configReady'));
}

// Load configuration with a slight delay to ensure DOM is ready
setTimeout(loadConfig, 100);