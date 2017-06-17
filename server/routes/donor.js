let db = require('../db');

module.exports = function( app ) {
  app.post('/donors', ( req, res ) => {
    let newPostKey = db.ref('donors').push().key;
    let ref = db.ref(`/donors/${newPostKey}`).push( req.body );

    ref.then( (result) => {
      res.sendStatus(201);
    }).catch( err => {
      res.sendStatus(400)
    });
  });

  app.get('/donors/:id', ( req, res ) => {
    let id = req.params._id;
    let ref = db.ref(`/donors/${ id }`)
    ref.on('value', snapshot => {
      if ( !snapshot.val() ) {
        return res.sendStatus(400);
      }
      res.send( snapshot.val() )
    });
  });

  app.put('/donors/:id', ( req, res ) => {

    let id = req.params._id;
    let ref = db.ref(`/donors/${ id }`).on('value', snap => {
      let oldProps = snap.val();
      if ( !oldProps ) {
        return res.sendStatus(200);
      }
      let newBody = Object.assign({}, oldProps, req.body );
      ref.update( newBody );
      res.sendStatus(200)
    });

  });

  app.delete('/donors/:id', ( req, res ) => {
    let id = req.params._id;
    let ref = db.ref(`/donors/${ id }`);
    ref.remove().then( value => {
      res.sendStatus(202);
    }).catch( err => {
      res.sendStatus(400);
    });
  })

}
