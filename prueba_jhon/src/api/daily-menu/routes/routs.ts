export default {
  routes: [
    {
      method: 'GET',
      path: '/daily-menu/desserts',
      handler: 'daily-menu.getDesserts',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/menu',
      handler: 'daily-menu.filterByPriceRange',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/menus',
      handler: 'daily-menu.filterByAllergens',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/dishes/populares',
      handler: 'daily-menu.getMostPopularDishes',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};