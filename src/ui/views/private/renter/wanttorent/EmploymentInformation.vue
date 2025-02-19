<template>
  <ProcessLayout :current-step="currentStep">
    <div class="space-y-6">
      <div class="space-y-4">
        <!-- Título -->
        <h2 class="mb-2 text-center text-2xl font-semibold"> Completa tu información laboral </h2>

        <!-- Bienvenida -->
        <p class="text-center text-gray-600"> Cuéntanos un poco sobre tu actividad laboral. </p>
      </div>
      <div class="flex flex-col-reverse lg:flex-row lg:space-x-6">
        <Form
          class="flex flex-col space-y-6"
          @submit="onFormSubmit">
          <!-- Nombre de la Empresa -->
          <div class="flex items-center gap-4">
            <label
              for="companyName"
              class="w-1/4 text-right text-xs font-medium"
              >Nombre de la Empresa</label
            >
            <InputText
              id="companyName"
              v-model="user.companyName"
              name="companyName"
              placeholder="Nombre de la Empresa"
              size="small"
              class="w-3/4" />
          </div>

          <!-- Dirección de la Empresa -->
          <div class="flex items-center gap-4">
            <label
              for="companyAddress"
              class="w-1/4 text-right text-xs font-medium"
              >Dirección</label
            >
            <InputText
              id="companyAddress"
              v-model="user.companyAddress"
              name="companyAddress"
              placeholder="Dirección de la Empresa (Opcional)"
              size="small"
              class="w-3/4" />
          </div>

          <!-- Teléfono de la Empresa -->
          <div class="flex items-center gap-4">
            <label
              for="companyPhone"
              class="w-1/4 text-right text-xs font-medium"
              >Teléfono</label
            >
            <InputText
              id="companyPhone"
              v-model="user.companyPhone"
              name="companyPhone"
              placeholder="Teléfono de la Empresa (Opcional)"
              size="small"
              class="w-3/4" />
          </div>

          <!-- Cargo o Puesto Actual -->
          <div class="flex items-center gap-4">
            <label
              for="jobTitle"
              class="w-1/4 text-right text-xs font-medium"
              >Cargo</label
            >
            <InputText
              id="jobTitle"
              v-model="user.jobTitle"
              name="jobTitle"
              placeholder="Cargo o Puesto Actual"
              size="small"
              class="w-3/4" />
          </div>

          <!-- Fecha de Inicio -->
          <div class="flex items-center gap-4">
            <label
              for="startDate"
              class="w-1/4 text-right text-xs font-medium"
              >Fecha de Inicio</label
            >
            <InputText
              id="startDate"
              v-model="user.startDate"
              name="startDate"
              type="date"
              placeholder="Fecha de Inicio"
              size="small"
              class="w-3/4" />
          </div>

          <!-- Tipo de Contrato -->
          <div class="flex items-center gap-4">
            <label
              for="contractType"
              class="w-1/4 text-right text-xs font-medium"
              >Tipo de Contrato</label
            >
            <Select
              id="contractType"
              v-model="user.contractType"
              name="contractType"
              :options="contractTypes"
              optionLabel="label"
              placeholder="Tipo de Contrato"
              size="small"
              class="w-3/4" />
          </div>

          <!-- Salario Mensual -->
          <div class="flex items-center gap-4">
            <label
              for="monthlySalary"
              class="w-1/4 text-right text-xs font-medium"
              >Salario Mensual</label
            >
            <InputText
              id="monthlySalary"
              v-model="user.monthlySalary"
              name="monthlySalary"
              type="number"
              placeholder="Salario Mensual"
              size="small"
              class="w-3/4" />
          </div>

          <!-- Certificado Laboral -->
          <div class="flex items-center gap-4">
            <label
              for="laborCertificate"
              class="w-1/4 text-right text-xs font-medium"
              >Certificado Laboral</label
            >
            <div
              class="flex w-3/4 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 transition hover:border-gray-400">
              <FileUpload
                id="laborCertificate"
                mode="basic"
                name="laborCertificate"
                customUpload
                auto
                choose-label="Subir Certificado"
                class="p-button-outlined mb-4" />
              <p class="text-center text-xs">Sube tu certificado laboral en formato PDF o JPG. Tamaño máximo: 5 MB.</p>
            </div>
          </div>

          <!-- Roles de Pago -->
          <div class="flex items-center gap-4">
            <label
              for="paySlips"
              class="w-1/4 text-right text-xs font-medium"
              >Roles de Pago</label
            >
            <div
              class="flex w-3/4 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 transition hover:border-gray-400">
              <FileUpload
                id="paySlips"
                mode="basic"
                name="paySlips"
                customUpload
                auto
                multiple
                choose-label="Subir Roles"
                class="p-button-outlined mb-4" />
              <p class="text-center text-xs">Sube hasta 3 roles de pago en formato PDF o JPG. Tamaño máximo: 5 MB.</p>
            </div>
          </div>
        </Form>
        <Message
          severity="info"
          class="mb-4 items-start lg:mb-0 lg:w-1/3">
          <h3 class="mb-4 text-sm font-semibold">¿Por qué solicitamos esta información?</h3>

          <ul class="ml-4 list-disc space-y-2 text-xs">
            <li>Permite verificar tu estabilidad laboral para el contrato de arriendo.</li>
            <li>Facilita la generación de confianza con el propietario del bien.</li>
            <li>La documentación asegura un proceso ágil y transparente.</li>
          </ul>
        </Message>
      </div>
    </div>
  </ProcessLayout>
</template>
<script setup lang="ts">
import ProcessLayout from '@/layout/renter/ProcessLayout.vue';
import { FileUpload, InputText, Message, Select } from 'primevue';
import { Form } from '@primevue/forms';
import { ref, watch } from 'vue';
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';

const currentStep = 4;
const contractTypes = ref([
  { label: 'Indefinido', value: 'indefinite' },
  { label: 'Fijo', value: 'fixed' },
  { label: 'Por Obra o Labor', value: 'specific' },
]);
const user = ref({
  companyName: '',
  companyAddress: '',
  companyPhone: '',
  jobTitle: '',
  startDate: '',
  contractType: '',
  monthlySalary: '',
  laborCertificate: null,
  paySlips: [],
});

const renterProgressStore = useRenterProgressStore();
const updateCompletedStep = () => {
  if (user.value.companyName && user.value.jobTitle) {
    const summary = `${user.value.companyName} - ${user.value.jobTitle}`;
    renterProgressStore.markStepCompleted(currentStep, true, summary);
  }
};

watch(() => [user.value.companyName, user.value.jobTitle], updateCompletedStep);

const onFormSubmit = (data: any): void => {
  console.log('Formulario enviado:', data);
};
</script>
<style scoped></style>
