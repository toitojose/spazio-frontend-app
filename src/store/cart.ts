import { defineStore } from 'pinia';
import type { ProductCart } from '@/interfaces/products/product.interface';

export const useUserStore = defineStore('cart', {
  state: () => ({
    cart: [] as ProductCart[],
  }),
  actions: {
    setProduct(product: Partial<ProductCart>) {
      const existingProduct = this.cart.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity ?? 0) + (product.quantity ?? 1);
      } else {
        this.cart.push({ ...product, quantity: product.quantity ?? 1 } as ProductCart);
      }
    },
    updateProduct(product: Partial<ProductCart>) {
      const existingProduct = this.cart.find((p) => p.id === product.id);

      if (existingProduct) {
        // Reemplaza la cantidad con la nueva cantidad en lugar de sumarla
        existingProduct.quantity = product.quantity ?? 1;
      } else {
        this.cart.push({ ...product, quantity: product.quantity ?? 1 } as ProductCart);
      }
    },
    clearCart() {
      this.cart = [];
    },
  },
  getters: {},
  persist: true,
});
