document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    document.getElementById('toggleTheme').onclick = () => {
        const body = document.body;
        const theme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', theme);
        document.getElementById('toggleTheme').textContent = theme === 'light' ? '☾' : '☀';
    };

    const PREDEFINED_ANSWERS = [
        "Substituting those 2 200 SQM with Carrara White Marble (unit rate $ 1 630) would change the cost from $ 1 056 000 (2 200 SQM × $ 480) to $ 3 586 000 (2 200 SQM × $ 1 630), a net increase of $ 2 530 000.",
        "The combined total cost for all four marble types in the BOQ is $ 6 438 500 ($ 1 056 000 + $ 385 000 + $ 759 500 + $ 4 238 000).",
    ];

    let replyIndex = 0;

    // Shared materials data
    const materials = [
        {name: 'Concrete', price: 120.00, lead: 14, carbon: 0.09, units: 'm³'},
        {name: 'Rebar', price: 1200.00, lead: 7, carbon: 1.75, units: 'kg'},
        {name: 'Insulation', price: 45.00, lead: 21, carbon: 0.02, units: 'm²'},
        {name: 'Finishes', price: 200.00, lead: 10, carbon: 0.15, units: 'm²'},
        {name: 'Brick', price: 0.50, lead: 7, carbon: 0.20, units: 'each'},
        {name: 'Mortar', price: 0.15, lead: 5, carbon: 0.05, units: 'kg'},
        {name: 'Timber', price: 350.00, lead: 14, carbon: 0.10, units: 'm³'},
        {name: 'Glass', price: 25.00, lead: 21, carbon: 1.20, units: 'm²'},
        {name: 'PVC Pipe', price: 3.00, lead: 10, carbon: 0.30, units: 'm'},
        {name: 'Tiles', price: 15.00, lead: 14, carbon: 0.25, units: 'm²'},
        {name: 'Drywall', price: 10.00, lead: 7, carbon: 0.15, units: 'sheet'},
        {name: 'Asphalt', price: 80.00, lead: 30, carbon: 0.08, units: 't'},
        {name: 'Steel Beam', price: 2.00, lead: 21, carbon: 1.80, units: 'kg'},
        {name: 'Gravel', price: 50.00, lead: 3, carbon: 0.01, units: 'm³'},
        {name: 'Sand', price: 30.00, lead: 2, carbon: 0.005, units: 'm³'},
        {name: 'Gypsum Board', price: 12.00, lead: 7, carbon: 0.12, units: 'sheet'},
        {name: 'Plywood', price: 30.00, lead: 10, carbon: 0.08, units: 'sheet'},
        {name: 'Aluminum Sheet', price: 40.00, lead: 14, carbon: 1.80, units: 'm²'},
        {name: 'Copper Wire', price: 1.20, lead: 5, carbon: 0.20, units: 'm'},
        {name: 'Composite Panel', price: 60.00, lead: 21, carbon: 0.40, units: 'panel'},
        {name: 'Ceramic Tile', price: 20.00, lead: 14, carbon: 0.30, units: 'm²'},
        {name: 'Natural Stone', price: 100.00, lead: 7, carbon: 0.01, units: 'm²'},
        {name: 'Welded Mesh', price: 150.00, lead: 14, carbon: 1.50, units: 'panel'},
        {name: 'Foam Board', price: 55.00, lead: 21, carbon: 0.02, units: 'sheet'},
        {name: 'Acrylic Panel', price: 45.00, lead: 14, carbon: 0.10, units: 'sheet'},
        {name: 'Asphalt Shingles', price: 90.00, lead: 30, carbon: 0.09, units: 'bundle'},
        {name: 'Fiber Cement', price: 35.00, lead: 14, carbon: 0.30, units: 'panel'},
        {name: 'Waterproof Membrane', price: 25.00, lead: 21, carbon: 0.05, units: 'roll'},
        {name: 'Brick Veneer', price: 1.80, lead: 14, carbon: 0.22, units: 'each'},
        {name: 'Insulation Batts', price: 60.00, lead: 21, carbon: 0.03, units: 'roll'},
        {name: 'Acoustic Panel', price: 80.00, lead: 14, carbon: 0.18, units: 'panel'},
        {name: 'Metal Decking', price: 15.00, lead: 14, carbon: 2.50, units: 'm²'},
        {name: 'Scaffolding', price: 25.00, lead: 7, carbon: 0.04, units: 'section'},
        {name: 'Sealant', price: 5.00, lead: 5, carbon: 0.02, units: 'tube'},
        {name: 'Vapor Barrier', price: 20.00, lead: 7, carbon: 0.01, units: 'roll'},
        {name: 'Stucco', price: 1.50, lead: 21, carbon: 0.25, units: 'kg'},
        {name: 'Tile Grout', price: 10.00, lead: 14, carbon: 0.07, units: 'kg'},
        {name: 'Primer', price: 8.00, lead: 7, carbon: 0.02, units: 'l'},
        {name: 'Caulking', price: 4.00, lead: 5, carbon: 0.01, units: 'tube'},
        {name: 'Construction Adhesive', price: 7.00, lead: 7, carbon: 0.03, units: 'tube'},
        {name: 'Fasteners', price: 0.10, lead: 3, carbon: 0.001, units: 'each'},
        {name: 'Anchor Bolts', price: 0.50, lead: 5, carbon: 0.02, units: 'each'},
        {name: 'Hinges', price: 3.00, lead: 10, carbon: 0.03, units: 'each'},
        {name: 'Doors', price: 150.00, lead: 14, carbon: 1.00, units: 'each'},
        {name: 'Windows', price: 200.00, lead: 21, carbon: 1.50, units: 'each'},
        {name: 'Marble', price: 5000.00, lead: 45, carbon: 5.00, units: 'unit'},
        {name: 'PVC Fitting', price: 1.50, lead: 10, carbon: 0.30, units: 'each'},
        {name: 'Copper Pipe', price: 4.00, lead: 14, carbon: 0.50, units: 'm'},
        {name: 'Electrical Cable', price: 0.80, lead: 7, carbon: 0.02, units: 'm'},
        {name: 'Concrete Block', price: 1.00, lead: 7, carbon: 0.09, units: 'each'}
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

    const importBtn = document.getElementById('importBtn');
    const fileInput = document.getElementById('fileInput');
    const importDialog = document.getElementById('importDialog');
    const importLoader = document.getElementById('importLoader');
    const importMessage = document.getElementById('importMessage');
    const importActions = document.getElementById('importActions');
    const importOk = document.getElementById('importOk');
    const importClose = document.getElementById('importClose');

    // Import BOQ flow
    importBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
        importLoader.classList.remove('hidden');
        importMessage.classList.add('hidden');
        importActions.classList.add('hidden');
        importDialog.showModal();

        // Simulate 5-minute load
        setTimeout(() => {
            importLoader.classList.add('hidden');
            const count = Math.floor(Math.random() * 2001) + 20000;
            importMessage.textContent =
                `Successfully imported ${count} rows of material data. Please review.`;
            importMessage.classList.remove('hidden');
            importActions.classList.remove('hidden');
        }, 3 * 1000);
    });
    importOk.addEventListener('click', () => {
        importDialog.close();
        // Populate table with random rows after import
        const project = `Project Al Furjan Master Community`;
        document.getElementById('projectName').textContent = project;
        // generate random bidItems
        bidItems.length = 0;
        for (let i = 0; i < 1000; i++) {
            const m = materials[Math.floor(Math.random() * materials.length)];
            const qty = Math.floor(Math.random() * 100) + 1;
            bidItems.push({name: m.name, price: m.price, carbon: m.carbon, qty});
        }
        renderBid();
        // after renderBid(); inside importOk click…
        const randomBetween = (min, max) => Math.random() * (max - min) + min;

// Bid Success Rate (%)
        new countUp.CountUp('kpi-bidSuccess', randomBetween(50, 100).toFixed(1), {suffix: '%'}).start();

        new countUp.CountUp('kpi-predCost', randomBetween(1_000_000_000, 2_000_000_000).toFixed(0), {
            prefix: '$ ',
            separator: ','
        }).start();

// Negotiation Margin (%)
        new countUp.CountUp('kpi-negMargin', randomBetween(5, 20).toFixed(1), {suffix: '%'}).start();

// Bid Price Confidence (%)
        new countUp.CountUp('kpi-priceConf', randomBetween(70, 99).toFixed(1), {suffix: '%'}).start();

// Optimal Resource Utilization (%)
        new countUp.CountUp('kpi-resourceUtil', randomBetween(60, 100).toFixed(1), {
            suffix: '%'
        }).start();

// Projected Profit (%)
        new countUp.CountUp('kpi-profit', randomBetween(10, 30).toFixed(1), {suffix: '%'}).start();

// Risk Score (1–10)
        new countUp.CountUp('kpi-riskScore', Math.floor(randomBetween(1, 10))).start();

// Estimated Project Duration (days)
        new countUp.CountUp('kpi-duration', Math.floor(randomBetween(730, 1200))).start();

// ROI (%)
        new countUp.CountUp('kpi-roi', randomBetween(5, 50).toFixed(1), {suffix: '%'}).start();

        new countUp.CountUp('kpi-expected-profit-margin', randomBetween(3, 10).toFixed(1), {suffix: '%'}).start();
        //kpi-expected-co2-impact

        new countUp.CountUp('kpi-expected-co2-impact', randomBetween(500_000, 6_000_000).toFixed(0), {
            prefix: 'Kg ',
            separator: ','
        }).start();

        // 1. Compute your summary values
        const totalQty = bidItems.reduce((sum, it) => sum + it.qty, 0);
        const totalMatCost = bidItems
            .reduce((sum, it) => sum + it.price * it.qty, 0);

// If you have an installCost field on each item, sum it here.
// Otherwise this will be zero. Replace `it.installCost||0` with your real field.
        const totalInstCost = bidItems
            .reduce((sum, it) => sum + (it.installCost || 0) * it.qty, 0);

        const avgCarbon = totalQty > 0
            ? bidItems.reduce((sum, it) => sum + it.carbon * it.qty, 0) / totalQty
            : 0;

// 2. Animate with CountUp.js
        new countUp.CountUp('cnt-totalQty', randomBetween(200_000, 500_000).toFixed(0), {
            prefix: ' ',
            separator: ','
        }).start();

        new countUp.CountUp('cnt-totalMatCost', totalMatCost.toFixed(0), {
            prefix: '$ ',
            separator: ','
        }).start();

        new countUp.CountUp('cnt-totalInstCost', randomBetween(500_000, 1_000_000).toFixed(0), {
            prefix: '$ ',
            separator: ','
        }).start();

        new countUp.CountUp('cnt-avgCarbon', randomBetween(700_000, 1_000_000).toFixed(0), {
            prefix: 'kg/SQM ',
            separator: ','
        }).start();

        new countUp.CountUp('cnt-avgPrice', randomBetween(70000, 100_000).toFixed(0), {
            prefix: '$ ',
            separator: ','
        }).start();
    });
    importClose.addEventListener('click', () => importDialog.close());


    function renderBid() {
        bidTable.innerHTML = '';
        bidItems.forEach((item, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
<td>${item.name}</td>
<td>${item.price.toFixed(2)}</td>
<td><input type="number" min="1" value="${item.qty}" onchange="updateQty(${i}, this.value)"></td>
<td>${(item.price * item.qty).toFixed(2)}</td>
<td>${(item.carbon * item.qty).toFixed(2)}</td>
<td><button class="remove" onclick="removeItem(${i})">Remove</button></td>
`;
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
    window.removeItem = idx => {
        bidItems.splice(idx, 1);
        renderBid();
    };

// close handlers
    importOk.addEventListener('click', () => importDialog.close());
    importClose.addEventListener('click', () => importDialog.close());

    // Chat widget behavior
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.querySelector('.chat-body');

// Toggle open/close
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    function sendChatMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1) Append the user's message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);

        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        // 2) Insert a loading placeholder
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'chat-message agent loading';
        loadingMsg.textContent = 'Henry is typing';
        chatBody.appendChild(loadingMsg);
        chatBody.scrollTop = chatBody.scrollHeight;

        // 3) After 1–2s, remove loader and show next AI reply
        const delay = 1000 + Math.random() * 2000; // 1–2 seconds
        setTimeout(() => {
            loadingMsg.remove();

            if (replyIndex < PREDEFINED_ANSWERS.length) {
                const agentMsg = document.createElement('div');
                agentMsg.className = 'chat-message agent';
                agentMsg.textContent = PREDEFINED_ANSWERS[replyIndex++];
                chatBody.appendChild(agentMsg);
                chatBody.scrollTop = chatBody.scrollHeight;
            }
        }, delay);
    }

    chatSend.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendChatMessage();
    });

    const chatClose = document.getElementById('chatClose');
    chatClose.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });
});