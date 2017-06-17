let db = require('../db');

module.exports = function (app) {
  app.post('/recipients', (req, res) => {
    let newPostKey = db.ref('recipients').push().key;
    let ref = db.ref(`/recipients/${ newPostKey }`).push(req.body);

    ref.then((result) => {
      res.sendStatus(201);
    }).catch(err => {
      res.sendStatus(400)
    });
  });

  app.get('/recipients/:id', (req, res) => {
    let id = req.params._id;
    let ref = db.ref(`/recipients/${ id }`)
    ref.on('value', snapshot => {
      if (!snapshot.val()) {
        return res.sendStatus(400);
      }
      res.send(snapshot.val())
    });
  });

  app.put('/recipients/:id', (req, res) => {

    let id = req.params._id;
    let ref = db.ref(`/recipients/${ id }`).on('value', snap => {
      let oldProps = snap.val();
      if (!oldProps) {
        return res.sendStatus(200);
      }
      let newBody = Object.assign({}, oldProps, req.body);
      ref.update(newBody);
      res.sendStatus(200)
    });

  });

  app.delete('/recipients/:id', (req, res) => {
    let id = req.params._id;
    let ref = db.ref(`/recipients/${ id }`);
    ref.remove().then(value => {
      res.sendStatus(202);
    }).catch(err => {
      res.sendStatus(400);
    });
  })

}
