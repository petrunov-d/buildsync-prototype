// js/dashboard.js

// Theme toggle
const toggleBtn = document.getElementById('toggleTheme');
toggleBtn.addEventListener('click', () => {
    const body = document.body;
    const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    toggleBtn.textContent = newTheme === 'light' ? '☾' : '☀';
});

// CountUp initializations
const opts = { duration: 1.5 };
new countUp.CountUp('cnt-win', 7, { ...opts, suffix: ' pp' }).start();
new countUp.CountUp('cnt-payback', 12, { ...opts, suffix: ' m' }).start();
new countUp.CountUp('cnt-ebit', 70, { ...opts, suffix: ' bps' }).start();
new countUp.CountUp('cnt-capex', 400, { ...opts, prefix: '$', suffix: 'k' }).start();

// CO₂ Emissions Breakdown bar chart
new Chart(
    document.getElementById('barCO2').getContext('2d'),
    {
        type: 'bar',
        data: {
            labels: ['Palm Jumeirah MC', 'DAMAC Exclusive Hotel', 'Burj Al Ali', 'Business Bay Building #1000', 'Al Furjan MC'],
            datasets: [
                { label: 'Current CO₂ Impact', data: [80, 140, 100, 170, 150], backgroundColor: '#2a9d8f' },
                { label: 'Quota Threshold', data: [100, 150, 120, 180, 160], backgroundColor: 'rgba(231,111,81,0.5)' }
            ]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    }
);

// Mock activity data
const mockActivity = [
    { icon: '✔️', text: 'Added 50 units of Concrete', user: 'Alice Johnson', userId: 'alice', avatarUrl: 'https://i.pravatar.cc/24?u=alice', timestamp: '2025-05-12T08:15:00Z' },
    { icon: '⚠️', text: 'Rebar price updated', user: 'Bob Smith', userId: 'bob', avatarUrl: 'https://i.pravatar.cc/24?u=bob', timestamp: '2025-05-12T09:00:00Z' },
    { icon: '🔔', text: 'Bid #23 submitted', user: 'Carlos Martinez', userId: 'carlos', avatarUrl: 'https://i.pravatar.cc/24?u=carlos', timestamp: '2025-05-12T09:30:00Z' },
    { icon: '✅', text: 'Approved material order #45', user: 'Dana Lee', userId: 'dana', avatarUrl: 'https://i.pravatar.cc/24?u=dana', timestamp: '2025-05-12T10:00:00Z' },
    { icon: '➕', text: 'Added 30 units of Steel', user: 'Emily Davis', userId: 'emily', avatarUrl: 'https://i.pravatar.cc/24?u=emily', timestamp: '2025-05-12T10:30:00Z' },
    { icon: '✏️', text: 'Commented on bid #24', user: 'Frank Wilson', userId: 'frank', avatarUrl: 'https://i.pravatar.cc/24?u=frank', timestamp: '2025-05-12T11:00:00Z' },
    { icon: '🔄', text: 'Updated inspection status', user: 'Grace Kim', userId: 'grace', avatarUrl: 'https://i.pravatar.cc/24?u=grace', timestamp: '2025-05-12T11:30:00Z' },
    { icon: '📅', text: 'Scheduled delivery for Bid #25', user: 'Henry Smith', userId: 'henry', avatarUrl: 'https://i.pravatar.cc/24?u=henry', timestamp: '2025-05-12T12:00:00Z' },
    { icon: '📅', text: 'Scheduled delivery for Bid #26', user: 'Alan Zhao', userId: 'henry', avatarUrl: 'https://i.pravatar.cc/24?u=emily', timestamp: '2025-05-12T12:00:00Z' },
    { icon: '📅', text: 'Scheduled delivery for Bid #27', user: 'Alain Badiou', userId: 'henry', avatarUrl: 'https://i.pravatar.cc/24?u=alice', timestamp: '2025-05-12T12:00:00Z' },
    { icon: '📅', text: 'Scheduled delivery for Bid #28', user: 'Steven Smith', userId: 'henry', avatarUrl: 'https://i.pravatar.cc/24?u=joe', timestamp: '2025-05-11T12:00:00Z' },
    { icon: '📅', text: 'Scheduled delivery for Bid #29', user: 'Evan Van', userId: 'henry', avatarUrl: 'https://i.pravatar.cc/24?u=chloe', timestamp: '2025-05-11T12:00:00Z' },
    { icon: '📅', text: 'Scheduled delivery for Bid #11', user: 'Van Dam', userId: 'henry', avatarUrl: 'https://i.pravatar.cc/24?u=alan', timestamp: '2025-05-11T12:00:00Z' },
    { icon: '📅', text: 'Scheduled delivery for Bid #13', user: 'Ethan SMith', userId: 'henry', avatarUrl: 'https://i.pravatar.cc/24?u=peter', timestamp: '2025-05-11T12:00:00Z' },
    { icon: '📅', text: 'Scheduled delivery for Bid #16', user: 'Slavoj Zizek', userId: 'henry', avatarUrl: 'https://i.pravatar.cc/24?u=kate', timestamp: '2025-05-11T12:00:00Z' }
];

// Render and update activity list from mock data
document.addEventListener('DOMContentLoaded', () => {
    renderActivity(mockActivity);
    timeago.render(document.querySelectorAll('.activity time'));
    // Polling to simulate updates (uses same mock data)
    setInterval(() => {
        renderActivity(mockActivity);
        timeago.render(document.querySelectorAll('.activity time'));
    }, 30000);
});

function renderActivity(data) {
    const ul = document.querySelector('.activity ul');
    ul.innerHTML = data.map(item => `
    <li>
      <img src="${item.avatarUrl}" class="avatar-sm" alt="${item.user}" />
      ${item.icon} ${item.text} <a href="/users/${item.userId}">${item.user}</a>
      <time datetime="${item.timestamp}">${item.timestamp}</time>
    </li>
  `).join('');
}

// Set progress-bar widths based on data-current / data-target
document.querySelectorAll('.progress').forEach(bar => {
    const cur = +bar.dataset.current;
    const tgt = +bar.dataset.target;
    const pct = Math.min(100, (cur / tgt) * 100);
    bar.style.width = pct + '%';
});