import { factories } from '@strapi/strapi';
/*export default {
  calculatePrice(platos: any[], tipoMenu: string) {
    let totalPrecio = 0;

    platos.forEach(plato => {
      totalPrecio += plato.precio;
    });

    // Aplicar impuestos según tipo de menú
    const impuestos = {
      'menu_estandar': 0.1,  
    };

    const impuesto = impuestos[tipoMenu] || 0;
    totalPrecio = totalPrecio * (1 + impuesto);

    return totalPrecio;
  },
};*/

export default factories.createCoreService('api::daily-menu.daily-menu',({strapi}) => ({ 
  strapi,
  async calculatePrice (hhhh:string){
    console.log('hhhh', hhhh)
    return hhhh
  }
}
));