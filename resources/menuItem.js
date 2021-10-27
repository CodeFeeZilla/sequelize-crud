const { MenuItem } = require("../sequelize-connect");

const MenuItemOps = {
  createMenuItem: async function (name, price) {
    const menuItem = await MenuItem.create({
      name: name,
      price: price,
    });
    return menuItem;
  },
};

module.exports = MenuItemOps;
