<template>
  <CartProcessLayout :current-step="0">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="mb-6 md:col-span-2">
        <h2 class="text-lg font-medium">Productos seleccionados.</h2>
        <div class="grid grid-cols-2 gap-4 rounded-lg border p-4">
          <ProductCard
            v-for="product in cartItems"
            :image="product.image"
            :title="product.name"
            :price="product.price"
            :sales="product.sales"
            variant="cart" />
        </div>
      </div>

      <div class="flex flex-col space-y-2 md:col-span-1">
        <h2 class="text-lg font-medium">Gestión de dirección.</h2>
        <div class="grid grid-cols-1 gap-4 rounded-lg border p-4">
          <p> Actualmente no existe ninguna dirección de envío, por favor ingresa una dirección de envío. </p>
          <PButton
            label="Nueva dirección"
            class="w-full"
            severity="info" />
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 md:col-span-3 md:flex-row">
        <PButton
          label="Ver más productos"
          icon="pi pi-arrow-left"
          outlined
          class="md:w-1/3"
          @click="goHome" />
        <PButton
          label="Vaciar el carrito"
          icon="pi pi-trash"
          severity="danger"
          outlined
          class="md:w-1/3"
          @click="goEmpty" />
        <PButton
          label="Canjear productos"
          icon="pi pi-check"
          severity="success"
          class="md:w-1/3"
          @click="goNext" />
      </div>
    </div>
  </CartProcessLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductCard from '@/components/commercial/ProductCard.vue';
import { Button as PButton } from 'primevue';
import CartProcessLayout from '@/layout/cart/CartProcessLayout.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useCartStore } from '@/store/cart';

const cartStore = useCartStore();
const router = useRouter();
const cartItems = ref();

onMounted(() => {
  loadCart();
});

const loadCart = () => {
  cartItems.value = cartStore.allProducts;
};

const goEmpty = () => {
  cartStore.clearCart();
  loadCart();
};

const goHome = () => {
  router.push('/');
};

const goNext = () => {
  router.push('/cart/cart-second-step');
};
</script>
