let db = require('../index');

class Base {
  constructor(opts) {
    this.db = opts && opts.db || db;

    if ( !opts.name ) {
      throw new Error('must be instantiated with name')
    }

    if ( opts ) {
      Object.keys( opts ).forEach( key => {
        this[ key ] = opts[ key ];
      });
    }
  }

  getAll() {
    return this.db.ref(this.name)
  }
}