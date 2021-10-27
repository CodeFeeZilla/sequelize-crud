const Sequelize = require("sequelize");

const {
  restaurantModel,
  menuModel,
  menuItemModel,
} = require("./models/models");

const connection = new Sequelize("db", "user", "pass", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./database/db.sqlite",
});

const Restaurant = connection.define("Restaurant", restaurantModel);
const Menu = connection.define("Menu", menuModel);
const MenuItem = connection.define("MenuItem", menuItemModel);

Menu.belongsTo(Restaurant);
MenuItem.belongsTo(Menu);
Restaurant.hasMany(Menu);
Menu.hasMany(MenuItem);

module.exports = { connection, Restaurant, Menu, MenuItem };
