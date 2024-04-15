/**
 * Представляет финансовую транзакцию.
 */
class Transaction {
    /**
     * Создает экземпляр транзакции.
     * @param {string} id - Уникальный идентификатор транзакции.
     * @param {string} date - Дата транзакции.
     * @param {number} amount - Сумма транзакции.
     * @param {string} type - Тип транзакции (например, дебет или кредит).
     * @param {string} description - Описание транзакции.
     * @param {string} merchant - Торговец, проводящий транзакцию.
     * @param {string} cardType - Тип карты, используемой для транзакции.
     */
    constructor(id, date, amount, type, description, merchant, cardType) {
      this.id = id;
      this.date = date;
      this.amount = amount;
      this.type = type;
      this.description = description;
      this.merchant = merchant;
      this.cardType = cardType;
    }
    /**
     * Возвращает строковое представление транзакции в формате JSON.
     * @return {string} Строковое представление транзакции.
     */
    toString() {
      return JSON.stringify({
        id: this.id,
        date: this.date,
        amount: this.amount,
        type: this.type,
        description: this.description,
        merchant: this.merchant,
        cardType: this.cardType
      });
    }
  }
  
  /**
   * Анализатор транзакций, обеспечивающий анализ и обработку наборов транзакций.
   */
  class TransactionAnalyzer {
    /**
     * Создает экземпляр анализатора транзакций.
     * @param {Array} transactions - Массив исходных данных транзакций.
     */
    constructor(transactions) {
      this.transactions = transactions.map(t => new Transaction(
        t.transaction_id, t.transaction_date, t.transaction_amount, 
        t.transaction_type, t.transaction_description, t.merchant_name, t.card_type
      ));
    }
  
    /**
     * Добавляет новую транзакцию в список транзакций.
     * @param {Object} transactionData - Данные новой транзакции.
     */
    addTransaction(transactionData) {
      const transaction = new Transaction(
        transactionData.transaction_id, transactionData.transaction_date, transactionData.transaction_amount,
        transactionData.transaction_type, transactionData.transaction_description, transactionData.merchant_name, transactionData.card_type
      );
      this.transactions.push(transaction);
    }
  
    /**
     * Возвращает все транзакции.
     * @return {Array} Массив всех транзакций.
     */
    getAllTransactions() {
      return this.transactions;
    }
  
    /**
     * Возвращает уникальные типы транзакций.
     * @return {Array} Массив уникальных типов транзакций.
     */
    getUniqueTransactionTypes() {
      const uniqueTypes = new Set();
    
      for (let transaction of this.transactions) {
        uniqueTypes.add(transaction.type);
      }
    
      return Array.from(uniqueTypes);
    }
  
    /**
     * Вычисляет общую сумму по всем транзакциям.
     * @return {number} Общая сумма транзакций.
     */
    calculateTotalAmount() {
      let total = 0;
      for (let transaction of this.transactions) {
        total += transaction.amount;
      }
      return total;
    }
  
    /**
     * Возвращает транзакции по заданному типу.
     * @param {string} type - Тип транзакций для фильтрации.
     * @return {Array} Массив транзакций указанного типа.
     */
    getTransactionByType(type) {
      const filteredTransactions = [];
      for (let transaction of this.transactions) {
        if (transaction.type === type) {
          filteredTransactions.push(transaction);
        }
      }
      return filteredTransactions;
    }
  
    /**
     * Возвращает транзакции по заданному торговцу.
     * @param {string} merchantName - Имя торговца для фильтрации транзакций.
     * @return {Array} Массив транзакций указанного торговца.
     */
    getTransactionsByMerchant(merchantName) {
      const filteredTransactions = [];
      for (let transaction of this.transactions) {
        if (transaction.merchant === merchantName) {
          filteredTransactions.push(transaction);
        }
      }
      return filteredTransactions;
    }
  
    /**
     * Вычисляет среднюю сумму транзакции.
     * @return {number} Средняя сумма транзакций.
     */
    calculateAverageTransactionAmount() {
      const total = this.calculateTotalAmount();
      return total / this.transactions.length;
    }
  
    /**
     * Находит транзакцию по ее идентификатору.
     * @param {string} id - Идентификатор транзакции.
     * @return {Transaction|null} Найденная транзакция или null, если транзакция не найдена.
     */
    findTransactionById(id) {
      for (let transaction of this.transactions) {
        if (transaction.id === id) {
          return transaction;
        }
      }
      return null;
    }
  
    /**
     * Вычисляет общую сумму дебетовых транзакций.
     * @return {number} Общая сумма дебетовых транзакций.
     */
    calculateTotalDebitAmount() {
      let totalDebit = 0;
      for (let transaction of this.transactions) {
        if (transaction.type === 'debit') {
          totalDebit += transaction.amount;
        }
      }
      return totalDebit;
    }
  
    /**
     * Возвращает массив описаний всех транзакций.
     * @return {Array} Массив описаний транзакций.
     */
    mapTransactionDescriptions() {
      const descriptions = [];
      for (let transaction of this.transactions) {
        descriptions.push(transaction.description);
      }
      return descriptions;
    }
  
    /**
     * Возвращает транзакции в заданном диапазоне дат.
     * @param {string} startDate - Начальная дата диапазона.
     * @param {string} endDate - Конечная дата диапазона.
     * @return {Array} Массив транзакций в диапазоне дат.
     */
    getTransactionsInDateRange(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const filteredTransactions = [];
      for (let transaction of this.transactions) {
        const transactionDate = new Date(transaction.date);
        if (transactionDate >= start && transactionDate <= end) {
          filteredTransactions.push(transaction);
        }
      }
      return filteredTransactions;
    }
  
    /**
     * Возвращает транзакции в заданном диапазоне сумм.
     * @param {number} minAmount - Минимальная сумма транзакции.
     * @param {number} maxAmount - Максимальная сумма транзакции.
     * @return {Array} Массив транзакций в диапазоне сумм.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
      const filteredTransactions = [];
      for (let transaction of this.transactions) {
        if (transaction.amount >= minAmount && transaction.amount <= maxAmount) {
          filteredTransactions.push(transaction);
        }
      }
      return filteredTransactions;
    }
  
    /**
     * Возвращает транзакции до заданной даты.
     * @param {string} date - Дата для фильтрации транзакций.
     * @return {Array} Массив транзакций до заданной даты.
     */
    getTransactionsBeforeDate(date) {
      const cutoff = new Date(date);
      const filteredTransactions = [];
      for (let transaction of this.transactions) {
        const transactionDate = new Date(transaction.date);
        if (transactionDate < cutoff) {
          filteredTransactions.push(transaction);
        }
      }
      return filteredTransactions;
    }
  
    /**
     * Находит месяц с наибольшим количеством транзакций.
     * @return {string|null} Месяц с наибольшим количеством транзакций или null, если данных нет.
     */
    findMostTransactionsMonth() {
      const monthCounts = {};
      for (let transaction of this.transactions) {
        const month = new Date(transaction.date).getMonth() + 1;
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      }
  
      let mostTransactionsMonth = null;
      let maxTransactions = 0;
      for (let month in monthCounts) {
        if (monthCounts[month] > maxTransactions) {
          maxTransactions = monthCounts[month];
          mostTransactionsMonth = month;
        }
      }
      return mostTransactionsMonth;
    }
  
    /**
     * Находит месяц с наибольшим количеством дебетовых транзакций.
     * @return {string|null} Месяц с наибольшим количеством дебетовых транзакций или null, если данных нет.
     */
    findMostDebitTransactionMonth() {
      const monthCounts = {};
      for (let transaction of this.transactions) {
        if (transaction.type === 'debit') {
          const month = new Date(transaction.date).getMonth() + 1;
          monthCounts[month] = (monthCounts[month] || 0) + 1;
        }
      }
  
      let mostDebitTransactionsMonth = null;
      let maxDebitTransactions = 0;
      for (let month in monthCounts) {
        if (monthCounts[month] > maxDebitTransactions) {
          maxDebitTransactions = monthCounts[month];
          mostDebitTransactionsMonth = month;
        }
      }
      return mostDebitTransactionsMonth;
    }
  
    /**
     * Определяет, какой тип транзакций преобладает: дебетовые или кредитные.
     * @return {string} Преобладающий тип транзакций ('debit', 'credit' или 'equal').
     */
    mostTransactionTypes() {
      let debitCount = 0;
      let creditCount = 0;
      for (let transaction of this.transactions) {
        if (transaction.type === 'debit') {
          debitCount += 1;
        } else if (transaction.type === 'credit') {
          creditCount += 1;
        }
      }
  
      if (debitCount === creditCount) return 'equal';
      return debitCount > creditCount ? 'debit' : 'credit';
    }
  
    /**
     * Вычисляет общую сумму транзакций за определенную дату.
     * @param {number} [year] - Год транзакции.
     * @param {number} [month] - Месяц транзакции.
     * @param {number} [day] - День транзакции.
     * @return {number} Общая сумма транзакций за указанную дату.
     */
    calculateTotalAmountByDate(year, month, day) {
      let total = 0; 
    
      for (let transaction of this.transactions) {
        const transactionDate = new Date(transaction.date); 
        
        const matchYear = year === undefined || transactionDate.getFullYear() === year;
        const matchMonth = month === undefined || transactionDate.getMonth() === (month - 1);
        const matchDay = day === undefined || transactionDate.getDate() === day;
        
        if (matchYear && matchMonth && matchDay) {
          total += transaction.amount;
        }
      }
      return total;
    }
  }
  
  
  

const fs = require('fs');

const transactionsData = JSON.parse(fs.readFileSync('./transaction.json', 'utf8'));

const analyzer = new TransactionAnalyzer(transactionsData);

console.log('Общее количество транзакций:', analyzer.getAllTransactions().length);
console.log('Уникальные типы транзакций:', analyzer.getUniqueTransactionTypes().join(', '));
console.log('Общая сумма транзакций:', analyzer.calculateTotalAmount());
console.log('Количество транзакций типа "debit":', analyzer.getTransactionByType('debit').length);
console.log('Количество транзакций торговца "SuperMart":', analyzer.getTransactionsByMerchant('SuperMart').length);
console.log('Средняя сумма транзакции:', analyzer.calculateAverageTransactionAmount());
console.log('Транзакция с ID "1":', analyzer.findTransactionById('1') ? 'Найдена' : 'Не найдена');
console.log('Общая сумма дебетовых транзакций:', analyzer.calculateTotalDebitAmount());
console.log('Количество описаний транзакций:', analyzer.mapTransactionDescriptions().length);
console.log('Количество транзакций с "2019-01-01" по "2019-01-31":', analyzer.getTransactionsInDateRange('2019-01-01', '2019-01-31').length);
console.log('Количество транзакций с суммой от 50 до 100:', analyzer.getTransactionsByAmountRange(50, 100).length);
console.log('Количество транзакций до "2019-02-01":', analyzer.getTransactionsBeforeDate('2019-02-01').length);
console.log('Месяц с наибольшим количеством транзакций:', analyzer.findMostTransactionsMonth());
console.log('Месяц с наибольшим количеством дебетовых транзакций:', analyzer.findMostDebitTransactionMonth());
console.log('Преобладающий тип транзакций:', analyzer.mostTransactionTypes());
console.log('Общая сумма транзакций за 1 января 2019 года:', analyzer.calculateTotalAmountByDate(2019, 1, 1));

