<template>
  <div class="min-h-16 pb-8">
    <!-- Banner promocional -->
    <Banner />

    <!-- Garantías y servicios -->
    <div class="mx-4 my-4 grid grid-cols-1 gap-6 md:mx-20 md:grid-cols-2 lg:grid-cols-4">
      <FeatureCard
        icon="pi pi-flag"
        title="¿Listo para comenzar?"
        subtitle="Conoce cómo funciona SPAZIO"
        variant="info-secondary" />
      <FeatureCard
        icon="pi pi-gift"
        title="¿Qué es SPAZIO?"
        subtitle="Transforma tus pagos de arriendo en premios"
        variant="info-accent" />
      <FeatureCard
        icon="pi pi-check-circle"
        title="Garantía SPAZIO"
        subtitle="Canje seguro y confiable"
        variant="success" />
      <FeatureCard
        icon="pi pi-truck"
        title="Entrega a tiempo"
        subtitle="Directo a tu puerta"
        variant="success" />
    </div>

    <!-- Catálogo de productos -->
    <div class="mx-4 md:mx-20">
      <h2 class="mb-6 text-2xl font-bold">Premios al Vuelo</h2>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
        <ProductCard
          v-for="product in products"
          :image="product.image"
          :title="product.name"
          :price="product.price"
          :sales="product.sales"
          variant="buy" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from '@/components/commercial/Banner.vue';
import FeatureCard from '@/components/commercial/FeatureCard.vue';
import ProductCard from '@/components/commercial/ProductCard.vue';

// Datos de prueba para el catálogo
const products = [
  {
    name: 'Tableta Teclast T40Air 2024',
    price: 13500,
    sales: 43,
    image: 'product-1.jpg',
  },
  {
    name: 'Smartwatch Xiaomi Mi Band 6',
    price: 3500,
    sales: 12,
    image: 'product-2.jpg',
  },
  {
    name: 'Audífonos inalámbricos Sony WH-1000XM4',
    price: 7500,
    sales: 23,
    image: 'product-3.jpg',
  },
  {
    name: 'Cámara Canon EOS R5',
    price: 25000,
    sales: 5,
    image: 'product-4.jpg',
  },
  {
    name: 'Tableta Teclast T40Air 2024',
    price: 13500,
    sales: 43,
    image: 'product-1.jpg',
  },
  {
    name: 'Smartwatch Xiaomi Mi Band 6',
    price: 3500,
    sales: 12,
    image: 'product-2.jpg',
  },
  {
    name: 'Audífonos inalámbricos Sony WH-1000XM4',
    price: 7500,
    sales: 23,
    image: 'product-3.jpg',
  },
  {
    name: 'Cámara Canon EOS R5',
    price: 25000,
    sales: 5,
    image: 'product-4.jpg',
  },
  {
    name: 'Tableta Teclast T40Air 2024',
    price: 13500,
    sales: 43,
    image: 'product-1.jpg',
  },
  {
    name: 'Smartwatch Xiaomi Mi Band 6',
    price: 3500,
    sales: 12,
    image: 'product-2.jpg',
  },
  {
    name: 'Audífonos inalámbricos Sony WH-1000XM4',
    price: 7500,
    sales: 23,
    image: 'product-3.jpg',
  },
  {
    name: 'Cámara Canon EOS R5',
    price: 25000,
    sales: 5,
    image: 'product-4.jpg',
  },
  {
    name: 'Tableta Teclast T40Air 2024',
    price: 13500,
    sales: 43,
    image: 'product-1.jpg',
  },
  {
    name: 'Smartwatch Xiaomi Mi Band 6',
    price: 3500,
    sales: 12,
    image: 'product-2.jpg',
  },
  {
    name: 'Audífonos inalámbricos Sony WH-1000XM4',
    price: 7500,
    sales: 23,
    image: 'product-3.jpg',
  },
  {
    name: 'Cámara Canon EOS R5',
    price: 25000,
    sales: 5,
    image: 'product-4.jpg',
  },
  {
    name: 'Tableta Teclast T40Air 2024',
    price: 13500,
    sales: 43,
    image: 'product-1.jpg',
  },
  {
    name: 'Smartwatch Xiaomi Mi Band 6',
    price: 3500,
    sales: 12,
    image: 'product-2.jpg',
  },
  {
    name: 'Audífonos inalámbricos Sony WH-1000XM4',
    price: 7500,
    sales: 23,
    image: 'product-3.jpg',
  },
  {
    name: 'Cámara Canon EOS R5',
    price: 25000,
    sales: 5,
    image: 'product-4.jpg',
  },
  {
    name: 'Tableta Teclast T40Air 2024',
    price: 13500,
    sales: 43,
    image: 'product-1.jpg',
  },
  {
    name: 'Smartwatch Xiaomi Mi Band 6',
    price: 3500,
    sales: 12,
    image: 'product-2.jpg',
  },
  {
    name: 'Audífonos inalámbricos Sony WH-1000XM4',
    price: 7500,
    sales: 23,
    image: 'product-3.jpg',
  },
  {
    name: 'Cámara Canon EOS R5',
    price: 25000,
    sales: 5,
    image: 'product-4.jpg',
  },
  {
    name: 'Tableta Teclast T40Air 2024',
    price: 13500,
    sales: 43,
    image: 'product-1.jpg',
  },
  {
    name: 'Smartwatch Xiaomi Mi Band 6',
    price: 3500,
    sales: 12,
    image: 'product-2.jpg',
  },
  {
    name: 'Audífonos inalámbricos Sony WH-1000XM4',
    price: 7500,
    sales: 23,
    image: 'product-3.jpg',
  },
  {
    name: 'Cámara Canon EOS R5',
    price: 25000,
    sales: 5,
    image: 'product-4.jpg',
  },
  {
    name: 'Tableta Teclast T40Air 2024',
    price: 13500,
    sales: 43,
    image: 'product-1.jpg',
  },
  {
    name: 'Smartwatch Xiaomi Mi Band 6',
    price: 3500,
    sales: 12,
    image: 'product-2.jpg',
  },
  {
    name: 'Audífonos inalámbricos Sony WH-1000XM4',
    price: 7500,
    sales: 23,
    image: 'product-3.jpg',
  },
  {
    name: 'Cámara Canon EOS R5',
    price: 25000,
    sales: 5,
    image: 'product-4.jpg',
  },
];
</script>

<style scoped></style>
