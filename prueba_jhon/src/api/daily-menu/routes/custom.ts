export default {
  routes: [
    {
      method: "GET",
      path: "/daily-menu/desserts",
      handler: "custom.getDesserts",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/daily-menu/price",
      handler: "custom.filterByPriceRange",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    /*{
      method: "GET",
      path: "daily-menu/allergens",
      handler: "routs.filterByAllergens",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/daily-menu/populares",
      handler: "daily-menu.getMostPopularDishes",
      config: {
        policies: [],
        middlewares: [],
      },
    },*/
  ],
};
