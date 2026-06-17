require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Elysean Perfumes';

// ── Send email via Brevo HTTP API ──
async function sendEmail(to, toName, subject, htmlContent) {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
            to: [{ email: to, name: toName }],
            subject: subject,
            htmlContent: htmlContent
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Brevo API error: ${JSON.stringify(data)}`);
    }
    return data;
}

// ── Build the product list rows for the email ──
function buildProductRows(cart) {
    if (!cart || cart.length === 0) return '';
    return cart.map(item => `
        <tr>
            <td style="padding: 10px 0; color: #0A0A0A; font-size: 0.88rem;">
                ${item.name}
                <span style="color: #999; font-size: 0.75rem; display: block;">${item.size}${item.qty > 1 ? ` · Qty ${item.qty}` : ''}</span>
            </td>
            <td style="padding: 10px 0; color: #0A0A0A; font-size: 0.88rem; text-align: right; white-space: nowrap;">
                R${(item.price * item.qty).toLocaleString()}
            </td>
        </tr>
    `).join('');
}

// ── Send both order emails ──
async function sendOrderEmails(customerInfo, amountInCents, checkoutId, cart, subtotal, shipping, tax) {
    const amountRands = (amountInCents / 100).toFixed(2);
    const customerName = `${customerInfo.firstName || ''} ${customerInfo.lastName || ''}`.trim();
    const productRows = buildProductRows(cart);

    // ── Customer confirmation email — mobile-safe, minimalist receipt style ──
    const customerHtml = `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px 16px; background: #0A0A0A; color: #fff; box-sizing: border-box;">

            <div style="text-align: center; border-bottom: 1px solid #333; padding-bottom: 24px; margin-bottom: 24px;">
                <h1 style="font-size: 1.8rem; margin: 0 0 4px 0; letter-spacing: 0.1em;">ELYSEAN</h1>
                <p style="color: #C9A84C; font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; margin: 0;">Luxury Fragrance House</p>
            </div>

            <p style="font-size: 0.95rem; line-height: 1.7; margin-bottom: 10px;">
                Dear ${customerInfo.firstName || 'Valued Customer'},
            </p>
            <p style="color: #ccc; font-size: 0.88rem; line-height: 1.7; margin-bottom: 24px;">
                Thank you for your order. Here is your receipt.
            </p>

            <!-- CUSTOMER INFO -->
            <div style="background: #181818; border: 1px solid #2a2a2a; border-radius: 8px; padding: 18px; margin-bottom: 20px; word-break: break-word;">
                <p style="font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: #C9A84C; margin: 0 0 12px 0;">Order Details</p>
                <p style="margin: 4px 0; font-size: 0.82rem; color: #ddd;">${customerName}</p>
                <p style="margin: 4px 0; font-size: 0.82rem; color: #ddd; word-break: break-all;">${customerInfo.email}</p>
                <p style="margin: 4px 0; font-size: 0.82rem; color: #ddd;">${customerInfo.phone || ''}</p>
                <p style="margin: 10px 0 0 0; font-size: 0.7rem; color: #777; word-break: break-all;">Order #${checkoutId || 'N/A'}</p>
            </div>

            <!-- PRODUCTS -->
            <div style="background: #181818; border: 1px solid #2a2a2a; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
                <p style="font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: #C9A84C; margin: 0 0 6px 0;">Your Order</p>
                <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
                    ${productRows}
                </table>
            </div>

            <!-- TOTALS -->
            <div style="padding: 0 4px 20px 4px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 4px 0; color: #999; font-size: 0.82rem;">Subtotal</td>
                        <td style="padding: 4px 0; color: #ddd; font-size: 0.82rem; text-align: right;">R${(subtotal || 0).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 0; color: #999; font-size: 0.82rem;">Shipping</td>
                        <td style="padding: 4px 0; color: #ddd; font-size: 0.82rem; text-align: right;">R${(shipping || 0).toLocaleString()}</td>
                    </tr>
                    ${tax ? `
                    <tr>
                        <td style="padding: 4px 0; color: #999; font-size: 0.82rem;">Tax</td>
                        <td style="padding: 4px 0; color: #ddd; font-size: 0.82rem; text-align: right;">R${tax.toLocaleString()}</td>
                    </tr>` : ''}
                    <tr style="border-top: 1px solid #2a2a2a;">
                        <td style="padding: 12px 0 0 0; color: #fff; font-size: 1rem; font-weight: bold;">Total</td>
                        <td style="padding: 12px 0 0 0; color: #C9A84C; font-size: 1.1rem; font-weight: bold; text-align: right;">R${amountRands}</td>
                    </tr>
                </table>
            </div>

            <p style="color: #999; font-size: 0.78rem; line-height: 1.7; margin-bottom: 24px;">
                Your fragrances are being prepared and will be with you shortly. Questions? Email
                <a href="mailto:elyseanperfumes@gmail.com" style="color: #C9A84C; text-decoration: none;">elyseanperfumes@gmail.com</a>
                or call <a href="tel:+27648570979" style="color: #C9A84C; text-decoration: none;">064 857 0979</a>.
            </p>

            <div style="border-top: 1px solid #2a2a2a; padding-top: 16px; text-align: center;">
                <p style="color: #666; font-size: 0.7rem; margin: 0;">© 2026 Elysean Perfumes · South Africa</p>
                <p style="color: #C9A84C; font-size: 0.6rem; letter-spacing: 0.2em; margin: 4px 0 0 0;">EDP 20% · HANDCRAFTED LUXURY</p>
            </div>

        </div>
    `;

    // ── Owner notification email ──
    const ownerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; background: #fff;">
            <h2 style="color: #0A0A0A; margin-bottom: 16px;">New Order Received</h2>
            <p style="margin: 4px 0;"><strong>Name:</strong> ${customerName}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> ${customerInfo.email}</p>
            <p style="margin: 4px 0;"><strong>Phone:</strong> ${customerInfo.phone || 'Not provided'}</p>
            <p style="margin: 4px 0;"><strong>Checkout ID:</strong> ${checkoutId || 'N/A'}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;"/>
            <table style="width: 100%; border-collapse: collapse;">${productRows}</table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;"/>
            <p style="margin: 4px 0;"><strong>Subtotal:</strong> R${(subtotal || 0).toLocaleString()}</p>
            <p style="margin: 4px 0;"><strong>Shipping:</strong> R${(shipping || 0).toLocaleString()}</p>
            <p style="margin: 4px 0; font-size: 1.1rem;"><strong>Total: R${amountRands}</strong></p>
        </div>
    `;

    await sendEmail(customerInfo.email, customerName, 'Your Elysean Perfumes Order Confirmation ✦', customerHtml);
    console.log('✅ Confirmation email sent to customer:', customerInfo.email);

    await sendEmail(BREVO_SENDER_EMAIL, 'Elysean Perfumes Owner', `✅ New Order — R${amountRands} — ${customerName}`, ownerHtml);
    console.log('✅ Notification email sent to owner');
}

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

// ── Create Yoco Checkout ──
app.post('/create-checkout', async (req, res) => {
    const { amountInCents, customerInfo, cart, subtotal, shipping, tax } = req.body;

    const metadata = customerInfo ? {
        firstName: customerInfo.firstName || '',
        lastName: customerInfo.lastName || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || ''
    } : {};

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
                metadata: metadata
            })
        });

        const data = await response.json();
        console.log('Yoco response:', data);

        if (data.redirectUrl) {
            if (customerInfo?.email) {
                try {
                    await sendOrderEmails(customerInfo, amountInCents, data.id, cart, subtotal, shipping, tax);
                } catch (emailError) {
                    console.error('❌ Email error:', emailError);
                }
            }
            res.json({ redirectUrl: data.redirectUrl });
        } else {
            res.status(400).json({ error: 'Could not create checkout', details: data });
        }
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: error.message });
    }
});

// ── Yoco Webhook ──
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    try {
        const event = JSON.parse(req.body);
        console.log('Webhook received:', event.type);
        if (event.type === 'payment.succeeded') {
            console.log('✅ Payment confirmed via webhook:', event.payload.id);
        } else if (event.type === 'payment.failed') {
            console.log('❌ Payment Failed:', event.payload);
        }
        res.status(200).send('OK');
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(400).send('Error');
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));