
export default {
  async getDesserts(ctx) {
    const desserts = await strapi
      .documents("api::daily-menu.daily-menu")
      .findMany({
        populate:{
          dessert:{
            fields: ["name", "price"]
          }
        }

      });

    ctx.send(desserts);
  },

  async filterByPriceRange(ctx) {
    const { min_price, max_price } = ctx.query;
    const price = await strapi.documents("api::daily-menu.daily-menu").findOne({
      documentId: ctx.documentId,
      filters: { price: { $gte: min_price, $lte: max_price } },
    });
    ctx.send(price);
  },

  async filterByAllergens(ctx) {
    const { exclude.allergen } = ctx.query;
    const allergensToExclude = exclude.allergen.split(',');
    const filteredMenus = await strapi.query('api::daily-menu.daily-menu').findMany({
      where: {
        allergens: {
          $nin: allergensToExclude,
        },
      },
    });
    ctx.send({ data: filteredMenus });
  },

  async getPopularDishes(ctx) {
    const popularDishes = await strapi.query('api::dishe.dishe').findMany({
      where: {
        popularity: { $gte: 10 },
      },
      orderBy: { popularity: 'desc' },
      limit: 10,
    });
    ctx.send({ data: popularDishes });
  },




























































  /*
  async filterByAllergens(ctx) {
    const { exclude_allergens } = ctx.query;
    const alergeneosList = exclude_allergens.allergens.split(",");

    const menus = await strapi.db
      .query("api::menus-diarios.menus-diarios")
      .findMany({
        where: {
          platos: {
            $notIn: alergeneosList,
          },
        },
      });

    ctx.body = menus;
  },

  async getMostPopularDishes(ctx) {
    // Suponiendo que hay un campo para contar las ventas, "ventas" podría ser una propiedad en cada plato
    const populares = await strapi.db.query("api::platos.platos").findMany({
      orderBy: { ventas: "desc" },
    });

    ctx.body = populares;
  },*/
};
