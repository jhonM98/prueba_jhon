import { factories } from '@strapi/strapi'; 
import dailyMenu from './daily-menu';

export default factories.createCoreService('api::daily-menu.daily-menu', ({ strapi }) => ({

  async calculatePrice(documentId) {
   try {
    const platos =  await strapi.documents("api::daily-menu.daily-menu").findOne({
      documentId: documentId,
      populate: {
        first: {
          fields: ["price"]
        },
        second: {
          fields: ["price"]
        },
        dessert: {
          fields: ["price"]
        }
      },
    })
    const sumPrice = (platos.first?.price ?? 0) + (platos.second?.price ?? 0) + (platos.dessert?.price ?? 0)
    const impuestos = 0.21
    const calculo = (sumPrice * impuestos) + sumPrice;
    return calculo
   }
    catch (error) {

    }
  },
}));

