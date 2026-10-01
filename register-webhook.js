// Optional Yoco helper. Prefer the Yoco portal steps in DEPLOYMENT-GUIDE.md.
// Running without --register only lists webhooks and cannot create a duplicate.

require('dotenv').config();
const fetch = require('node-fetch');

const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;
const WEBHOOK_URL = `${String(process.env.PUBLIC_BASE_URL || 'https://elyseanperfumes.co.za').replace(/\/$/, '')}/webhook`;

async function registerWebhook() {
    try {
        if (!YOCO_SECRET_KEY) throw new Error('YOCO_SECRET_KEY is not configured');
        const response = await fetch('https://payments.yoco.com/api/webhooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${YOCO_SECRET_KEY}`
            },
            body: JSON.stringify({
                name: 'Elysean Perfumes Order Confirmation',
                url: WEBHOOK_URL
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Webhook registered successfully!');
            console.log(data);
            console.log('\nIMPORTANT: Save the "id" and "secret" fields shown above somewhere safe.');
            console.log('The secret is used to verify incoming webhook signatures.');
        } else {
            console.log('❌ Failed to register webhook:');
            console.log(data);
        }
    } catch (error) {
        console.error('❌ Error registering webhook:', error);
    }
}

async function listWebhooks() {
    try {
        if (!YOCO_SECRET_KEY) throw new Error('YOCO_SECRET_KEY is not configured');
        const response = await fetch('https://payments.yoco.com/api/webhooks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${YOCO_SECRET_KEY}`
            }
        });
        const data = await response.json();
        console.log('📋 Currently registered webhooks:');
        console.log(JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('❌ Error listing webhooks:', error);
    }
}

(async () => {
    console.log('Checking existing webhooks first...\n');
    const existing = await listWebhooks();
    if (!process.argv.includes('--register')) {
        console.log('\nNo changes made. Use the Yoco portal, or rerun with --register only if this URL is not already registered.');
        return;
    }
    const rows = Array.isArray(existing) ? existing : (Array.isArray(existing?.data) ? existing.data : []);
    if (rows.some((item) => item.url === WEBHOOK_URL)) {
        console.log(`\nWebhook already exists for ${WEBHOOK_URL}; nothing was created.`);
        return;
    }
    console.log(`\nRegistering ${WEBHOOK_URL}...\n`);
    await registerWebhook();
})();
