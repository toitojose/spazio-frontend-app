<template>
  <ProcessLayout
    :current-step="currentStep"
    @prevStep="handlePreviousStep"
    @nextStep="handleNextStep">
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
        <Form
          class="mx-auto flex flex-col space-y-8 lg:w-2/3"
          @submit="handleNextStep">
          <!-- Subir Foto Personal -->
          <div>
            <label class="mb-2 block text-sm font-medium">Foto Personal</label>
            <div
              class="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 transition hover:border-gray-400">
              <FileUpload
                mode="basic"
                name="file"
                :url="urlUploadIdentity('personalPhoto')"
                accept="image/*"
                :auto="true"
                chooseLabel="Subir imagen"
                @before-send="onUploadPhoto"
                @upload="onSuccess" />
              <p class="mt-3 text-center text-xs">Sube tu foto personal en formato PNG, JPG. Tamaño máximo: 5 MB.</p>
              <img
                v-if="user.personalPhotoSrc"
                :src="user.personalPhotoSrc"
                alt="Foto personal"
                class="mt-4 w-48 rounded-xl shadow-md" />
            </div>
            <p
              v-if="errors.photo"
              class="text-xs text-red-400">
              {{ errors.photo }}
            </p>
          </div>

          <!-- Subir Foto de Cédula -->
          <div>
            <label class="mb-2 block text-sm font-medium">Foto de Cédula (solo el frente)</label>
            <div
              class="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 transition hover:border-gray-400">
              <FileUpload
                mode="basic"
                name="file"
                :url="urlUploadIdentity('idCardPhoto')"
                accept="image/*"
                :auto="true"
                chooseLabel="Subir imagen"
                @before-send="onUploadPhoto"
                @upload="onSuccess" />
              <p class="mt-3 text-center text-xs">
                Sube tu foto de tu cedula en formato PNG, JPG. Tamaño máximo: 5 MB.
              </p>
              <img
                v-if="user.idCardPhotoSrc"
                :src="user.idCardPhotoSrc"
                alt="Cédula"
                class="mt-4 w-48 rounded-xl shadow-md" />
            </div>
            <p
              v-if="errors.idPhoto"
              class="text-xs text-red-400">
              {{ errors.idPhoto }}
            </p>
          </div>

          <!-- Cédula de Identidad -->
          <div class="w-full">
            <FloatLabel>
              <InputText
                id="dni"
                v-model="user.idNumber"
                size="small"
                class="w-full"
                @input="handleDniUpdate" />
              <label for="dni">Cédula de Identidad</label>
            </FloatLabel>
            <p
              v-if="errors.dni"
              class="text-xs text-red-500">
              {{ errors.dni }}
            </p>
          </div>
        </Form>
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
import { FloatLabel, InputText, Message, FileUpload } from 'primevue';
import { Form } from '@primevue/forms';
import { computed, ref } from 'vue';
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';
import router from '@/router';
import { debounce } from 'lodash';
import { backendClient } from '@/services/backend-client.ts';
import { useUserStore } from '@/store/user.ts';
import { IdentityVerificationService } from '@/services/identity-verification-service.ts';

const currentStep = 2;
const userStore = useUserStore();
const userId = computed(() => userStore.userId || null);

const renterProgressStore = useRenterProgressStore();
const identityService = new IdentityVerificationService(backendClient);

const errors = ref<{ photo?: string; idPhoto?: string; dni?: string }>({});

const user = ref({
  idNumber: '',
  personalPhotoSrc: '',
  idCardPhotoSrc: '',
});

const validateFields = () => {
  errors.value = {}; // Reiniciar errores

  if (!user.value.personalPhotoSrc) {
    errors.value.photo = 'La foto personal es obligatoria.';
  }

  if (!user.value.idCardPhotoSrc) {
    errors.value.idPhoto = 'La foto de la cédula es obligatoria.';
  }

  if (!user.value.idNumber) {
    errors.value.dni = 'El número de cédula es obligatorio.';
  }
};
const handleDniUpdate = debounce(async () => {
  if (user.value.idNumber) {
    await identityService.updateIdentity(userId.value, user.value.idNumber);
    renterProgressStore.updateStepSummary(currentStep, `${user.value.idNumber}`);
  }
}, 500);

const handlePreviousStep = () => {
  router.push('/renter/matching');
};
const handleNextStep = async () => {
  validateFields(); // Validar campos antes de proceder
  if (Object.keys(errors.value).length > 0) return;

  if (!userId.value) return;
  try {
    await identityService.updateIdentity(userId.value, user.value.idNumber);
    await router.push('/renter/general-information');
  } catch (error) {
    console.error('Error en handleNextStep:', error);
  }
};

const urlUploadIdentity = (type: 'personalPhoto' | 'idCardPhoto') => {
  if (!userId.value) return '';
  return identityService.getUploadUrl(userId.value, type);
};
const onUploadPhoto = (event: any) => {
  event.xhr.setRequestHeader('Authorization', `Bearer ${userStore.authToken}`);
};
const onSuccess = (event: any) => {
  const response = JSON.parse(event.xhr.response);
  console.log('📸 Respuesta del backend:', response); // Verificar que llega correctamente

  if (response && response.data && response.data.fileUrl && response.data.fieldName) {
    if (response.data.fieldName === 'personalPhoto') {
      user.value.personalPhotoSrc = response.data.fileUrl; // Asignar a la propiedad correcta
    } else if (response.data.fieldName === 'idCardPhoto') {
      user.value.idCardPhotoSrc = response.data.fileUrl;
    }
  }
};
</script>
<style scoped></style>
