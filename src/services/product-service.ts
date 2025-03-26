import type { ProductResult } from '@/interfaces/products/product.interface';

const productosEjemplo: ProductResult = {
  result: true,
  message: 'Ninguno',
  error: null,
  data: [
    {
      id: 1,
      name: 'Laptop HP Pavilion',
      imageURL: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
      description: 'Laptop HP Pavilion con procesador Intel Core i5, 8GB RAM, SSD 256GB',
      precioCompra: 450.0,
      precioVenta: 699.99,
      tipo: 'General',
      estado: true,
      pedidos: 0,
      ratio: 55.55,
    },
    {
      id: 2,
      name: 'Monitor Dell 24"',
      imageURL: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
      description: 'Monitor Dell de 24 pulgadas, resolución Full HD, 144Hz',
      precioCompra: 180.0,
      precioVenta: 249.99,
      tipo: 'General',
      estado: true,
      pedidos: 0,
      ratio: 38.88,
    },
    {
      id: 3,
      name: 'Teclado Mecánico RGB',
      imageURL: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      description: 'Teclado mecánico con switches Cherry MX, retroiluminación RGB',
      precioCompra: 45.0,
      precioVenta: 79.99,
      tipo: 'General',
      estado: false,
      pedidos: 0,
      ratio: 77.76,
    },
    {
      id: 4,
      name: 'Mouse Gaming',
      imageURL: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
      description: 'Mouse gaming con sensor óptico de alta precisión, 6 botones programables',
      precioCompra: 25.0,
      precioVenta: 49.99,
      tipo: 'General',
      estado: true,
      pedidos: 0,
      ratio: 99.96,
    },
    {
      id: 5,
      name: 'Auriculares Bluetooth',
      imageURL: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      description: 'Auriculares inalámbricos con cancelación de ruido activa',
      precioCompra: 60.0,
      precioVenta: 99.99,
      tipo: 'General',
      estado: false,
      pedidos: 0,
      ratio: 66.65,
    },
  ],
};

export class ProductService {
  async products(): Promise<ProductResult> {
    return productosEjemplo;
  }
}
