<template>
  <transition name="slide-cart">
    <div
      v-if="visible"
      class="fixed right-0 top-0 z-30 flex h-full w-72 flex-col bg-white shadow-lg">
      <div class="flex items-center justify-between border-b p-4 pt-14">
        <h2 class="text-lg font-bold">Tu carrito</h2>
      </div>

      <div class="flex-1 space-y-4 overflow-auto p-4">
        <ProductCard
          v-for="(product, i) in cartItems"
          :key="i"
          :image="product.image"
          :title="product.name"
          :price="product.price"
          :sales="product.sales"
          variant="cart" />
      </div>

      <div class="flex justify-end space-x-4 p-4">
        <button
          class="w-full rounded bg-blue-500 py-2 text-white"
          @click="$emit('goToCart')">
          Ir al carrito
        </button>
        <button
          class="w-full rounded bg-yellow-500 py-2 text-white"
          @click="$emit('goToCheckout')">
          Hacer compra
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '@/store/cart';
import ProductCard from '@/components/commercial/ProductCard.vue';

const props = defineProps<{ visible: boolean }>();

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.allProducts);
</script>

<style scoped>
.slide-cart-enter-active,
.slide-cart-leave-active {
  transition: transform 0.3s ease;
}
.slide-cart-enter {
  transform: translateX(100%);
}
.slide-cart-leave-to {
  transform: translateX(100%);
}
</style>
