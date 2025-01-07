<template>
  <Generic>
    <!-- Sección Principal -->
    <section class="h-screen bg-accent px-12 py-10 text-white">
      <div class="flex justify-evenly">
        <div class="flex w-full flex-col justify-evenly md:w-2/5">
          <div class="flex flex-col">
            <Carousel v-bind="carouselConfig">
              <Slide>
                <div class="carousel__item">
                  <h1 class="font-logo text-7xl">Pagos Puntuales Garantizados</h1>
                  <p class="mt-6 text-2xl">
                    Recibe los pagos de tus inquilinos de forma segura y a tiempo, sin complicaciones.
                  </p>
                </div>
              </Slide>
              <Slide>
                <div class="carousel__item">
                  <h1 class="font-logo text-7xl">Simplifica tu administración</h1>
                  <p class="mt-6 text-2xl">
                    Gestiona tus propiedades de manera eficiente con herramientas diseñadas para propietarios exigentes.
                  </p>
                </div>
              </Slide>
              <Slide>
                <div class="carousel__item">
                  <h1 class="font-logo text-7xl">Tranquilidad y Confianza</h1>
                  <p class="mt-6 text-2xl">
                    Confía en un sistema que fomenta la transparencia y facilita la gestión de contratos y pagos.
                  </p>
                </div>
              </Slide>

              <template #addons>
                <Pagination />
              </template>
            </Carousel>
          </div>
          <div class="mt-4 text-center">
            <PVButton class="carousel-btn-white"> CREA TU CUENTA </PVButton>
            <p class="mt-2">
              ¿Ya tienes tu cuenta?
              <a
                href="#"
                class="underline"
                >Inicia sesión</a
              >
            </p>
          </div>
        </div>

        <div class="relative flex w-full flex-col items-center justify-evenly overflow-hidden rounded-lg md:w-1/2">
          <!-- Fondo SVG -->
          <SVGShape
            shape="bgPerson"
            color="#FFFFFF"
            class="t-4 absolute inset-0 mx-auto w-3/5" />

          <!-- Imagen del inquilino -->
          <img
            src="@/assets/img/woman-happy.png"
            alt="Inquilino feliz"
            class="relative z-10 w-4/6" />

          <!-- Cuadro de Texto -->
          <div class="z-20 w-10/12 rounded-lg bg-white p-4 text-center text-primary shadow-md">
            <p class="text-sm leading-snug">
              <span class="block text-2xl font-bold">Andrea Villalba</span>
              <span class="text-xl">Disfruta de pagos puntuales y sin preocupaciones</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Explicativa -->
    <section
      id="transform"
      class="relative flex h-screen bg-white">
      <div class="bg-parallax-image bg-img-inquilino-gana hidden h-full bg-cover bg-no-repeat md:block md:w-3/5"></div>
      <div class="relative flex w-full flex-col items-start justify-center px-8 text-left md:w-3/5 md:px-12">
        <h2 class="mb-6 font-logo text-5xl font-bold">¿Por qué Spazio es diferente?</h2>
        <p class="text-md mb-4">
          Sabemos que encontrar inquilinos puntuales puede ser agotador. Con Spazio, olvídate de insistir en los pagos o
          de vivir mes a mes esperando la renta. Nuestra plataforma automatiza todo el proceso, desde el cobro hasta la
          gestión, para que puedas enfocarte en disfrutar los frutos de tus propiedades sin estrés.
        </p>

        <div class="flex items-start space-x-6 border-b py-8">
          <div class="icon flex items-center justify-center rounded-full border border-gray-600 p-3 text-secondary">
            <i
              class="pi pi-th-large"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-semibold">Gestión Centralizada</h3>
            <p class="text-gray-700">
              Accede a todos tus contratos, pagos y comunicaciones en un solo lugar, con tecnología avanzada y segura.
            </p>
          </div>
        </div>

        <div class="flex items-start space-x-6 border-b py-8">
          <div class="icon flex items-center justify-center rounded-full border border-gray-600 p-3 text-secondary">
            <i
              class="pi pi-money-bill"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-semibold">Pagos Seguros y Puntuales</h3>
            <p class="text-gray-700"
              >Evita los retrasos y asegura tus ingresos con nuestro sistema automatizado de cobros.</p
            >
          </div>
        </div>

        <div class="flex items-start space-x-6 pt-8">
          <div class="icon flex items-center justify-center rounded-full border border-gray-600 p-3 text-secondary">
            <i
              class="pi pi-clock"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-semibold">Ahorro de Tiempo</h3>
            <p class="text-gray-700">
              Simplifica procesos complicados con herramientas diseñadas para optimizar tu tiempo y esfuerzo.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ¿Cómo funciona? -->
    <section class="bg-gray-900 p-8 text-center text-gray-200">
      <h2 class="mb-10 text-3xl font-bold">¿Cómo funciona?</h2>
      <div class="mx-auto flex w-1/2">
        <Timeline
          :value="steps"
          align="alternate"
          class="how-works w-1/2">
          <!-- Marcador (número del paso) -->
          <template #marker="slotProps">
            <span
              class="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white shadow-sm">
              {{ slotProps.index + 1 }}
            </span>
          </template>

          <!-- Contenido del paso -->
          <template #content="slotProps">
            <div class="content flex flex-col pb-10">
              <h3 class="text-lg font-semibold">{{ slotProps.item.title }}</h3>
              <p class="text-sm">{{ slotProps.item.description }}</p>
              <PVButton
                v-if="slotProps.item.button"
                severity="secondary"
                size="small"
                class="my-4"
                @click="slotProps.item.button.action()">
                {{ slotProps.item.button.text }}
              </PVButton>
            </div>
          </template>
        </Timeline>
      </div>
    </section>
  </Generic>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SVGShape from '@/assets/models/SVGShape.vue';
import Generic from '@/layout/public/Generic.vue';
import { Checkbox, InputText, Timeline, Button as PVButton } from 'primevue';
import { Carousel, Slide, Pagination } from 'vue3-carousel';

export default defineComponent({
  name: 'PropertyOwner',
  components: { Generic, SVGShape, Checkbox, InputText, PVButton, Carousel, Slide, Pagination, Timeline },
  setup() {
    const checked1 = ref(true);
    const carouselConfig = {
      autoplay: 4000,
      itemsToShow: 1,
      wrapAround: true,
      pauseAutoplayOnHover: true,
    };

    const steps = ref([
      {
        title: 'Registro de Propiedad',
        description: 'Registra tu propiedad en la plataforma y accede a todas las herramientas disponibles.',
        button: {
          text: 'Registrar Propiedad',
          action: () => {
            console.log('Redirigiendo al registro de propiedad...');
          },
        },
      },
      {
        title: 'Configuración de Contratos Digitales',
        description:
          'Descarga y firma contratos fácilmente desde nuestra plataforma, asegurando rapidez y legalidad en cada proceso.',
      },
      {
        title: 'Automatización de Pagos',
        description: 'Habilita cobros automáticos para asegurar pagos puntuales.',
      },
      {
        title: 'Recibe tu Dinero Puntualmente',
        description:
          'No más esperas ni recordatorios. Spazio transfiere el pago directamente a tu cuenta en la fecha acordada.',
      },
    ]);

    return { checked1, carouselConfig, steps };
  },
});
</script>

<style scoped>
.bg-img-inquilino-gana {
  background-image: url('@/assets/img/inquilino-gana.jpg');
}
</style>
<style>
.how-works .p-timeline-event:nth-child(even) .p-timeline-event-content .content {
  align-items: flex-end;
}
.how-works .p-timeline-event:nth-child(odd) .p-timeline-event-content .content {
  align-items: flex-start;
}
.how-works .p-timeline-event:nth-child(even) {
  text-align: right;
}
.carousel__pagination-button::after {
  background-color: var(--accent-color-500);
}
.carousel__pagination-button--active::after {
  background-color: var(--white-color);
}
.carousel__pagination-button:hover::after {
  background-color: var(--accent-color-700);
}
</style>
