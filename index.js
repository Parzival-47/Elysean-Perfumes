require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home-page.html'));
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', page);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Page not found');
        }
    });
});
 
app.post('/create-checkout', async (req, res) => {
    const { amountInCents } = req.body;
    try {
        const response = await fetch('https://payments.yoco.com/api/checkouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${YOCO_SECRET_KEY}`
            },
            body: JSON.stringify({
                amount: amountInCents,
                currency: 'ZAR',
                successUrl: `https://elyseanperfumes.co.za/cart-page.html?success=true`,
                cancelUrl: `https://elyseanperfumes.co.za/checkout.html`,
                failureUrl: `https://elyseanperfumes.co.za/checkout.html`,
                metadata: metadata || {}
            })
        });
        const data = await response.json();
        console.log('Yoco response:', data);
        if (data.redirectUrl) {
            res.json({ redirectUrl: data.redirectUrl });
        } else {
            res.status(400).json({ error: 'Could not create checkout', details: data });
        }
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: error.message });
    }
});
 
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    try {
        const event = JSON.parse(req.body);
        console.log('Webhook received:', event);
        if (event.type === 'payment.succeeded') {
            const payment = event.payload;
            const customerInfo = payment.metadata;

            console.log('Payment successful! ID:', event.payload.id);
            console.log('Customer Info:', customerInfo);
            console.log('Amount:', payment.amount / 100, 'ZAR');
        } else if (event.type === 'payment.failed') {
            console.log('❌ Payment Failed:', event.payload);
        }

        // Always return 200 OK quickly
        res.status(200).send('OK');
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(400).send('Error');
    }
});
 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

