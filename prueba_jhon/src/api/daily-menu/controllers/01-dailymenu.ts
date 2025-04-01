import dailyMenu from "./daily-menu";

export default {
  async getDesserts(ctx) {
    const desserts = await strapi
      .documents("api::daily-menu.daily-menu")
      .findMany({
        populate: {
          dessert: {
            fields: ["name", "price"],
          },
        },
      });

    ctx.send(desserts);
  },
  async filterByPriceRange(ctx) {
    const { min_price, max_price } = ctx.query;
    const price = await strapi.documents("api::daily-menu.daily-menu").findMany({
      filters: { price: { $gte: Number(min_price), $lte: Number(max_price) } },
    });

    ctx.send(price);
  },

  async getAllergens(ctx) {
    const {excludeAllergen} = ctx.request.query;
    const allergen = excludeAllergen.split(",");
    console.log(allergen)

    const menusAllergens = await strapi.documents("api::daily-menu.daily-menu").findMany({ 
      populate: {
        first: {
          populate: {
            allergen:{
              fields: '*'
            }
          }
        },
        second: {
          populate: {
            allergen: {
              fields: '*'
            }
          }
        },
        dessert: {
          populate: {
            allergen: {
              fields: '*'
            }
          }
        },
      }

    });
    ctx.send(menusAllergens);
    console.log(menusAllergens);

    const filterss = menusAllergens.filter(m =>{
      const { first, second, dessert } = m;

      const firstPlato  = first?.allergen.some(al => excludeAllergen.includes(al.name));
      const secondPlato  = second?.allergen.some(al => excludeAllergen.includes(al.name));
      const dessertPlato  = dessert?.allergen.some(al => excludeAllergen.includes(al.name));

      return !firstPlato && !secondPlato && !dessertPlato
    })

    return ctx.send({data: filterss})
  },
  async getPopularDishes(ctx) {
  const menuDishes = await strapi.documents("api::daily-menu.daily-menu").findMany({
    fields: ["menuOfTheDay"],
    populate: {
      first: {
        fields: ["name"]
      },
      second:{
        fields:["name"]
      },
      dessert: {
        fields: ["name"]
      },
    },
  });
  const popularDishes = menuDishes.flatMap((menuDishes) => [
  menuDishes.first?.name,
  menuDishes.second?.name,
  menuDishes.dessert?.name,
  ]).filter(Boolean);
  const topDishes = popularDishes.slice(0,2);

  if (topDishes.length === 0) {
    return ctx.badRequest("No se encuentran platos favoritos o populares");
  }
  return ctx.send(topDishes);
  },

};
