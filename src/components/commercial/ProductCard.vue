<template>
  <div class="product-card">
    <!-- Imagen del producto -->
    <div class="product-image mb-4">
      <img
        :src="`/public/img/products/${$props.image}`"
        :alt="title"
        class="h-40 w-full object-contain" />
    </div>

    <!-- Información del producto -->
    <div class="product-info">
      <h3 class="title">{{ title }}</h3>
      <div class="flex items-baseline justify-between">
        <p class="text-sm font-semibold text-accent">{{ formattedPrice }} spazios</p>
        <p class="text-xs">{{ sales }} ventas</p>
      </div>
    </div>

    <!-- Botón de acción -->
    <div
      v-if="variant === 'buy'"
      class="mt-4">
      <Button
        label="¡Lo quiero!"
        icon-pos="right"
        icon="pi pi-shopping-cart"
        size="small"
        severity="secondary"
        class="w-full uppercase" />
    </div>

    <!-- Variante de carrito -->
    <div
      v-if="variant === 'cart'"
      class="mt-4 flex w-full items-center justify-between">
      <span class="text-sm text-primary">{{ shortDescription }}</span>
      <div class="flex items-center gap-2">
        <Button
          icon="pi pi-trash"
          class="p-button-danger p-button-rounded"
          @click="onDelete" />
        <select
          v-model="quantity"
          class="rounded border border-primary px-2 py-1 text-sm">
          <option
            v-for="n in 10"
            :key="n"
            :value="n"
            >{{ n }}</option
          >
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Button from 'primevue/button';

const props = defineProps<{
  image: string; // URL de la imagen del producto
  title: string; // Título del producto
  price: number; // Precio en "spazios"
  sales: number; // Número de ventas
  variant: 'buy' | 'cart'; // Variante del diseño: comprar o carrito
  shortDescription?: string; // Descripción corta (solo para variante carrito)
  quantity?: number; // Cantidad seleccionada (solo para carrito)
  onDelete?: () => void; // Acción para eliminar producto del carrito
}>();

// Formatear precio
const formattedPrice = computed(() => {
  return props.price.toLocaleString('es-ES', { useGrouping: true });
});

const quantity = ref(1);
</script>

<style scoped>
.product-card {
  @apply flex flex-col items-stretch rounded-lg transition-transform duration-200;
}
.product-image img {
  @apply h-full w-full object-cover;
}

.product-info {
  @apply text-center;
}

.product-info .title {
  @apply line-clamp-2 max-w-full truncate text-sm font-semibold text-primary;
}

.product-info .price {
  @apply text-lg font-bold text-accent;
}

.product-info .sales {
  @apply text-sm text-secondary;
}

.action {
  @apply mt-4;
}

.buy-button {
  @apply w-full rounded-full bg-accent px-4 py-2 text-white shadow-md;
}

.cart-variant {
  @apply mt-4 flex w-full items-center justify-between;
}

.cart-variant .short-description {
  @apply text-sm text-primary;
}

.cart-actions {
  @apply flex items-center gap-2;
}

.delete-button {
}

.quantity-selector {
  @apply rounded border border-primary px-2 py-1 text-sm;
}
</style>
