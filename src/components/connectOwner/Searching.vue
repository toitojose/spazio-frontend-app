<template>
  <div class="mb-4 grid grid-cols-1 gap-10 md:grid-cols-2">
    <div class="space-y-8">
      <h1 class="text-2xl font-bold text-primary">¡Todo listo para avanzar!</h1>
      <p class=""> Ahora, solo queda un paso más para formalizar tu arrendamiento. 🚀 </p>
      <p class="">
        Muestra este código QR a propietarios interesados para que puedan verificar tu perfil y evaluar la posibilidad
        de arrendarte un inmueble.
        <br />También puedes copiar el enlace y enviárselo a través de WhatsApp, redes sociales, correo electrónico o
        mensaje.
      </p>
      <div class="space-y-4">
        <p class="">
          Una vez que el propietario acepte tu solicitud, podrás gestionar todo el proceso dentro de Spazio.
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
