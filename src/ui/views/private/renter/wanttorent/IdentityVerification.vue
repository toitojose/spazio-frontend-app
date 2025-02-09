<template>
  <ProcessLayout :current-step="2">
    <div class="space-y-6">
      <div class="space-y-4">
        <!-- Título -->
        <h2 class="mb-2 text-center text-2xl font-semibold"> Verifica tu identidad de manera rápida y segura </h2>

        <!-- Bienvenida -->
        <p class="text-center text-gray-600">
          Para garantizar la confianza entre inquilinos y propietarios, necesitamos validar tu identidad.
          <br />
          Sube tu foto, una imagen de tu cédula y completa tu número de documento. <br />
          Este proceso es 100% seguro.
        </p>
      </div>

      <div class="flex flex-col-reverse lg:flex-row lg:space-x-6">
        <div class="mx-auto flex flex-col space-y-8 lg:w-2/3">
          <!-- Subir Foto Personal -->
          <div>
            <label class="mb-2 block text-sm font-medium">Foto Personal</label>
            <div
              class="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 transition hover:border-gray-400">
              <FileUpload
                choose-label="Seleccionar tu foto"
                mode="basic"
                customUpload
                auto
                severity="secondary"
                class="p-button-outlined mb-4"
                @select="onFileSelect" />
              <p class="text-center text-xs">Sube tu foto personal en formato PNG, JPG. Tamaño máximo: 5 MB.</p>
              <img
                v-if="user.photoSrc"
                :src="user.photoSrc"
                alt="Foto personal"
                class="mt-4 w-48 rounded-xl shadow-md" />
            </div>
          </div>

          <!-- Subir Foto de Cédula -->
          <div>
            <label class="mb-2 block text-sm font-medium">Foto de Cédula (solo el frente)</label>
            <div
              class="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 transition hover:border-gray-400">
              <FileUpload
                choose-label="Selecciona tu cedula"
                mode="basic"
                customUpload
                auto
                severity="secondary"
                class="p-button-outlined mb-4"
                @select="onIdFileSelect" />
              <p class="text-center text-xs"
                >Sube la foto del frente de tu cédula en formato PNG, JPG o PDF. Tamaño máximo: 5 MB.</p
              >
            </div>
          </div>

          <!-- Cédula de Identidad -->
          <div class="w-full">
            <FloatLabel>
              <InputText
                id="dni"
                v-model="user.dni"
                size="small"
                class="w-full"
                @update:modelValue="handleOnCompleted" />
              <label for="dni">Cédula de Identidad</label>
            </FloatLabel>
          </div>
        </div>
        <!-- Razones para validar identidad -->
        <Message
          severity="info"
          class="mb-4 items-start lg:mb-0 lg:w-1/3">
          <h3 class="mb-4 text-sm font-semibold">¿Por qué necesitamos validar tu identidad?</h3>

          <ul class="ml-4 list-disc space-y-2 text-xs">
            <li> Garantizamos que eres una persona real, aumentando la confianza entre inquilinos y propietarios. </li>
            <li>Tu perfil validado mejora tu reputación</li>
            <li> Una vez validada tu identidad, no tendrás que repetir este proceso en el futuro.</li>
          </ul>
        </Message>
      </div>
    </div>
  </ProcessLayout>
</template>
<script setup lang="ts">
import ProcessLayout from '@/layout/renter/ProcessLayout.vue';
import { FileUpload, FloatLabel, InputText, Message } from 'primevue';
import { ref } from 'vue';
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';

const user = ref({
  photoSrc: null,
  dni: '',
  firstName: '',
  secondName: '',
  firstLastName: '',
  secondLastName: '',
  phone: '',
  landline: '',
  email: '',
});
const onFileSelect = (event: any): void => {
  const file = event.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      user.value.photoSrc = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const onIdFileSelect = (event: any): void => {
  // Manejo de los archivos de la cédula
  console.log('Archivos de cédula seleccionados:', event.files);
};

const renterProgressStore = useRenterProgressStore();
const handleOnCompleted = (value: string) => {
  renterProgressStore.markStepCompleted(2, value);
};
</script>
<style scoped></style>
