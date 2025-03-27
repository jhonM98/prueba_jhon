import { errors } from '@strapi/utils'

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
    
    console.log('suma', suma) 

    data.sumPrice = suma;

    console.log(dishes);
    console.log(first?.documentId)

    if(dishes.first?.documentId === second?.documentId){
      //throw new ApplicationError('El primer plato no puede ser igual al segundo plato')
    }else{
      console.log("no existe")
    }
    
  },


  
};