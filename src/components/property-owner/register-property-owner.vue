<template>
  <Form>
    <div class="space-y-4">
      <p-input-text
        v-model="ownerIdentification.cedula"
        label="Cédula del propietario"
        class="w-full"
        placeholder="Ingrese la cédula del propietario" />
      <p-input-text
        v-model="ownerIdentification.email"
        label="Correo electrónico del propietario"
        class="w-full"
        placeholder="Ingrese el correo del propietario" />
      <p-button
        label="Buscar Propietario"
        icon="pi pi-search"
        class="p-button-primary"
        @click="searchOwner" />
    </div>
  </Form>
</template>
<script setup lang="ts">
import { Form } from '@primevue/forms';
</script>

<style scoped></style>
