let Base = require('./Base');

class Transaction extends Base {
  constructor() {
    super({
      name: 'transaction'
    });
  }
}

module.exports = Transaction;