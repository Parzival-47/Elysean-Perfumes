require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;

// ── Nodemailer Gmail Transporter ──
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email transporter error:', error);
    } else {
        console.log('✅ Email transporter ready');
    }
});

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

// ── Email sending function ──
async function sendOrderEmails(customerInfo, amountInCents, checkoutId) {
    const amountRands = (amountInCents / 100).toFixed(2);
    const customer = customerInfo;

    // ── Customer confirmation email ──
    const customerMailOptions = {
        from: `"Elysean Perfumes" <${process.env.GMAIL_USER}>`,
        to: customer.email,
        subject: 'Your Elysean Perfumes Order Confirmation ✦',
        html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
                
                <!-- Header -->
                <div style="text-align: center; border-bottom: 1px solid #e8e0d0; padding-bottom: 30px; margin-bottom: 30px;">
                    <h1 style="font-size: 2rem; color: #0A0A0A; margin: 0 0 4px 0; letter-spacing: 0.1em;">ELYSEAN</h1>
                    <p style="color: #C9A84C; font-size: 0.7rem; letter-spacing: 0.35em; text-transform: uppercase; margin: 0;">Luxury Fragrance House</p>
                </div>

                <!-- Greeting -->
                <p style="color: #0A0A0A; font-size: 1rem; line-height: 1.8; margin-bottom: 12px;">
                    Dear ${customer.firstName || 'Valued Customer'},
                </p>
                <p style="color: #555; font-size: 0.95rem; line-height: 1.8; margin-bottom: 30px;">
                    Thank you for your order with Elysean Perfumes. We have received your payment and your fragrances are being carefully prepared for dispatch.
                </p>

                <!-- Order Details Box -->
                <div style="background: #f9f7f4; border: 1px solid #e8e0d0; padding: 28px; margin-bottom: 30px;">
                    <p style="font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: #C9A84C; margin: 0 0 16px 0;">Order Details</p>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 6px 0; color: #777; font-size: 0.85rem;">Name</td>
                            <td style="padding: 6px 0; color: #0A0A0A; font-size: 0.85rem; text-align: right;">${customer.firstName || ''} ${customer.lastName || ''}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #777; font-size: 0.85rem;">Email</td>
                            <td style="padding: 6px 0; color: #0A0A0A; font-size: 0.85rem; text-align: right;">${customer.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #777; font-size: 0.85rem;">Phone</td>
                            <td style="padding: 6px 0; color: #0A0A0A; font-size: 0.85rem; text-align: right;">${customer.phone || 'Not provided'}</td>
                        </tr>
                        <tr style="border-top: 1px solid #e8e0d0;">
                            <td style="padding: 12px 0 6px 0; color: #777; font-size: 0.85rem;">Checkout ID</td>
                            <td style="padding: 12px 0 6px 0; color: #0A0A0A; font-size: 0.75rem; text-align: right;">${checkoutId || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #0A0A0A; font-size: 1rem; font-weight: bold;">Total</td>
                            <td style="padding: 6px 0; color: #C9A84C; font-size: 1rem; font-weight: bold; text-align: right;">R${amountRands}</td>
                        </tr>
                    </table>
                </div>

                <!-- What happens next -->
                <div style="margin-bottom: 30px;">
                    <p style="font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: #C9A84C; margin: 0 0 12px 0;">What Happens Next</p>
                    <p style="color: #555; font-size: 0.9rem; line-height: 1.9; margin: 0;">
                        ✦ Your order is now being prepared<br/>
                        ✦ You will receive a shipping notification once dispatched<br/>
                        ✦ Delivery typically takes 3-5 business days within South Africa
                    </p>
                </div>

                <!-- Contact -->
                <p style="color: #555; font-size: 0.85rem; line-height: 1.8; margin-bottom: 30px;">
                    Questions? Contact us at 
                    <a href="mailto:info@elyseanperfumes.co.za" style="color: #C9A84C; text-decoration: none;">info@elyseanperfumes.co.za</a> 
                    or call <a href="tel:+27648570979" style="color: #C9A84C; text-decoration: none;">064 857 0979</a>.
                </p>

                <!-- Footer -->
                <div style="border-top: 1px solid #e8e0d0; padding-top: 20px; text-align: center;">
                    <p style="color: #999; font-size: 0.75rem; margin: 0;">© 2026 Elysean Perfumes · South Africa</p>
                    <p style="color: #C9A84C; font-size: 0.65rem; letter-spacing: 0.2em; margin: 4px 0 0 0;">EDP 20% CONCENTRATION · HANDCRAFTED LUXURY</p>
                </div>

            </div>
        `
    };

    // ── Owner notification email ──
    const ownerMailOptions = {
        from: `"Elysean Perfumes" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `✅ New Order — R${amountRands} — ${customer.firstName || ''} ${customer.lastName || ''}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 30px; background: #fff;">
                <h2 style="color: #0A0A0A;">New Order Received</h2>
                <p><strong>Name:</strong> ${customer.firstName || ''} ${customer.lastName || ''}</p>
                <p><strong>Email:</strong> ${customer.email}</p>
                <p><strong>Phone:</strong> ${customer.phone || 'Not provided'}</p>
                <p><strong>Amount:</strong> R${amountRands}</p>
                <p><strong>Checkout ID:</strong> ${checkoutId || 'N/A'}</p>
                <p style="color: #777; font-size: 0.8rem;">Check your Yoco dashboard for full payment details.</p>
            </div>
        `
    };

    await transporter.sendMail(customerMailOptions);
    console.log('✅ Confirmation email sent to customer:', customer.email);

    await transporter.sendMail(ownerMailOptions);
    console.log('✅ Notification email sent to owner');
}

// ── Create Yoco Checkout ──
app.post('/create-checkout', async (req, res) => {
    const { amountInCents, customerInfo } = req.body;

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

            // ── Send emails as soon as checkout is created ──
            if (customerInfo?.email) {
                try {
                    await sendOrderEmails(customerInfo, amountInCents, data.id);
                } catch (emailError) {
                    // Log the error but don't block the payment redirect
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

// ── Yoco Webhook (keep for when you upgrade) ──
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