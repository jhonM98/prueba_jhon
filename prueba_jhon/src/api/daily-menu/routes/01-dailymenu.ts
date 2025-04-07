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

// http://localhost:1337/api/daily-menus?populate=dessert - postres
//http://localhost:1337/api/daily-menus?filters[price][$gte]=5.5&filters[price][$lte]=22 filtros de precio
// /api/daily-menus/allergens
// /api/daily-menus/populardishes
// /api/daily-menus/desserts
// /api/daily-menus/price
