let Base = require('./Base');

class Account extends Base {
  constructor() {
    super({
      name: 'account'
    })
  }
}

module.exports = Account;