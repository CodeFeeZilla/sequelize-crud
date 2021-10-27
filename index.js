const {
  connection,
  Restaurant,
  Menu,
  MenuItem,
} = require("./sequelize-connect");

const RestaurantOps = require("./resources/restaurant");
const MenuOps = require("./resources/menu");
const MenuItemOps = require("./resources/menuItem");

async function main() {
  try {
    await start();
    const objects = await createRows();
    await runQueries(objects);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function start() {
  await connection.sync({
    logging: false,
    force: true,
  });
}

main().catch((e) => console.log(`Caight error: ${e}`));

async function createRows() {
  // create fist restaurant
  const firstRestaurant = await Restaurant.create({
    name: "Dominos",
    imagelink: "https://image1.web",
  });

  const firstMenu = await Menu.create({
    title: "Pizza Menu",
  });

  const sideMenu = await Menu.create({
    title: "Sides",
  });

  const firstMenuItem = await MenuItem.create({
    name: "Pepparoni Pizza",
    price: 2.34,
  });

  await firstRestaurant.addMenu(firstMenu);
  await firstRestaurant.addMenu(sideMenu);
  await firstMenu.addMenuItem(firstMenuItem);

  // create second restaurant
  const secondRestaurant = await RestaurantOps.createRestaurant(
    "Burger King",
    "https//:image.com"
  );

  const secondMenu = await MenuOps.createMenu("Burger Menu");

  const secondMenuItem = await MenuItemOps.createMenuItem(
    "Cheese Burger",
    1.99
  );

  await secondRestaurant.addMenu(secondMenu);
  await secondMenu.addMenuItem(secondMenuItem);

  return [firstRestaurant, secondRestaurant, firstMenu];
}

async function runQueries(objects) {
  [firstRestaurant, secondRestaurant, firstMenu] = objects; // objects[0], objects[1], objects[2]

  const restaurants = await Restaurant.findAll({}); // get all restaurants

  // C = Restaurant.create({}) - done
  // R = Restaurant.findAll({}) - done
  // U = Restaurant.update()
  await Restaurant.update(
    { name: "Pizza shop" },
    { where: { name: "Dominos" } }
  );
  // D = Restaurant.destroy()
  await Restaurant.destroy({
    where: {
      name: "Burger king",
    },
  });

  // get Menus that belong to a restaurant
  const menus = await firstRestaurant.getMenus();

  // --> get menu items that belong to a menu here
  const firstMenuItems = await firstMenu.getMenuItems();
  // --> write tests in jest to prove your restaurant CRUD functions work

  console.log(`**** Found all restos: ${JSON.stringify(restaurants)}`);
  console.log(`**** Found all menus: ${JSON.stringify(menus)}`);
  console.log(
    `**** Found all menus items belonging to first menu: ${JSON.stringify(
      firstMenuItems
    )}`
  );
}
