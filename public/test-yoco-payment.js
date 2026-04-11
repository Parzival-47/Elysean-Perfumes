 // ─── CURSOR ───
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';});
    function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);}
    animRing();
    document.querySelectorAll('a,button,input').forEach(el=>{
      el.addEventListener('mouseenter',()=>{cursor.classList.add('hover');ring.classList.add('hover');});
      el.addEventListener('mouseleave',()=>{cursor.classList.remove('hover');ring.classList.remove('hover');});
    });

    // ─── LOAD CART & TOTALS ───
    const cart = JSON.parse(localStorage.getItem('elyseanCart') || '[]');
    const storedTotal = parseInt(localStorage.getItem('elyseanTotal') || '0');

    // Render order items on right panel
    const orderList = document.getElementById('order-items');
    if (cart.length === 0) {
      orderList.innerHTML = '<p style="color:var(--muted);font-size:0.85rem;padding:20px 0;">Your cart is empty. <a href="products.html" style="color:var(--gold);">Shop now →</a></p>';
    } else {
      orderList.innerHTML = cart.map(item => `
        <div class="order-item">
          <img src="${item.img}" alt="${item.name}" class="order-item-img"/>
          <div class="order-item-info">
            <p class="order-item-name">${item.name}</p>
            <p class="order-item-size">${item.size} · EDP 20%</p>
            <p class="order-item-qty">Qty: ${item.qty}</p>
          </div>
          <span class="order-item-price">R${(item.price * item.qty).toLocaleString()}</span>
        </div>
      `).join('');
    }

    // Totals
    const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0);
    const tax = Math.round(subtotal * 0.15);
    const total = subtotal + tax;
    document.getElementById('right-subtotal').textContent = 'R' + subtotal.toLocaleString();
    document.getElementById('right-tax').textContent = 'R' + tax.toLocaleString();
    document.getElementById('right-total').textContent = 'R' + total.toLocaleString();
    document.getElementById('payBtnAmount').textContent = 'R' + total.toLocaleString();

    // ─── CARD NUMBER FORMATTING ───
    const cardNumInput = document.getElementById('cardNumber');
    cardNumInput.addEventListener('input', e => {
      let val = e.target.value.replace(/\D/g,'');
      val = val.match(/.{1,4}/g)?.join(' ') || val;
      e.target.value = val;
      const display = val || '•••• •••• •••• ••••';
      document.getElementById('cardDisplay').textContent = display.padEnd(19,'•').replace(/[^•\s]/g, (m,i) => display[i] || '•');
      // simpler approach:
      document.getElementById('cardDisplay').textContent = val ? val + ('•••• •••• •••• ••••').slice(val.length) : '•••• •••• •••• ••••';
    });

    document.getElementById('cardName').addEventListener('input', e => {
      document.getElementById('cardNameDisplay').textContent = e.target.value || 'Your Name';
    });
    document.getElementById('cardExp').addEventListener('input', e => {
      let val = e.target.value.replace(/\D/g,'');
      if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2);
      e.target.value = val;
      document.getElementById('cardExpDisplay').textContent = val || 'MM/YY';
    });

    // ─── PAY BUTTON ───
    document.getElementById('payBtn').addEventListener('click', () => {
      const firstName = document.getElementById('firstName').value.trim();
      const cardNum = cardNumInput.value.replace(/\s/g,'');

      // Basic validation
      if (!firstName) { alert('Please enter your first name.'); return; }
      if (cardNum.length < 16) { alert('Please enter a valid 16-digit card number.'); return; }
      if (cart.length === 0) { alert('Your cart is empty.'); return; }

      const btn = document.getElementById('payBtn');
      btn.classList.add('loading');

      // Simulate payment processing
      setTimeout(() => {
        btn.classList.remove('loading');
        const overlay = document.getElementById('successOverlay');
        overlay.classList.add('show');
        document.getElementById('redirectProgress').classList.add('run');

        // Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = 'cart-page.html?success=true';
        }, 3200);
      }, 2500);
    });