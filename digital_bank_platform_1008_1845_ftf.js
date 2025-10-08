// 代码生成时间: 2025-10-08 18:45:47
const bankAccount = {
  // 用户账户余额
  balance: 1000, // 初始余额

  // 显示账户余额
  displayBalance() {
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `当前余额: ${this.balance}`;
  },

  // 存款操作
  deposit(amount) {
    if (amount <= 0) {
      console.error('存款金额必须大于0');
      return;
    }
    this.balance += amount;
    this.displayBalance();
  },

  // 取款操作
  withdraw(amount) {
    if (amount <= 0) {
      console.error('取款金额必须大于0');
      return;
    }
    if (amount > this.balance) {
      console.error('账户余额不足');
      return;
    }
    this.balance -= amount;
    this.displayBalance();
  },

  // 初始化银行平台
  init() {
    this.displayBalance();
    document.getElementById('depositButton').onclick = () => this.deposit(parseFloat(document.getElementById('depositAmount').value));
    document.getElementById('withdrawButton').onclick = () => this.withdraw(parseFloat(document.getElementById('withdrawAmount').value));
  }
};

// 在DOM加载完成后初始化银行平台
document.addEventListener('DOMContentLoaded', () => bankAccount.init());