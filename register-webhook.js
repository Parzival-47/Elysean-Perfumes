// ── ONE-TIME SCRIPT — run this once from your terminal, then you can delete it ──
// This registers your webhook URL with Yoco using their Webhooks Management API.
// Docs: https://developer.yoco.com/online/api-reference/webhooks/

require('dotenv').config();
const fetch = require('node-fetch');

const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;
const WEBHOOK_URL = 'https://elyseanperfumes.co.za/webhook';

async function registerWebhook() {
    try {
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
        const response = await fetch('https://payments.yoco.com/api/webhooks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${YOCO_SECRET_KEY}`
            }
        });
        const data = await response.json();
        console.log('📋 Currently registered webhooks:');
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('❌ Error listing webhooks:', error);
    }
}

// ── Run both: first list existing, then register new one ──
(async () => {
    console.log('Checking existing webhooks first...\n');
    await listWebhooks();
    console.log('\nNow registering new webhook...\n');
    await registerWebhook();
})();
