export default {
  async getPostres(ctx) {
    const postres = await strapi.db.query('api::menus-diarios.menus-diarios').findMany({
      where: {
        'platos.categoria': 'Postre',
      },
    });

    ctx.body = postres;
  },

  async filterByPriceRange(ctx) {
    const { min_precio, max_precio } = ctx.query;

    const menus = await strapi.db.query('api::menus-diarios.menus-diarios').findMany({
      where: {
        Sum_Precio: {
          $gte: Number(min_precio),
          $lte: Number(max_precio),
        },
      },
    });

    ctx.body = menus;
  },

  async filterByAllergens(ctx) {
    const { excluir_alergenos } = ctx.query;
    const alergeneosList = excluir_alergenos.split(',');

    const menus = await strapi.db.query('api::menus-diarios.menus-diarios').findMany({
      where: {
        platos: {
          $notIn: alergeneosList,
        },
      },
    });

    ctx.body = menus;
  },

  async getMostPopularPlatos(ctx) {
    // Suponiendo que hay un campo para contar las ventas, "ventas" podría ser una propiedad en cada plato
    const populares = await strapi.db.query('api::platos.platos').findMany({
      orderBy: { ventas: 'desc' },
    });

    ctx.body = populares;
  },
};