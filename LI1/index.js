class Transaction {
  constructor(id, date, amount, type, description, merchant, cardType) {
      this.id = id;
      this.date = date;
      this.amount = amount;
      this.type = type;
      this.description = description;
      this.merchant = merchant;
      this.cardType = cardType;
  }

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
class TransactionAnalyzer {
  constructor(transactions) {
      this.transactions = transactions.map(t => new Transaction(
          t.transaction_id, t.transaction_date, t.transaction_amount, 
          t.transaction_type, t.transaction_description, t.merchant_name, t.card_type
      ));
  }

  addTransaction(transactionData) {
      const transaction = new Transaction(
          transactionData.transaction_id, transactionData.transaction_date, transactionData.transaction_amount,
          transactionData.transaction_type, transactionData.transaction_description, transactionData.merchant_name, transactionData.card_type
      );
      this.transactions.push(transaction);
  }

  getAllTransactions() {
      return this.transactions;
  }

  getUniqueTransactionTypes() {
      const uniqueTypes = [];
      for (let transaction of this.transactions) {
          if (!uniqueTypes.includes(transaction.type)) {
              uniqueTypes.push(transaction.type);
          }
      }
      return uniqueTypes;
  }

  calculateTotalAmount() {
      let total = 0;
      for (let transaction of this.transactions) {
          total += transaction.amount;
      }
      return total;
  }

  getTransactionByType(type) {
      const filteredTransactions = [];
      for (let transaction of this.transactions) {
          if (transaction.type === type) {
              filteredTransactions.push(transaction);
          }
      }
      return filteredTransactions;
  }
  getTransactionsByMerchant(merchantName) {
    const filteredTransactions = [];
    for (let transaction of this.transactions) {
        if (transaction.merchant === merchantName) {
            filteredTransactions.push(transaction);
        }
    }
    return filteredTransactions;
}

calculateAverageTransactionAmount() {
    const total = this.calculateTotalAmount();
    return total / this.transactions.length;
}

findTransactionById(id) {
    for (let transaction of this.transactions) {
        if (transaction.id === id) {
            return transaction;
        }
    }
    return null; 
}

calculateTotalDebitAmount() {
    let totalDebit = 0;
    for (let transaction of this.transactions) {
        if (transaction.type === 'debit') {
            totalDebit += transaction.amount;
        }
    }
    return totalDebit;
}

mapTransactionDescriptions() {
    const descriptions = [];
    for (let transaction of this.transactions) {
        descriptions.push(transaction.description);
    }
    return descriptions;
}
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

getTransactionsByAmountRange(minAmount, maxAmount) {
  const filteredTransactions = [];
  for (let transaction of this.transactions) {
      if (transaction.amount >= minAmount && transaction.amount <= maxAmount) {
          filteredTransactions.push(transaction);
      }
  }
  return filteredTransactions;
}

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
