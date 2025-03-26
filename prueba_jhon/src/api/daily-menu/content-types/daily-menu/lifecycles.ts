export default {
  async beforeCreate(event) {
    const { data } = event.params;

    // Calcular Sum_Precio con impuestos
    data.Sum_Price = await strapi.service('api::daily-menu.daily-menu').calculatePrice(data.dishes, data.guys_menu);

    // Validar que un plato no se repita en varias categorías
    const categoriasPlatos = new Set();
    for (const plato of data.platos) {
      if (categoriasPlatos.has(plato.categoria)) {
        throw new Error(`El plato ${plato.nombre} no puede estar repetido en la categoría ${plato.categoria}`);
      }
      categoriasPlatos.add(plato.categoria);
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    // Calcular Sum_Precio con impuestos
    data.Sum_Precio = await strapi.service('api::menus-diarios.menus-diarios').calculatePrice(data.platos, data.tipo_menu);

    // Validar que un plato no se repita en varias categorías
    const categoriasPlatos = new Set();
    for (const plato of data.platos) {
      if (categoriasPlatos.has(plato.categoria)) {
        throw new Error(`El plato ${plato.nombre} no puede estar repetido en la categoría ${plato.categoria}`);
      }
      categoriasPlatos.add(plato.categoria);
    }
  }
};