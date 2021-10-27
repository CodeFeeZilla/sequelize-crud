const Sequelize = require("sequelize");

const restaurantModel = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagelink: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

const menuModel = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

const menuItemModel = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

module.exports = { restaurantModel, menuModel, menuItemModel };
