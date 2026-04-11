async function startCheckout() {
            const btn = document.getElementById('pay-btn');
            const errorMsg = document.getElementById('error-msg');
            btn.disabled = true;
            btn.textContent = 'Redirecting to payment...';
            errorMsg.style.display = 'none';
            try {
                const response = await fetch('/create-checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amountInCents: 10000 })
                });
                const data = await response.json();
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    throw new Error(data.error || 'Something went wrong');
                }
            } catch (error) {
                errorMsg.textContent = 'Error: ' + error.message;
                errorMsg.style.display = 'block';
                btn.disabled = false;
                btn.textContent = 'Pay R100.00 with Yoco';
            }
        }