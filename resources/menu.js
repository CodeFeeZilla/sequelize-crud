const { Menu } = require("../sequelize-connect");

const MenuOps = {
  createMenu: async function (title) {
    const menu = await Menu.create({
      title: title,
    });
    return menu;
  },
};

module.exports = MenuOps;
