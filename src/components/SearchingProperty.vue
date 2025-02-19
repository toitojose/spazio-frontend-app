<template>
  <div>
    <h4 class="mb-2 text-lg font-bold">Estoy buscando un inmueble</h4>
    <p class="text-sm">
      Explora opciones para encontrar tu próximo espacio.<br />
      Una vez que encuentres el lugar ideal y acuerdes con el propietario, regresa a esta página para copiar el enlace
      mágico o compartir el código QR y conecta rápidamente con el propietario
    </p>
    <div class="flex space-x-4">
      <div class="mt-4 flex flex-col space-y-2 md:space-y-2">
        <!-- Inmobiliarias -->
        <div
          class="flex cursor-pointer items-start space-x-4 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-lg"
          @click="openDialog('realEstate')">
          <div class="icon flex items-center justify-center text-secondary">
            <i
              class="pi pi-home"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-md mb-1 font-bold">Inmobiliarias</h3>
            <p class="text-xs"
              >Consulta nuestra lista de inmobiliarias asociadas para ayudarte a encontrar tu espacio ideal.</p
            >
          </div>
        </div>

        <!-- Contacto con Spazio -->
        <div
          class="flex cursor-pointer items-start space-x-4 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-lg"
          @click="openDialog('contact')">
          <div class="icon flex items-center justify-center text-secondary">
            <i
              class="pi pi-envelope"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-md mb-1 font-bold">Contáctanos</h3>
            <p class="text-xs">Envíanos un mensaje y un asesor de Spazio estará listo para ayudarte en tu búsqueda.</p>
          </div>
        </div>

        <!-- Visitar otras webs -->
        <div
          class="flex cursor-pointer items-start space-x-4 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-lg"
          @click="openDialog('otherWebsites')">
          <div class="icon flex items-center justify-center text-secondary">
            <i
              class="pi pi-globe"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-md mb-1 font-bold">Otras opciones</h3>
            <p class="text-xs"> Explora las mejores opciones en línea para encontrar el espacio ideal que buscas. </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center space-y-4 rounded-lg border bg-gray-50 p-4 shadow-md">
        <h3 class="text-md text-center font-bold">¡Comparte con el propietario!</h3>
        <p class="text-center text-xs">
          Una vez que encuentres tu próximo espacio, comparte este enlace o muestra el código QR al propietario para que
          continúe el proceso.
        </p>

        <!-- Código QR -->
        <div> QR CODE </div>

        <!-- Enlace Mágico -->
        <div class="flex flex-col items-center space-y-2">
          <input
            type="text"
            readonly
            value="https://spazio.app/magic-link"
            class="w-full rounded-lg border p-2 text-center text-xs" />
          <button
            class="hover:text-primary-dark text-xs text-primary underline"
            @click="copyToClipboard('https://spazio.app/magic-link')">
            Copiar Enlace
          </button>
        </div>
      </div>
    </div>

    <!-- Diálogo General -->
    <Dialog
      v-model:visible="visible"
      :style="{ width: '50rem' }"
      modal
      class="!text-gray-700"
      :dismissableMask="true"
      :header="dialogHeader">
      <template v-if="dialogType === 'realEstate'">
        <RealEstateList />
      </template>
      <template v-else-if="dialogType === 'contact'">
        <ContactInfo />
      </template>
      <template v-else-if="dialogType === 'otherWebsites'">
        <WebSearchList />
      </template>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import WebSearchList from '@/components/WebSearchList.vue';
import { Dialog } from 'primevue';
import ContactInfo from '@/components/ContactInfo.vue';
import RealEstateList from '@/components/realEstate/RealEstateList.vue';
import { computed, ref } from 'vue';

// Estado para el diálogo activo
const visible = ref(false);
const dialogType = ref<string | null>(null);

// Header dinámico basado en el tipo de diálogo
const dialogHeader = computed(() => {
  switch (dialogType.value) {
    case 'realEstate':
      return 'Inmobiliarias Asociadas';
    case 'contact':
      return 'Contáctanos';
    case 'otherWebsites':
      return 'Otras Páginas Web';
    default:
      return '';
  }
});

// Mostrar el diálogo correspondiente
function openDialog(type: string) {
  dialogType.value = type;
  visible.value = true;
}
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
</script>
<style scoped></style>
