require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;
 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/yoco-payment.html'));
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
                successUrl: `http://localhost:${PORT}/success.html`,
                cancelUrl: `http://localhost:${PORT}/cancel.html`,
                failureUrl: `http://localhost:${PORT}/cancel.html`
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
    const event = JSON.parse(req.body);
    console.log('Webhook received:', event);
    if (event.type === 'payment.succeeded') {
        console.log('Payment successful! ID:', event.payload.id);
    }
    res.status(200).json({ received: true });
});
 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

