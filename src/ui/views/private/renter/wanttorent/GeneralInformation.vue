<template>
  <RenterProcessLayout :current-step="3">
    <div class="flex flex-col-reverse lg:flex-row lg:space-x-6">
      <Form
        v-slot="$form"
        class="flex flex-col space-y-6"
        @submit="onFormSubmit">
        <!-- Nombres -->
        <div class="flex items-center gap-4">
          <label
            for="firstName"
            class="w-1/4 text-right text-xs font-medium">
            Nombres
          </label>
          <div class="grid grid-cols-2 gap-4">
            <InputText
              id="firstName"
              v-model="user.firstName"
              size="small"
              placeholder="Primer Nombre" />
            <InputText
              id="secondName"
              v-model="user.secondName"
              size="small"
              placeholder="Segundo Nombre" />
          </div>
        </div>

        <!-- Apellidos -->
        <div class="flex items-center gap-4">
          <label
            for="firstLastName"
            class="w-1/4 text-right text-xs font-medium">
            Apellidos
          </label>
          <div class="grid grid-cols-2 gap-4">
            <InputText
              id="firstLastName"
              v-model="user.firstLastName"
              size="small"
              placeholder="Primer Apellido" />
            <InputText
              id="secondLastName"
              v-model="user.secondLastName"
              size="small"
              placeholder="Segundo Apellido" />
          </div>
        </div>

        <!-- Teléfonos -->
        <div class="flex items-center gap-4">
          <label
            for="phone"
            class="w-1/4 text-right text-xs font-medium">
            Teléfonos
          </label>
          <div class="grid grid-cols-2 gap-4">
            <InputMask
              id="phone"
              v-model="user.phone"
              size="small"
              mask="(09) 9999 9999"
              placeholder="(09) 9999 9999" />
            <InputMask
              id="landline"
              v-model="user.landline"
              size="small"
              mask="(02) 9999-999"
              placeholder="(09) 9999-999" />
          </div>
        </div>

        <!-- Correo Electrónico -->
        <div class="flex items-center gap-4">
          <label
            for="email"
            class="w-1/4 text-right text-xs font-medium">
            Correo Electrónico
          </label>
          <div class="w-full">
            <InputText
              id="email"
              v-model="user.email"
              type="email"
              size="small"
              class="w-full"
              placeholder="Correo Electrónico" />
          </div>
        </div>

        <!-- Botones -->
        <div class="flex justify-between">
          <Button
            as="router-link"
            size="small"
            label="Anterior"
            severity="secondary"
            to="/renter/identity-verification" />
          <Button
            as="router-link"
            size="small"
            label="Siguiente"
            to="/renter/employment-information" />
        </div>
      </Form>
      <Message
        severity="info"
        class="mb-4 items-start lg:mb-0 lg:w-1/3">
        <h3 class="mb-4 text-sm font-semibold">¿Por qué solicitamos esta información?</h3>

        <ul class="ml-4 list-disc space-y-2 text-xs">
          <li>Esta información será utilizada para generar el contrato de arriendo de manera automática.</li>
          <li>Facilita el proceso legal y administrativo del arrendamiento.</li>
          <li>Garantiza que los datos estén completos y correctos para ambas partes.</li>
        </ul>
      </Message>
    </div>
  </RenterProcessLayout>
</template>

<script setup lang="ts">
import RenterProcessLayout from '@/layout/renter/RenterProcessLayout.vue';
import { Button, InputMask, InputText, Message } from 'primevue';
import { Form } from '@primevue/forms';
import { ref } from 'vue';

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

const onFormSubmit = (data: any): void => {
  console.log('Formulario enviado:', data);
};
</script>

<style scoped></style>
