document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const toggle = document.getElementById('toggleTheme');
    toggle.onclick = () => {
        const b = document.body, t = b.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        b.setAttribute('data-theme', t);
        toggle.textContent = t === 'light' ? '☾' : '☀';
    };
    // Font size
    const fontSelect = document.getElementById('fontSizeSelect');
    fontSelect.onchange = () => document.documentElement.style.setProperty('--font-size', fontSelect.value);
    // Currency & CO2
    document.getElementById('currencySelect').onchange = e => console.log('Currency:', e.target.value);
    document.getElementById('co2UnitsSelect').onchange = e => console.log('CO2 units:', e.target.value);
    // Bid parameters
    document.getElementById('bufferInput').oninput = e => console.log('Buffer %:', e.target.value);
    document.getElementById('markupInput').oninput = e => console.log('Markup %:', e.target.value);
    // Reset
    document.getElementById('resetBtn').onclick = () => {
        if (confirm('Clear all data?')) {
            localStorage.clear();
            location.reload();
        }
    };
    // Export
    document.getElementById('exportBtn').onclick = () => {
        const s = {
            theme: document.body.getAttribute('data-theme'),
            fontSize: fontSelect.value,
            currency: document.getElementById('currencySelect').value,
            co2Units: document.getElementById('co2UnitsSelect').value,
            buffer: document.getElementById('bufferInput').value,
            markup: document.getElementById('markupInput').value
        };
        const b = new Blob([JSON.stringify(s, null, 2)], {type: 'application/json'});
        const u = URL.createObjectURL(b);
        const a = document.createElement('a');
        a.href = u;
        a.download = 'settings.json';
        a.click();
        URL.revokeObjectURL(u);
    };
});