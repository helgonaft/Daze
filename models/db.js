'use strict';

const Sequelize = require('sequelize');
const _ = require('lodash');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${__dirname}/../app/resources/database.sqlite`
});

const Contacts = require('./Contacts')(sequelize, Sequelize);

const force = false;

function sync() {
  Promise.all(_.map([Contacts], (Model) => Model.sync({ force })))
    .then((r) => console.log('Database synced!'));
}

const command = _.last(process.argv);
if (command === 'sync') {
  sync();
}

module.exports = {
  sequelize,
  sync,
  models: { Contacts }
};
