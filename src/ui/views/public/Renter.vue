<template>
  <Generic>
    <!-- Sección Principal -->
    <section class="bg-primary text-white h-screen px-12 flex items-center">
      <div class="flex">
        <div class="flex flex-col justify-evenly w-full md:w-2/5">
          <div class="flex flex-col">
            <Carousel v-bind="carouselConfig">
              <Slide>
                <div class="carousel__item">
                  <h1 class="text-7xl font-logo">Convierte tu arriendo en beneficios</h1>
                  <p class="text-2xl mt-6">
                    Disfruta de recompensas exclusivas por mantener tus pagos al día. Transformamos tu responsabilidad
                    en beneficios.
                  </p>
                </div>
              </Slide>
              <Slide>
                <div class="carousel__item">
                  <h1 class="text-7xl font-logo">Cada pago se convierte en puntos acumulables</h1>
                  <p class="">
                    Al pagar tu arriendo puntualmente, acumulas puntos que puedes usar para obtener premios. En Spazio,
                    cada transacción es una oportunidad para ganar.
                  </p>
                </div>
              </Slide>
              <Slide>
                <div class="carousel__item">
                  <h1 class="text-7xl font-logo">Canjea puntos por experiencias y productos exclusivos</h1>
                  <p class="">
                    Usa tus puntos para disfrutar de increíbles experiencias, servicios únicos y productos que se
                    ajustan a tu estilo de vida. ¡Tus pagos valen más con Spazio!
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

        <div
          class="w-full md:w-3/5 bg-primary relative flex flex-col justify-evenly items-center rounded-lg overflow-hidden">
          <!-- Fondo SVG -->
          <SVGShape shape="bgPerson" color="#FFFFFF" class="absolute inset-0 mx-auto w-3/5 t-4" />

          <!-- Imagen del inquilino -->
          <img src="@/assets/img/inquilino-feliz.png" alt="Inquilino feliz" class="relative w-3/4 z-10" />

          <!-- Cuadro de Texto -->
          <div class="bg-white text-primary rounded-lg shadow-md p-4 w-10/12 z-20 text-center">
            <p class="text-sm leading-snug">
              <span class="font-bold text-2xl block">José Padilla</span>
              <span class="text-xl">¡Acumula puntos por su pago del arriendo mensual!</span>
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
          En Spazio, creemos que pagar el arriendo no tiene que ser solo un gasto. Con nuestro programa de recompensas,
          cada pago puntual se convierte en puntos acumulables que puedes canjear por productos, servicios y
          experiencias exclusivas.
        </p>

        <div class="py-8 flex items-start space-x-6 border-b">
          <div class="border border-gray-600 flex items-center justify-center text-secondary rounded-full p-3 icon">
            <i class="pi pi-star" style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Gana puntos con tus pagos puntuales</h3>
            <p class="text-gray-700"
              >Cada vez que pagas a tiempo, acumulas puntos que puedes usar en experiencias y productos únicos.</p
            >
          </div>
        </div>

        <div class="py-8 flex items-start space-x-6 border-b">
          <div class="border border-gray-600 flex items-center justify-center text-secondary rounded-full p-3 icon">
            <i class="pi pi-cog" style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Canjea puntos por beneficios exclusivos</h3>
            <p class="text-gray-700">Transforma tus puntos en productos, servicios o experiencias diseñadas para ti.</p>
          </div>
        </div>

        <div class="pt-8 flex items-start space-x-6">
          <div class="border border-gray-600 flex items-center justify-center text-secondary rounded-full p-3 icon">
            <i class="pi pi-share-alt" style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Controla tus pagos de forma sencilla</h3>
            <p class="text-gray-700">Gestiona tus pagos con nuestra plataforma digital moderna y fácil de usar.</p>
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
  name: 'renter',
  components: { Generic, SVGShape, Checkbox, InputText, PVButton, Carousel, Slide, Pagination, Navigation, Timeline },
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
        title: 'Registro',
        description: 'Crea tu cuenta de inquilino en Spazio.',
        button: {
          text: 'Abrir registro',
          action: () => {
            console.log('Ver puntos / Iniciar sesión');
          },
        },
      },
      {
        title: 'Encuentra tu nuevo hogar',
        description:
          'Explora nuestra amplia oferta de propiedades y encuentra el lugar perfecto para ti. ¡Nuestros especialistas están aquí para ayudarte!',
        button: {
          text: 'contacta un agente',
          action: () => {
            console.log('Redirigiendo a la búsqueda de propiedades...');
          },
        },
      },
      {
        title: 'Paga como prefieras',
        description:
          'Realiza tus pagos de arriendo fácilmente con tarjeta de crédito, débito, transferencia bancaria o DeUna. ¡Tú eliges el método más conveniente!',
        button: {
          text: 'Conoce los métodos de pago',
          action: () => {
            console.log('Mostrando opciones de métodos de pago...');
            // Lógica para mostrar información sobre métodos de pago
          },
        },
      },
      {
        title: 'Acumula puntos con cada pago',
        description:
          'Por cada pago puntual de tu arriendo, acumulas puntos que puedes usar para experiencias, productos y servicios exclusivos.',
      },
      {
        title: 'Canjea recompensas',
        description: 'Disfruta de experiencias y premios únicos con tus puntos.',
        button: {
          text: 'Ver catálogo',
          action: () => {
            console.log('Ver catálogo');
          },
        },
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
