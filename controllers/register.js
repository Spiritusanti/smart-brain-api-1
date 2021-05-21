const createSessions = require('./signin').createSessions;
/* need to create session and then send to client.
Can likely use the createSessions function from signin to achieve this
I think it needs to happen where we are returning the user data.....
not sure how to implement it at this moment but know how to link up on client and store in sessionStorage
*/
const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register ' + err))
}




module.exports = {
  handleRegister: handleRegister
};


