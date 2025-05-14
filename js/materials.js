// Ensure DOM is loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    let historyChartInstance = null;

    // Theme toggle
    document.getElementById('toggleTheme').onclick = () => {
        const body = document.body;
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        document.getElementById('toggleTheme').textContent = newTheme === 'light' ? '☾' : '☀';
    };

    // Initial materials data
    let materials = [
        {name: 'Concrete', supplier: 'ACME Cement', price: 120, lead: 14, carbon: 0.09, units: 'm³'},
        {name: 'Rebar', supplier: 'SteelCo', price: 1200, lead: 7, carbon: 1.75, units: 'kg'},
        {name: 'Insulation', supplier: 'EcoFoam', price: 45, lead: 21, carbon: 0.02, units: 'm²'},
        {name: 'Finishes', supplier: 'PaintPros', price: 200, lead: 10, carbon: 0.15, units: 'm²'},
        {name: 'Brick', supplier: 'BrickCo', price: 0.50, lead: 7, carbon: 0.20, units: 'each'},
        {name: 'Mortar', supplier: 'MortarMasters', price: 0.15, lead: 5, carbon: 0.05, units: 'kg'},
        {name: 'Timber', supplier: 'TimberTech', price: 350, lead: 14, carbon: 0.10, units: 'm³'},
        {name: 'Glass', supplier: 'ClearView', price: 25, lead: 21, carbon: 1.20, units: 'm²'},
        {name: 'PVC Pipe', supplier: 'PipeWorks', price: 3, lead: 10, carbon: 0.30, units: 'm'},
        {name: 'Tiles', supplier: 'TileCraft', price: 15, lead: 14, carbon: 0.25, units: 'm²'},
        {name: 'Drywall', supplier: 'Drywall Inc.', price: 10, lead: 7, carbon: 0.15, units: 'sheet'},
        {name: 'Asphalt', supplier: 'AsphaltPro', price: 80, lead: 30, carbon: 0.08, units: 't'},
        {name: 'Steel Beam', supplier: 'BeamWorks', price: 2, lead: 21, carbon: 1.80, units: 'kg'},
        {name: 'Gravel', supplier: 'StoneSource', price: 50, lead: 3, carbon: 0.01, units: 'm³'}
    ];

    let editIndex = -1;
    const tableBody = document.querySelector('#materialsTable tbody');
    const formSection = document.getElementById('formSection');
    const formTitle = document.getElementById('formTitle');
    const nameIn = document.getElementById('nameInput');
    const unitsIn = document.getElementById('unitsInput');
    const priceIn = document.getElementById('priceInput');
    const supplierIn = document.getElementById('supplierInput');
    const leadIn = document.getElementById('leadInput');
    const co2In = document.getElementById('co2Input');
    const addBtn = document.getElementById('addBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const searchInput = document.getElementById('searchInput');

    // Render function to update table
    function render() {
        const filter = searchInput.value.toLowerCase();
        tableBody.innerHTML = '';

        materials.forEach((m, i) => {
            if (!m.name.toLowerCase().includes(filter)) return;

            const riskRoll = Math.random();
            let riskClass, riskLabel;
            if (riskRoll < 0.3) {
                riskClass = 'risk-low';
                riskLabel = 'Low';
            } else if (riskRoll < 0.7) {
                riskClass = 'risk-medium';
                riskLabel = 'Medium';
            } else {
                riskClass = 'risk-high';
                riskLabel = 'High';
            }

            // decide random trend for price and lead
            const priceTrend = Math.random() > 0.5 ? 'up' : 'down';
            const leadTrend = Math.random() > 0.5 ? 'up' : 'down';

            const priceArrow = priceTrend === 'up' ? '▲' : '▼';
            const leadArrow = leadTrend === 'up' ? '▲' : '▼';

            const riskMultiplier = Math.floor(Math.random() * 7) + 1;

            const tr = document.createElement('tr');
            tr.innerHTML = `
      <td>${m.name}</td>
      
      <td>
            <span class="risk-indicator ${riskClass}" title="Supplier Risk Multiplier: ${riskMultiplier}"></span>
            ${m.supplier}
        </td>
      <td>${m.units}</td>
      <td>
        $${m.price.toFixed(2)}
        <span class="${priceTrend}">${priceArrow}</span>
      </td>
      <td>
        ${m.lead} days
        <span class="${leadTrend}">${leadArrow}</span>
      </td>
      <td>${m.carbon.toFixed(2)} kg</td>
      <td class="actions">
        <button class="edit-btn" onclick="editItem(${i})">Edit</button>
        <button class="delete-btn" onclick="deleteItem(${i})">Delete</button>
      </td>
      <td>
       <button class="history-btn actions" onclick="openHistory(${i})">View</button>
     </td>`;
            tableBody.appendChild(tr);
        });
    }

    window.editItem = i => {
        editIndex = i;
        formTitle.textContent = 'Edit Material';
        const m = materials[i];
        nameIn.value = m.name;
        priceIn.value = m.price;
        unitsIn.value = m.units;
        supplierIn.value = m.supplier;
        leadIn.value = m.lead;
        co2In.value = m.carbon;
        formSection.classList.remove('hidden');
    };

    window.deleteItem = i => {
        materials.splice(i, 1);
        render();
    };

    addBtn.onclick = () => {
        editIndex = -1;
        formTitle.textContent = 'Add Material';
        nameIn.value = '';
        priceIn.value = '';
        unitsIn.value = '';
        supplierIn.value = '';
        leadIn.value = '';
        co2In.value = '';
        formSection.classList.remove('hidden');
    };

    cancelBtn.onclick = () => {
        formSection.classList.add('hidden');
    };

    saveBtn.onclick = () => {
        const newMaterial = {
            name: nameIn.value,
            supplier: supplierIn.value,    // added
            units: unitsIn.value,
            price: parseFloat(priceIn.value),
            lead: parseInt(leadIn.value, 10),
            carbon: parseFloat(co2In.value)
        };
        if (editIndex >= 0) materials[editIndex] = newMaterial;
        else materials.push(newMaterial);
        formSection.classList.add('hidden');
        render();
    };

    searchInput.oninput = render;

    // Initial render
    render();

    // Get dialog elements
    const historyDialog = document.getElementById('historyDialog');
    const historyContent = document.getElementById('historyContent');
    const closeHistoryBtn = document.getElementById('closeHistory');

    window.openHistory = index => {
        const m = materials[index];
        historyDialog.showModal();
        historyDialog.querySelector('h4').textContent = `${m.name} Historical Trends`;

        // Generate labels & data for the last 12 months
        const now = new Date();
        const labels = [];
        const data = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            labels.push(d.toLocaleString('default', {month: 'short', year: '2-digit'}));
            const min = 45;
            const max = 75;
            data.push(Math.floor(Math.random() * (max - min + 1) + min));
        }

        // Destroy existing chart if present
        if (historyChartInstance) historyChartInstance.destroy();

        // Render new line chart with fill and custom color
        const ctx = document.getElementById('historyChart').getContext('2d');
        historyChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: `${m.name} Trend`,
                    data,
                    borderColor: '#2a9d8f',
                    backgroundColor: 'rgba(42,157,143,0.2)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {grid: {display: false}},
                    y: {beginAtZero: true}
                },
                plugins: {legend: {display: false}}
            }
        });
    };

    closeHistoryBtn.onclick = () => historyDialog.close();
});