/**
 * Структура объекта транзакции.
 * @typedef {Object} Transaction
 * @property {number} id - Уникальный идентификатор транзакции.
 * @property {string} date - Дата транзакции.
 * @property {number} amount - Сумма транзакции.
 * @property {string} category - Категория транзакции.
 * @property {string} description - Описание транзакции.
 */

/** @type {Transaction[]} */
let transactions = [];

/**
 * Добавляет новую транзакцию в массив и обновляет таблицу.
 */
function addTransaction() {
    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    if (!date || isNaN(amount) || !description) {
        alert("Пожалуйста, заполните все поля корректно.");
        return;
    }

    const transaction = {
        id: transactions.length + 1,
        date: date,
        amount: amount,
        category: category, 
        description: description
    };
    transactions.push(transaction);
    updateTable();
    calculateTotal();
}

/**
 * Обновляет таблицу транзакций.
 */
function updateTable() {
    const tableBody = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
    const transaction = transactions[transactions.length - 1];
    const row = tableBody.insertRow();
    row.className = transaction.amount >= 0 ? 'green' : 'red';
    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
        <td><button onclick="removeTransaction(${transaction.id})">Удалить</button></td>
    `;
}

/**
 * Удаляет транзакцию из массива и обновляет таблицу.
 * @param {number} id - Идентификатор транзакции для удаления.
 */
function removeTransaction(id) {
    const tableBody = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
    transactions = transactions.filter(transaction => transaction.id !== id);
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    transactions.forEach(transaction => updateTable());
    calculateTotal();
}

/**
 * Вычисляет общую сумму транзакций и обновляет отображение на странице.
 */
function calculateTotal() {
    const total = transactions.reduce((acc, cur) => acc + cur.amount, 0);
    document.getElementById('totalDisplay').innerText = 'Общая сумма: ' + total.toFixed(2);
}

// Обработчик события для отображения подробного описания транзакции при клике на строку таблицы.
document.getElementById('transactionsTable').addEventListener('click', function(event) {
    if (event.target && event.target.nodeName === "TD") {
        const row = event.target.parentNode;
        const id = row.firstChild.textContent;
        const transaction = transactions.find(t => t.id === parseInt(id));
        document.getElementById('detailedDescription').innerText = `Подробное описание: ${transaction.description}`;
    }
});
