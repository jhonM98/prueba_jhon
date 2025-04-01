export default{
  routes: [
    {
      method: "GET",
      path: "/daily-menus/desserts",
      handler: "01-dailymenu.getDesserts",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/daily-menus/price",
      handler: "01-dailymenu.filterByPriceRange",
      config: {
        policies: [],
        middlewares: [],
      },
    },
   {
      method: "GET",
      path: "/daily-menus/allergens",
      handler: "01-dailymenu.getAllergens",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/daily-menus/populardishes",
      handler: "01-dailymenu.getPopularDishes",
      config: {
        policies: [],
        middlewares: [],
      },
    },
]
}