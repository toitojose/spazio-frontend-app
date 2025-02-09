<template>
  <div class="banner">
    <div class="w-50% flex flex-col items-center justify-center justify-items-center">
      <h1 class="mb-4 text-2xl lg:text-4xl"><span class="font-bold">¡Vive el Carnaval</span> con SPAZIO!</h1>
      <div class="offer">
        <span class="text-xs">Hasta</span>
        <span class="text-3xl font-bold">50%</span>
        <span class="text-xs">desc.</span>
      </div>
      <Button
        label="Ver Ofertas"
        class="mt-4 rounded-full bg-primary px-6 py-2 text-white shadow-md" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
</script>

<style scoped>
.banner {
  background-image: url('/img/banners/carnaval/carnaval-2.jpg');
  @apply flex flex-col items-center justify-between bg-cover bg-right-bottom bg-no-repeat px-8 pb-6 pt-20 text-center md:bg-auto lg:flex-row lg:text-left;
}
.banner .offer {
  @apply flex h-32 w-32 flex-col justify-center justify-items-center bg-cover bg-no-repeat px-4 py-6 text-white;
  background-image: url('/img/banners/carnaval/promo-bg.svg');
}
.banner .offer span {
  text-align: center;
}
</style>
