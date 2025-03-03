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
            id="middleName"
            name="middleName"
            size="small"
            placeholder="Segundo Nombre" />
          <Message
            v-if="$form && $form.middleName?.invalid"
            severity="error"
            size="small"
            class="text-xs"
            variant="simple">
            {{ $form.middleName.error?.message }}
          </Message>
        </div>
      </div>
    </div>

    <!-- Apellidos -->
    <div class="flex items-center gap-4">
      <label
        for="lastName"
        class="w-1/4 text-right text-xs font-medium">
        Apellidos
      </label>
      <div class="grid w-full grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <InputText
            id="lastName"
            name="lastName"
            size="small"
            placeholder="Primer Apellido" />
          <Message
            v-if="$form && $form.lastName?.invalid"
            severity="error"
            size="small"
            class="text-xs"
            variant="simple">
            {{ $form.lastName.error?.message }}
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
        Información general
      </label>
      <div class="grid w-full grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
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
        <div class="flex flex-col gap-1">
          <InputText
            id="idNumber"
            name="idNumber"
            size="small"
            type="text"
            class="w-full"
            placeholder="Cedula identidad" />
          <Message
            v-if="$form && $form.idNumber?.invalid"
            severity="error"
            size="small"
            class="text-xs"
            variant="simple">
            {{ $form.idNumber.error?.message }}
          </Message>
        </div>
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
import type { RolesEnum } from '@/enums/roles.enum.ts';

// Emitir datos al componente padre
const emit = defineEmits(['formUpdated']);

// Notificación de errores
const toast = useToast();

// Definir props
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
  formType: {
    type: String,
    required: true,
    validator: (value: string) => ['renter', 'property-owner'].includes(value),
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
    ? ['firstName', 'middleName', 'lastName', 'secondLastName', 'mobile', 'email', 'idNumber']
    : props.userRole !== props.formType
      ? ['firstName', 'lastName', 'mobile', 'email']
      : ['firstName', 'middleName', 'lastName', 'secondLastName', 'mobile', 'email', 'idNumber'];

const schema = z.object({
  firstName: requiredFields.includes('firstName')
    ? z.string().min(1, { message: 'Es obligatorio' })
    : z.string().optional(),
  middleName: requiredFields.includes('middleName')
    ? z.string().min(1, { message: 'Es obligatorio' })
    : z.string().optional(),
  lastName: requiredFields.includes('lastName')
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
  middleName: props.initialData.middleName || '',
  lastName: props.initialData.lastName || '',
  secondLastName: props.initialData.secondLastName || '',
  idNumber: props.initialData.idNumber || '',
  mobile: props.initialData.mobile || '',
  landline: props.initialData.landline || '',
  email: props.initialData.email || '',
  roleType: props.formType as RolesEnum,
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
