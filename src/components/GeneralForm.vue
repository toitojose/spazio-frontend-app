<template>
  <Form
    v-slot="$form"
    :resolver="resolver"
    :initialValues="initialValues"
    class="flex flex-col space-y-6"
    @submit="submitForm">
    <!-- Nombres -->
    <div class="flex items-center gap-4">
      <label
        for="firstName"
        class="w-1/4 text-right text-xs font-medium">
        Nombres
      </label>
      <div class="grid w-full grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <InputText
            id="firstName"
            name="firstName"
            size="small"
            placeholder="Primer Nombre" />
          <Message
            v-if="$form && $form.firstName?.invalid"
            severity="error"
            size="small"
            class="text-xs"
            variant="simple">
            {{ $form.firstName.error?.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <InputText
            id="secondName"
            name="secondName"
            size="small"
            placeholder="Segundo Nombre" />
          <Message
            v-if="$form && $form.secondName?.invalid"
            severity="error"
            size="small"
            class="text-xs"
            variant="simple">
            {{ $form.secondName.error?.message }}
          </Message>
        </div>
      </div>
    </div>

    <!-- Apellidos -->
    <div class="flex items-center gap-4">
      <label
        for="firstLastName"
        class="w-1/4 text-right text-xs font-medium">
        Apellidos
      </label>
      <div class="grid w-full grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <InputText
            id="firstLastName"
            name="firstLastName"
            size="small"
            placeholder="Primer Apellido" />
          <Message
            v-if="$form && $form.firstLastName?.invalid"
            severity="error"
            size="small"
            class="text-xs"
            variant="simple">
            {{ $form.firstLastName.error?.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <InputText
            id="secondLastName"
            name="secondLastName"
            size="small"
            placeholder="Segundo Apellido" />
          <Message
            v-if="$form && $form.secondLastName?.invalid"
            severity="error"
            size="small"
            class="text-xs"
            variant="simple">
            {{ $form.secondLastName.error?.message }}
          </Message>
        </div>
      </div>
    </div>

    <!-- Teléfonos -->
    <div class="flex items-center gap-4">
      <label
        for="mobile"
        class="w-1/4 text-right text-xs font-medium">
        Teléfonos
      </label>
      <div class="grid w-full grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <InputMask
            id="mobile"
            name="mobile"
            size="small"
            mask="(09) 9999 9999"
            placeholder="(09) 9999 9999" />
          <Message
            v-if="$form && $form.mobile?.invalid"
            severity="error"
            size="small"
            class="text-xs"
            variant="simple">
            {{ $form.mobile.error?.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <InputMask
            id="landline"
            name="landline"
            size="small"
            mask="(02) 9999-999"
            placeholder="(02) 9999-999" />
          <Message
            v-if="$form && $form.landline?.invalid"
            severity="error"
            size="small"
            class="text-xs"
            variant="simple">
            {{ $form.landline.error?.message }}
          </Message>
        </div>
      </div>
    </div>

    <!-- Correo Electrónico -->
    <div class="flex items-center gap-4">
      <label
        for="email"
        class="w-1/4 text-right text-xs font-medium">
        Correo Electrónico
      </label>
      <div class="flex w-full flex-col gap-1">
        <InputText
          id="email"
          name="email"
          size="small"
          type="email"
          class="w-full"
          placeholder="Correo Electrónico" />
        <Message
          v-if="$form && $form.email?.invalid"
          severity="error"
          size="small"
          class="text-xs"
          variant="simple">
          {{ $form.email.error?.message }}
        </Message>
      </div>
    </div>

    <!-- Botón de Guardar -->
    <div class="flex w-full justify-end">
      <Button
        type="submit"
        :label="buttonText"
        :icon="buttonIcon" />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { InputText, InputMask, Button, Message } from 'primevue';
import { Form } from '@primevue/forms';
import { defineProps, defineEmits, ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from 'primevue/usetoast';
import { z } from 'zod';
import type { GeneralFormData } from '@/interfaces/user.interface.ts';

// Emitir datos al componente padre
const emit = defineEmits(['formUpdated']);

// Notificación de errores
const toast = useToast();

// Definir props
const props = defineProps({
  formType: {
    type: String,
    required: true,
    validator: (value: string) => ['renter', 'property-owner'].includes(value),
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
  userRole: {
    type: String,
    required: true,
    validator: (value: string) => ['renter', 'property-owner'].includes(value),
  },
  actionType: {
    type: String,
    required: true,
    validator: (value: string) => ['create', 'update', 'search'].includes(value),
  },
});

let buttonText = '';
let buttonIcon = '';

switch (props.actionType) {
  case 'search':
    buttonText = 'Buscar';
    buttonIcon = 'pi pi-search';
    break;
  case 'update':
    buttonText = 'Actualizar';
    buttonIcon = 'pi pi-refresh';
    break;
  default:
    buttonText = 'Guardar';
    buttonIcon = 'pi pi-save';
    break;
}
const requiredFields =
  props.userRole === 'agent'
    ? ['firstName', 'secondName', 'firstLastName', 'secondLastName', 'mobile', 'email']
    : props.userRole !== props.formType
      ? ['firstName', 'firstLastName', 'mobile', 'email']
      : ['firstName', 'secondName', 'firstLastName', 'secondLastName', 'mobile', 'email'];

const schema = z.object({
  firstName: requiredFields.includes('firstName')
    ? z.string().min(1, { message: 'Es obligatorio' })
    : z.string().optional(),
  secondName: requiredFields.includes('secondName')
    ? z.string().min(1, { message: 'Es obligatorio' })
    : z.string().optional(),
  firstLastName: requiredFields.includes('firstLastName')
    ? z.string().min(1, { message: 'Es obligatorio' })
    : z.string().optional(),
  secondLastName: requiredFields.includes('secondLastName')
    ? z.string().min(1, { message: 'Es obligatorio' })
    : z.string().optional(),
  mobile: requiredFields.includes('mobile') ? z.string().min(1, { message: 'Es obligatorio' }) : z.string().optional(),
  landline: requiredFields.includes('landline')
    ? z.string().min(1, { message: 'Es obligatorio' })
    : z.string().optional(),
  email: requiredFields.includes('email')
    ? z
        .string()
        .min(1, { message: 'Es obligatorio' })
        .email({ message: 'Ingresa un correo válido (ejemplo@correo.com).' })
    : z.string().optional(),
});
const resolver = zodResolver(schema);

// Inicializar valores del formulario
const initialValues = ref<GeneralFormData>({
  firstName: props.initialData.firstName || '',
  secondName: props.initialData.secondName || '',
  firstLastName: props.initialData.firstLastName || '',
  secondLastName: props.initialData.secondLastName || '',
  mobile: props.initialData.mobile || '',
  landline: props.initialData.landline || '',
  email: props.initialData.email || '',
});

const formData = ref<GeneralFormData>({ ...initialValues.value });

// Enviar el formulario
const submitForm = ({ valid }: { valid: boolean }) => {
  if (!valid) {
    toast.add({ severity: 'error', summary: 'Por favor, corrige los errores en el formulario.', life: 3000 });
    return;
  }

  // Emitir los datos al componente padre
  emit('formUpdated', formData.value);

  toast.add({ severity: 'success', summary: 'Formulario enviado correctamente.', life: 3000 });
};
</script>
