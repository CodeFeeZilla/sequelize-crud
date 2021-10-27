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
});
