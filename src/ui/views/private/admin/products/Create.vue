<template>
  <!-- Header con título y botón -->
  <div class="mb-4 flex items-center justify-between">
    <h2 class="text-2xl font-semibold">Agregar Producto</h2>
  </div>

  <div class="card mx-auto">
    <Form
      :initialValues="initialValues"
      :resolver="resolver"
      class="grid grid-cols-2 gap-4"
      @submit="onFormSubmit">
      <!-- Nombre -->
      <FormField
        v-slot="$field"
        name="name"
        :resolver="zodResolver(z.string().min(1, { message: 'El nombre es requerido' }))"
        class="flex flex-col gap-1">
        <FloatLabel variant="on">
          <InputText
            id="name"
            v-model="formData.name" />
          <label for="name">Nombre</label>
        </FloatLabel>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <!-- URL de imagen -->
      <FormField
        v-slot="$field"
        name="imageURL"
        :resolver="zodResolver(z.string().url({ message: 'URL de imagen inválida' }))"
        class="flex flex-col gap-1">
        <FloatLabel variant="on">
          <InputText
            id="imageURL"
            v-model="formData.imageURL" />
          <label for="imageURL">URL de imagen</label>
        </FloatLabel>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <!-- Descripción -->
      <FormField
        v-slot="$field"
        name="description"
        :resolver="zodResolver(z.string().min(1, { message: 'La descripción es requerida' }))"
        class="flex flex-col gap-1">
        <FloatLabel variant="on">
          <Textarea
            id="description"
            v-model="formData.description" />
          <label for="description">Descripción</label>
        </FloatLabel>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <!-- Precio de compra -->
      <FormField
        v-slot="$field"
        name="purchasePrice"
        :resolver="zodResolver(z.number().min(0, { message: 'El precio debe ser mayor a 0' }))"
        class="flex flex-col gap-1">
        <FloatLabel variant="on">
          <InputNumber
            id="purchasePrice"
            v-model="formData.purchasePrice"
            mode="currency"
            currency="USD" />
          <label for="purchasePrice">Precio de compra</label>
        </FloatLabel>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <!-- Precio de venta -->
      <FormField
        v-slot="$field"
        name="salePrice"
        :resolver="zodResolver(z.number().min(0, { message: 'El precio debe ser mayor a 0' }))"
        class="flex flex-col gap-1">
        <FloatLabel variant="on">
          <InputNumber
            id="salePrice"
            v-model="formData.salePrice"
            mode="currency"
            currency="USD" />
          <label for="salePrice">Precio de venta</label>
        </FloatLabel>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <!-- Tipo -->
      <FormField
        v-slot="$field"
        name="type"
        :resolver="zodResolver(z.string().min(1, { message: 'El tipo es requerido' }))"
        class="flex flex-col gap-1">
        <FloatLabel variant="on">
          <Dropdown
            id="type"
            v-model="formData.type"
            :options="typeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Seleccione un tipo" />
        </FloatLabel>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <!-- Estado -->
      <FormField
        v-slot="$field"
        name="status"
        class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <Checkbox
            id="status"
            v-model="formData.status"
            :binary="true" />
          <label for="status">Activo</label>
        </div>
      </FormField>

      <PButton
        type="submit"
        severity="secondary"
        label="Guardar" />
    </Form>
  </div>
</template>

<script setup>
import { InputText, Button as PButton, Textarea, Message, FloatLabel, InputNumber, Dropdown, Checkbox } from 'primevue';
import { reactive } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const formData = reactive({
  name: '',
  imageURL: '',
  description: '',
  purchasePrice: 0,
  salePrice: 0,
  type: '',
  status: true,
  orders: 0,
  ratio: 0
});

const typeOptions = [
  { label: 'General', value: 'General' },
  { label: 'Electrónico', value: 'Electrónico' },
  { label: 'Ropa', value: 'Ropa' },
  { label: 'Hogar', value: 'Hogar' }
];

const resolver = zodResolver(
  z.object({
    name: z.string().min(1, { message: 'El nombre es requerido' }),
    imageURL: z.string().url({ message: 'URL de imagen inválida' }),
    description: z.string().min(1, { message: 'La descripción es requerida' }),
    purchasePrice: z.number().min(0, { message: 'El precio debe ser mayor a 0' }),
    salePrice: z.number().min(0, { message: 'El precio debe ser mayor a 0' }),
    type: z.string().min(1, { message: 'El tipo es requerido' }),
    status: z.boolean()
  })
);

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Producto guardado correctamente', life: 3000 });
    // logica para guardar el producto
  }
};
</script>
