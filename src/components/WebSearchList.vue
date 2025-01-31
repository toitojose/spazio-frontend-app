<template>
  <div>
    <h2 class="mb-4 text-center text-xl font-bold">Encuentra Opciones en Línea para Tu Nuevo Hogar</h2>
    <p class="mb-8 text-center text-sm">
      Explora las mejores opciones en línea para encontrar el espacio ideal que buscas.
    </p>
    <Message
      size="small"
      icon="pi pi-info-circle"
      class="mx-10 mb-4">
      No olvides regresar a <strong>SPAZIO</strong> cuando encuentres tu nuevo hogar para que podamos ayudarte con el
      con el proceso de arrendamiento.
    </Message>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div
        class="flex items-center justify-between space-x-2 rounded-lg border p-4 shadow-sm transition hover:shadow-md">
        <img
          src="/public/img/web-search-properties/marketplace.png"
          alt="Facebook Marketplace"
          class="w-20 object-contain" />
        <div class="flex flex-col space-y-1">
          <span class="text-md block font-bold leading-none text-primary">Facebook Marketplace</span>
          <span class="text-xs">Encuentra cientos de bienes aquí</span>
          <Button
            as="router-link"
            size="small"
            label="Visitar"
            class="text-xs"
            variant="outlined"
            to="https://www.facebook.com/marketplace/category/propertyrentals" />
        </div>
      </div>
      <div
        class="flex items-center justify-between space-x-2 rounded-lg border border-dashed p-4 shadow-sm transition hover:shadow-md">
        <i
          class="pi pi-question-circle"
          style="font-size: 3rem"></i>
        <div class="flex flex-col space-y-2">
          <span class="text-md block font-bold leading-none text-gray-700">Tu buscador puede estar aquí</span>
          <span class="text-xs">¡Contáctanos ahora!</span>
          <Button
            size="small"
            label="Contactar"
            class="text-xs"
            variant="outlined"
            @click="showContactInfo" />
        </div>
      </div>
    </div>
    <ContactInfo
      v-show="showContact"
      class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import { Button, Message } from 'primevue';
import { ref } from 'vue';
import ContactInfo from '@/components/ContactInfo.vue';

const showContact = ref(false);
function showContactInfo() {
  showContact.value = true;
}
</script>

<style scoped></style>
