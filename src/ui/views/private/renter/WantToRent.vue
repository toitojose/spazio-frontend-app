<template>
  <div class="mx-auto w-full max-w-4xl pb-10 pt-24">
    <Stepper
      v-model:activeIndex="activeStep"
      class="wanttorent-stepper"
      orientation="vertical">
      <!-- Step 0: Quierés arrendar? -->
      <StepItem value="0">
        <Step>Quieres arrendar?</Step>
        <StepPanel>
          <Card>
            <template #content>
              <div class="space-y-8 p-4">
                <div>
                  <!-- Título -->
                  <h2 class="mb-2 text-center text-2xl font-semibold">
                    Comienza tu proceso de arriendo fácil y seguro.
                  </h2>

                  <!-- Bienvenida -->
                  <p class="text-center text-gray-600">
                    Este proceso nos ayuda a garantizar la confianza entre inquilinos y propietarios. <br />
                    Llena los campos solicitados para arrendar. Es muy rápido y seguro.
                  </p>
                </div>

                <!-- Beneficios -->
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div
                    v-for="benefit in benefits"
                    :key="benefit.title"
                    class="flex items-start space-x-4 rounded-lg border bg-primary-50 p-4 shadow-sm transition hover:bg-white hover:shadow-lg">
                    <!-- Icono -->
                    <div class="icon flex items-center justify-center text-secondary">
                      <i
                        class="pi"
                        :class="benefit.icon"
                        style="font-size: 1.5rem"></i>
                    </div>

                    <!-- Contenido del beneficio -->
                    <div>
                      <h3 class="text-md mb-1 font-bold">{{ benefit.title }}</h3>
                      <p class="text-xs">{{ benefit.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </StepPanel>
      </StepItem>

      <!-- Step 1: Validación de Identidad -->
      <StepItem value="1">
        <Step>Valida tu Identidad</Step>
        <StepPanel>
          <Card>
            <template #content>
              <div class="flex space-x-6">
                <div class="mx-auto flex w-2/3 flex-col space-y-6">
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
                  <div class="mt-2 w-full">
                    <FloatLabel>
                      <InputText
                        id="dni"
                        v-model="user.dni"
                        size="small"
                        class="w-full" />
                      <label for="dni">Cédula de Identidad</label>
                    </FloatLabel>
                  </div>

                  <!-- Botón Siguiente -->
                  <Button
                    size="small"
                    label="Siguiente"
                    class="self-end"
                    @click="goToStep(1)" />
                </div>
                <!-- Razones para validar identidad -->
                <Message
                  severity="info"
                  class="w-1/3 items-start">
                  <h3 class="mb-4 text-sm font-semibold">¿Por qué necesitamos validar tu identidad?</h3>

                  <ul class="ml-4 list-disc space-y-2 text-xs">
                    <li>
                      Garantizamos que eres una persona real, aumentando la confianza entre inquilinos y propietarios.
                    </li>
                    <li>Tu perfil validado mejora tu reputación</li>
                    <li> Una vez validada tu identidad, no tendrás que repetir este proceso en el futuro.</li>
                  </ul>
                </Message>
              </div>
            </template>
          </Card>
        </StepPanel>
      </StepItem>

      <!-- Step 2: Información general -->
      <StepItem value="2">
        <Step>Información general</Step>
        <StepPanel>
          <Card>
            <template #content>
              <div class="flex space-x-6">
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
                      size="small"
                      label="Anterior"
                      severity="secondary"
                      @click="goToStep(0)" />
                    <Button
                      size="small"
                      label="Siguiente"
                      type="submit" />
                  </div>
                </Form>
                <!-- Razones para validar identidad -->
                <Message
                  severity="info"
                  class="w-1/3 items-start">
                  <h3 class="mb-4 text-sm font-semibold">¿Por qué solicitamos esta información?</h3>

                  <ul class="ml-4 list-disc space-y-2 text-xs">
                    <li>Esta información será utilizada para generar el contrato de arriendo de manera automática.</li>
                    <li>Facilita el proceso legal y administrativo del arrendamiento.</li>
                    <li>Garantiza que los datos estén completos y correctos para ambas partes.</li>
                  </ul>
                </Message>
              </div>
            </template>
          </Card>
        </StepPanel>
      </StepItem>

      <!-- Step 3: Información Laboral -->
      <StepItem value="3">
        <Step>Información Laboral</Step>
        <StepPanel>
          <Card>
            <template #content>
              <div class="flex space-x-6">
                <Form
                  v-slot="$form"
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
                      <p class="text-center text-xs"
                        >Sube tu certificado laboral en formato PDF o JPG. Tamaño máximo: 5 MB.</p
                      >
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
                      <p class="text-center text-xs"
                        >Sube hasta 3 roles de pago en formato PDF o JPG. Tamaño máximo: 5 MB.</p
                      >
                    </div>
                  </div>

                  <!-- Botones -->
                  <div class="flex justify-between">
                    <Button
                      label="Anterior"
                      severity="secondary"
                      @click="goToStep(2)" />
                    <Button
                      label="Siguiente"
                      type="submit" />
                  </div>
                </Form>
                <Message
                  severity="info"
                  class="w-1/3 items-start">
                  <h3 class="mb-4 text-sm font-semibold">¿Por qué solicitamos esta información?</h3>

                  <ul class="ml-4 list-disc space-y-2 text-xs">
                    <li>Permite verificar tu estabilidad laboral para el contrato de arriendo.</li>
                    <li>Facilita la generación de confianza con el propietario del bien.</li>
                    <li>La documentación asegura un proceso ágil y transparente.</li>
                  </ul>
                </Message>
              </div>
            </template>
          </Card>
        </StepPanel>
      </StepItem>

      <!-- Step 3: Forma de Pago -->
      <StepItem value="4">
        <Step>Forma de Pago</Step>
        <StepPanel>
          <Card>
            <template #content>
              <div class="flex flex-col space-y-6">
                <!-- Opciones de Pago -->
                <div>
                  <label class="block text-sm font-medium">Forma de Pago</label>
                  <div :class="`grid grid-cols-1 md:grid-cols-${paymentOptions.length} mt-4 gap-6`">
                    <div
                      v-for="option in paymentOptions"
                      :key="option.value"
                      class="payments-options"
                      :class="{
                        selected: selectedPaymentOption === option.value,
                      }">
                      <RadioButton
                        v-model="selectedPaymentOption"
                        size="small"
                        :inputId="option.value"
                        :value="option.value"
                        class="absolute left-2 top-2 hover:border-gray-400" />
                      <div
                        class="flex flex-col items-center justify-center"
                        :class="{
                          'text-primary': selectedPaymentOption === option.value,
                          'text-gray-600': selectedPaymentOption !== option.value,
                        }">
                        <i
                          :class="`pi ${option.icon} mb-2 block`"
                          style="font-size: 2rem"></i>
                        <span>{{ option.label }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Botones -->
                <div class="flex justify-between">
                  <Button
                    label="Anterior"
                    severity="secondary"
                    @click="goToStep(1)" />
                  <Button
                    label="Finalizar Solicitud"
                    @click="finishProcess" />
                </div>
              </div>
            </template>
          </Card>
        </StepPanel>
      </StepItem>
    </Stepper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Stepper,
  Step,
  StepItem,
  StepPanel,
  Button,
  Card,
  FileUpload,
  InputText,
  Message,
  RadioButton,
  Select,
  FloatLabel,
  InputMask,
} from 'primevue';
import { Form } from '@primevue/forms';

const activeStep = ref<number>(0);
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

const paymentOptions = ref([
  { label: 'Tarjeta de Crédito/Débito', value: 'creditCard', icon: 'pi-credit-card' },
  { label: 'Transferencia Bancaria', value: 'bankTransfer', icon: 'pi-building-columns' },
  { label: 'Deuna', value: 'deuna', icon: 'pi-wallet' },
]);

const contractTypes = ref([
  { label: 'Indefinido', value: 'indefinite' },
  { label: 'Fijo', value: 'fixed' },
  { label: 'Por Obra o Labor', value: 'specific' },
]);

const selectedPaymentOption = ref<string | null>(null);

const goToStep = (step: number): void => {
  activeStep.value = step;
};

const finishProcess = (): void => {
  alert('¡Tu solicitud ha sido enviada!');
};

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

const onFormSubmit = (data: any): void => {
  console.log('Formulario enviado:', data);
};

const benefits = [
  {
    icon: 'pi-lock',
    title: 'Privacidad Garantizada',
    description: 'Tu información estará segura y solo accesible para propietarios aprobados por ti.',
  },
  {
    icon: 'pi-clock',
    title: 'Ahorra Tiempo',
    description: 'Llena una sola vez los documentos y postúlate a varias propiedades sin repetir el proceso.',
  },
  {
    icon: 'pi-camera',
    title: 'Valida tu Identidad',
    description: 'Spazio garantiza que eres una persona real, generando confianza entre los propietarios.',
  },
  {
    icon: 'pi-star',
    title: 'Construye tu Reputación',
    description: 'Tu historial de arriendos mejora tu reputación, lo que te da ventajas frente a propietarios.',
  },
  {
    icon: 'pi-check-circle',
    title: 'Proceso Simplificado',
    description: 'Tu información estará lista para futuros arrendamientos, simplificando el proceso.',
  },
];
</script>

<style>
.wanttorent-stepper .p-steppanel {
  @apply bg-transparent;
}
.wanttorent-stepper .p-inputtext {
  @apply border-primary-200 text-primary;
}
.wanttorent-stepper .p-inputtext::placeholder {
  color: var(--primary-color-200);
}
.payments-options {
  @apply relative flex flex-col items-center justify-center space-y-4 rounded-lg border p-4 text-center transition duration-300 ease-in-out;
}
.payments-options.selected {
  @apply border-solid border-primary text-primary-600;
}
</style>
