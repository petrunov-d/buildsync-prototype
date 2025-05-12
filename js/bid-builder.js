document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    document.getElementById('toggleTheme').onclick = () => {
        const body = document.body;
        const theme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', theme);
        document.getElementById('toggleTheme').textContent = theme === 'light' ? '☾' : '☀';
    };

    // Shared materials data
    const materials = [
        {name: 'Concrete', price: 120, lead: 14, carbon: 0.09},
        {name: 'Rebar', price: 1200, lead: 7, carbon: 1.75},
        {name: 'Insulation', price: 45, lead: 21, carbon: 0.02},
        {name: 'Finishes', price: 200, lead: 10, carbon: 0.15}
    ];

    // Populate material dropdown
    const materialSelect = document.getElementById('materialSelect');
    materials.forEach((m, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = m.name;
        materialSelect.appendChild(opt);
    });

    // Bid items state
    const bidItems = [];
    const bidTable = document.querySelector('#bidTable tbody');
    const qtyInput = document.getElementById('quantityInput');
    const addBtn = document.getElementById('addBtn');
    const summaryEl = document.getElementById('bidSummary');
    const analyticsEl = document.getElementById('bidAnalytics');
    const totalCostEl = document.getElementById('totalCost');
    const totalCarbonEl = document.getElementById('totalCarbon');
    const avgCostEl = document.getElementById('avgCost');
    const carbonPerCostEl = document.getElementById('carbonPerCost');

    // Render bid table and metrics
    function renderBid() {
        bidTable.innerHTML = '';
        bidItems.forEach((item, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" min="1" value="${item.qty}" onchange="updateQty(${i}, this.value)"></td>
            <td>${(item.price * item.qty).toFixed(2)}</td>
            <td>${(item.carbon * item.qty).toFixed(2)}</td>
            <td><button class="remove" onclick="removeItem(${i})">Remove</button></td>`;
            bidTable.appendChild(tr);
        });
        renderSummary();
    }

    // Update and remove handlers
    window.updateQty = (idx, val) => {
        const q = parseInt(val, 10);
        if (q < 1) return;
        bidItems[idx].qty = q;
        renderBid();
    };
    window.removeItem = (idx) => {
        bidItems.splice(idx, 1);
        renderBid();
    };

    // Summary calculations
    function renderSummary() {
        const totalCost = bidItems.reduce((sum, it) => sum + it.price * it.qty, 0);
        const totalCarbon = bidItems.reduce((sum, it) => sum + it.carbon * it.qty, 0);
        if (totalCost > 0) {
            summaryEl.classList.remove('hidden');
            analyticsEl.classList.remove('hidden');
            totalCostEl.textContent = totalCost.toFixed(2);
            totalCarbonEl.textContent = totalCarbon.toFixed(2);
            const totalQty = bidItems.reduce((sum, it) => sum + it.qty, 0);
            avgCostEl.textContent = (totalCost / totalQty).toFixed(2);
            carbonPerCostEl.textContent = (totalCarbon / totalCost).toFixed(4);
        } else {
            summaryEl.classList.add('hidden');
            analyticsEl.classList.add('hidden');
        }
    }

    // Add to bid
    addBtn.onclick = () => {
        const idx = parseInt(materialSelect.value, 10);
        const qty = parseInt(qtyInput.value, 10);
        if (isNaN(idx) || idx < 0 || isNaN(qty) || qty < 1) return;
        const m = materials[idx];
        bidItems.push({name: m.name, price: m.price, carbon: m.carbon, qty});
        renderBid();
    };

    // Initial render
    renderBid();
});