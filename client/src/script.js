// Zakładki
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));

    const selectedTab = e.target.getAttribute('data-tab');
    document.getElementById(selectedTab).style.display = 'block';
    e.target.classList.add('active');

    if (selectedTab === 'dashboard') {
      loadTransactions(); // automatycznie załaduj dane
    }
  });
});

// Obsługa formularza
document.getElementById('transactionForm').addEventListener('submit', async e => {
  e.preventDefault();

  const form = e.target;
  const data = {
    type: form.type.value,
    category: form.category.value,
    amount: parseFloat(form.amount.value),
    description: form.description.value,
    date: form.date.value,
    currency: "PLN" // Możesz rozszerzyć formularz o wybór waluty
  };

  try {
    const res = await fetch('http://budgetsite.shop:5000/api/transactions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    const result = await res.json();
    document.getElementById('formResult').textContent = '✅ Dodano transakcję!';
    form.reset();
  } catch (err) {
    document.getElementById('formResult').textContent = '❌ Błąd dodawania transakcji!';
    console.error(err);
  }
});

// Pobieranie i wyświetlanie transakcji
async function loadTransactions() {
  try {
    const res = await fetch('http://budgetsite.shop:5000/api/transactions');
    const transactions = await res.json();

    const tbody = document.getElementById('transactions-table-body');
    tbody.innerHTML = '';

    transactions.forEach((t, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${t.type}</td>
        <td>${t.category}</td>
        <td>${t.amount.toFixed(2)} ${t.currency || "PLN"}</td>
        <td>${t.description || ''}</td>
        <td>${new Date(t.date).toLocaleDateString()}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Błąd pobierania danych:', err);
  }
}

// Załaduj domyślnie dashboard
window.addEventListener('DOMContentLoaded', () => {
  loadTransactions();
});
