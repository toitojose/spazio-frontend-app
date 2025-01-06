<template>
  <Generic>
    <!-- Sección Principal -->
    <section class="bg-primary-200 text-white h-screen px-12 py-10">
      <div class="flex justify-evenly">
        <div class="flex flex-col justify-evenly w-full md:w-2/5">
          <div class="flex flex-col">
            <Carousel v-bind="carouselConfig">
              <Slide>
                <div class="carousel__item">
                  <h1 class="text-7xl font-logo">Pagos Puntuales Garantizados</h1>
                  <p class="text-2xl mt-6">
                    Recibe los pagos de tus inquilinos de forma segura y a tiempo, sin complicaciones.
                  </p>
                </div>
              </Slide>
              <Slide>
                <div class="carousel__item">
                  <h1 class="text-7xl font-logo">Simplifica tu administración</h1>
                  <p class="text-2xl mt-6">
                    Gestiona tus propiedades de manera eficiente con herramientas diseñadas para propietarios exigentes.
                  </p>
                </div>
              </Slide>
              <Slide>
                <div class="carousel__item">
                  <h1 class="text-7xl font-logo">Tranquilidad y Confianza</h1>
                  <p class="text-2xl mt-6">
                    Confía en un sistema que fomenta la transparencia y facilita la gestión de contratos y pagos.
                  </p>
                </div>
              </Slide>

              <template #addons>
                <Pagination />
              </template>
            </Carousel>
          </div>
          <div class="text-center mt-4">
            <PVButton class="carousel-btn-white"> CREA TU CUENTA </PVButton>
            <p class="mt-2"> ¿Ya tienes tu cuenta? <a href="#" class="underline">Inicia sesión</a> </p>
          </div>
        </div>

        <div class="w-full md:w-1/2 relative flex flex-col justify-evenly items-center rounded-lg overflow-hidden">
          <!-- Fondo SVG -->
          <SVGShape shape="bgPerson" color="#FFFFFF" class="absolute inset-0 mx-auto w-3/5 t-4" />

          <!-- Imagen del inquilino -->
          <img src="@/assets/img/woman-happy.png" alt="Inquilino feliz" class="relative w-4/6 z-10" />

          <!-- Cuadro de Texto -->
          <div class="bg-white text-primary rounded-lg shadow-md p-4 w-10/12 z-20 text-center">
            <p class="text-sm leading-snug">
              <span class="font-bold text-2xl block">Andrea Villalba</span>
              <span class="text-xl">Disfruta de pagos puntuales y sin preocupaciones</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Explicativa -->

    <section id="transform" class="relative bg-white h-screen flex">
      <div class="hidden md:block bg-parallax-image bg-cover bg-no-repeat bg-img-inquilino-gana md:w-3/5 h-full"></div>
      <div class="relative w-full md:w-3/5 flex flex-col justify-center items-start px-8 md:px-12 text-left">
        <h2 class="text-5xl font-logo font-bold mb-6">¿Por qué Spazio es diferente?</h2>
        <p class="text-md mb-4">
          Sabemos que encontrar inquilinos puntuales puede ser agotador. Con Spazio, olvídate de insistir en los pagos o
          de vivir mes a mes esperando la renta. Nuestra plataforma automatiza todo el proceso, desde el cobro hasta la
          gestión, para que puedas enfocarte en disfrutar los frutos de tus propiedades sin estrés.
        </p>

        <div class="py-8 flex items-start space-x-6 border-b">
          <div class="border border-gray-600 flex items-center justify-center text-secondary rounded-full p-3 icon">
            <i class="pi pi-th-large" style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Gestión Centralizada</h3>
            <p class="text-gray-700">
              Accede a todos tus contratos, pagos y comunicaciones en un solo lugar, con tecnología avanzada y segura.
            </p>
          </div>
        </div>

        <div class="py-8 flex items-start space-x-6 border-b">
          <div class="border border-gray-600 flex items-center justify-center text-secondary rounded-full p-3 icon">
            <i class="pi pi-money-bill" style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Pagos Seguros y Puntuales</h3>
            <p class="text-gray-700"
              >Evita los retrasos y asegura tus ingresos con nuestro sistema automatizado de cobros.</p
            >
          </div>
        </div>

        <div class="pt-8 flex items-start space-x-6">
          <div class="border border-gray-600 flex items-center justify-center text-secondary rounded-full p-3 icon">
            <i class="pi pi-clock" style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Ahorro de Tiempo</h3>
            <p class="text-gray-700">
              Simplifica procesos complicados con herramientas diseñadas para optimizar tu tiempo y esfuerzo.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ¿Cómo funciona? -->
    <section class="bg-gray-900 p-8 text-center text-gray-200">
      <h2 class="text-3xl font-bold mb-10">¿Cómo funciona?</h2>
      <div class="flex w-1/2 mx-auto">
        <Timeline :value="steps" align="alternate" class="w-1/2 how-works">
          <!-- Marcador (número del paso) -->
          <template #marker="slotProps">
            <span class="flex w-10 h-10 items-center justify-center text-white rounded-full z-10 shadow-sm bg-primary">
              {{ slotProps.index + 1 }}
            </span>
          </template>

          <!-- Contenido del paso -->
          <template #content="slotProps">
            <div class="flex flex-col pb-10 content">
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
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import '@/assets/css/carousel-buyer-persona.css';

export default defineComponent({
  name: 'PropertyOwner',
  components: { Generic, SVGShape, Checkbox, InputText, PVButton, Carousel, Slide, Pagination, Navigation, Timeline },
  setup() {
    const checked1 = ref(true);
    const carouselConfig = {
      autoplay: 40000000,
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
</style>
