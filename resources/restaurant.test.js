const { connection } = require("../sequelize-connect");
const { Restaurant } = require("../sequelize-connect");

describe("Restaurant", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await connection.sync({ force: true });
  });

  test("can create a restaurant", async () => {
    const restaurant = await Restaurant.create({
      name: "Ronalds",
      imagelink: "http://some.image.url",
    });
    expect(restaurant.id).toBe(1);
  });

  test("can read a restaurant", async () => {
    const restaurant = await Restaurant.findOne({ where: { id: 1 } });
    expect(restaurant.name).toBe("Ronalds");
  });

  test("can update a restaurant", async () => {
    await Restaurant.update({ name: "Peters" }, { where: { name: "Ronalds" } });
    const restaurant = await Restaurant.findOne({ where: { id: 1 } });
    expect(restaurant.name).toBe("Peters");
  });

  test("can delete a restaurant", async () => {
    await Restaurant.destroy({ where: { id: 1 } });
    const restaurant = await Restaurant.findOne({ where: { id: 1 } });
    expect(restaurant).toBeNull();
  });
});
