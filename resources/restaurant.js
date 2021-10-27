const { Restaurant } = require("../sequelize-connect");

const RestaurantOps = {
  createRestaurant: async function (name, imagelink) {
    const restaurant = await Restaurant.create({
      name: name,
      imagelink: imagelink,
    });
    return restaurant;
  },
};

module.exports = RestaurantOps;
