<template>
  <div>
    <h2 class="mb-4 text-center text-xl font-bold">Encuentra al Agente Perfecto para Tu Nuevo Hogar</h2>
    <p class="mb-8 text-center text-sm">
      Conéctate con las mejores inmobiliarias y asesores para encontrar el lugar ideal para vivir.
    </p>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div
        v-for="agency in agencies"
        :key="agency.id"
        class="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md">
        <div class="flex flex-col items-center space-y-1">
          <img
            :src="agency.logo"
            :alt="agency.name"
            class="w-20 object-contain" />
          <Button
            size="small"
            label="Contactar"
            class="text-xs"
            variant="outlined"
            @click="contactAgency(agency.id)" />
        </div>
        <div class="flex flex-col text-right">
          <span class="block text-lg font-bold leading-none text-primary">{{ agency.available }}</span>
          <span class="text-xs">Disponibles</span>
        </div>
      </div>
    </div>
    <div class="mt-8 text-center">
      <p class="text-sm">¿Tu inmobiliaria puede estar aquí?... ¡GRATIS!</p>
      <Button
        label="Contáctanos Ahora"
        class="p-button-primary mt-2"
        @click="contactUs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';

const agencies = ref([
  {
    id: 1,
    name: 'RE/MAX',
    logo: new URL('@/assets/svg/remax.svg', import.meta.url).href,
    contactText: 'Contacta a REMAX',
    available: 105,
    buttonText: 'Contactar',
  },
  {
    id: 2,
    name: 'Century 21',
    logo: new URL('@/assets/svg/century21.svg', import.meta.url).href,
    contactText: 'Contacta a Century 21',
    available: 65,
    buttonText: 'Contactar',
  },
  {
    id: 3,
    name: 'Paúl Lucero',
    logo: new URL('@/assets/img/logo_gea-inmobiliaria.png', import.meta.url).href,
    contactText: 'Contacta a Paúl Lucero',
    available: 13,
    buttonText: 'Contactar',
  },
  {
    id: 4,
    name: 'Urbaníssimo',
    logo: new URL('@/assets/img/urbanissimo.png', import.meta.url).href,
    contactText: 'Contacta a Urbaníssimo',
    available: 5,
    buttonText: 'Contactar',
  },
]);

function contactAgency(id: number) {
  console.log(`Contactando a la agencia con ID: ${id}`);
}

function contactUs() {
  console.log('Formulario de contacto abierto');
}
</script>

<style scoped></style>
