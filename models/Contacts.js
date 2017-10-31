module.exports = function(sequelize, Sequelize) {
  return sequelize.define('constacts',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }
  );
};
