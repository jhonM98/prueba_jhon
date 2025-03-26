export default {
  calculatePrice(platos: any[], tipoMenu: string) {
    let totalPrecio = 0;

    platos.forEach(plato => {
      totalPrecio += plato.precio;
    });

    // Aplicar impuestos según tipo de menú
    const impuestos = {
      'menu_estandar': 0.1,  // 10%
      'menu_gourmet': 0.15,  // 15%
      'menu_vegano': 0.05,   // 5%
    };

    const impuesto = impuestos[tipoMenu] || 0;
    totalPrecio = totalPrecio * (1 + impuesto);

    return totalPrecio;
  },
};