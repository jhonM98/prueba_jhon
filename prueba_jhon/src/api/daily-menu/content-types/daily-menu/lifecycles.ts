
export default {

  async beforeUpdate(event) {

    const { data } = event.params;
    const ctx = strapi.requestContext.get();
    const { params } = ctx;
    const { id } = params;
    
    const dishes = await strapi.documents('api::daily-menu.daily-menu').findOne({
      documentId: id,
      populate: {
        first:{
          fields:['name','price'],
        },
        second:{
          fields:['name','price'],
        },
        dessert:{
          fields:['name','price'],
        }
      }

    })
    
    const { first, second, dessert } = dishes;

    const suma = (first?.price ?? 0) + (second?.price ?? 0) + (dessert?.price ?? 0);
    
    console.log('suma', suma) 

    data.sumPrice = suma;
    
  },

  /*async beforeCreate(event) {
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
  }*/
 //cambios de jhon
};