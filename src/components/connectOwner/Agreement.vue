<template>
  <div class="mb-4 grid grid-cols-1 gap-10 md:grid-cols-2">
    <div class="space-y-8">
      <h1 class="text-2xl font-bold text-primary">Tu arriendo está casi listo!</h1>

      <p class="text-sm">
        ¡Felicidades! Ya tienes un acuerdo con el propietario del inmueble. Ahora, solo queda formalizarlo en Spazio
        para gestionar el contrato y los pagos de manera segura y organizada.
      </p>

      <p class="text-sm">
        Comparte este código QR con el propietario para que lo escanee y confirme el acuerdo en la plataforma. También
        puedes copiar el enlace y enviárselo por WhatsApp, correo electrónico o mensaje para completar el proceso.
      </p>

      <div class="space-y-4">
        <p class="text-sm">
          Una vez que el propietario acepte, podrán firmar el contrato y comenzar la gestión del arriendo en Spazio,
          incluyendo los pagos y la documentación.
        </p>
      </div>
    </div>

    <div class="my-4 flex flex-col space-y-4 md:space-x-4">
      <!-- Código QR -->
      <div class="flex justify-center">
        <div class="rounded-lg border bg-white p-4 shadow-sm">
          <i
            class="pi pi-qrcode"
            style="font-size: 15rem"></i>
        </div>
      </div>
      <!-- Sección del enlace -->
      <InputGroup class="!mx-0">
        <InputText
          v-model="link"
          readonly
          size="small" />
        <InputGroupAddon>
          <Button
            icon="pi pi-copy"
            severity="secondary"
            @click="copyLink" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button, InputGroup, InputText, InputGroupAddon } from 'primevue';

const link = ref('https://spazio.com.ec/connect/ABC123');
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(link.value);
    alert('Enlace copiado al portapapeles');
  } catch (err) {
    console.error('Error al copiar el enlace: ', err);
  }
};
</script>
