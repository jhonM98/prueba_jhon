import { errors } from '@strapi/utils'
import dishe from '../../../dishe/routes/dishe';
import { constants } from 'buffer';
import dailyMenu from '../../controllers/daily-menu';

export default {

  async beforeUpdate(event) {
    const { ApplicationError } = errors
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
  
    data.sumPrice = suma;

    const calculate = await strapi.service('api::daily-menu.service').calculatePrice(id);
    data.price = calculate; //servicio integrado de precio//

  },
  async afterUpdate(event) {
    const { ApplicationError } = errors
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

    if(first && second && first?.documentId === second?.documentId){
      throw new ApplicationError('El primer plato no puede ser igual al segundo plato')    
    }
    if(first && dessert && first?.documentId === dessert?.documentId){
      throw new ApplicationError('El primer plato no puede ser igual al postre') 
    }
    if(second && dessert && second?.documentId === dessert?.documentId){
      throw new ApplicationError('El segundo plato no puede ser igual al postre') 
    }
  }, 

};