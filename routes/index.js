const express = require('express');
const router = express.Router();
const HTTPStatus = require('http-status');

const mailer = require('../app/helpers/mailer').mailer;
const db = require('../models/db');
const Contacts = db.models.Contacts;

router.post('/sendMail', (req, res) => {
  const { email, message, name } = req.body;
  Contacts.create({ email, message, name })
    .then(() =>
      mailer.sendMail({ email, message, name })
        .then(() => {
          res.send({ success: true });
        })
        .catch((err) => {
          res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({ message: err.message });
        })
    )
    .catch((err) => {
      console.error(err);
      mailer.sendMail({ email, message: `CAN NOT STORE THIS TO DATABASE, message: ${message}`, name });
      res.status(HTTPStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // todo: check that it is really email validation error, not smth else
    });
});

module.exports = router;
