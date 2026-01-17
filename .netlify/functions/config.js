exports.handler = async (event, context) => {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Return email configuration from environment variables
    const config = {
        serviceId: process.env.EMAILJS_SERVICE_ID,
        contactTemplateId: process.env.EMAILJS_CONTACT_TEMPLATE,
        serviceTemplateId: process.env.EMAILJS_SERVICE_TEMPLATE,
        publicKey: process.env.EMAILJS_PUBLIC_KEY
    };

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Cache-Control': 'public, max-age=3600'
        },
        body: JSON.stringify(config)
    };
};