<template>
  <Generic>
    <!-- Sección Principal -->
    <section class="items-center bg-secondary px-12 text-white lg:flex lg:h-screen">
      <div class="flex">
        <div class="flex w-full flex-col justify-evenly md:w-2/5">
          <div class="flex flex-col">
            <Carousel v-bind="carouselConfig">
              <Slide>
                <div class="carousel__item">
                  <h1 class="font-logo text-6xl">Convierte tu arriendo en beneficios</h1>
                  <p class="mt-6 text-2xl">
                    Disfruta de recompensas exclusivas por mantener tus pagos al día. Transformamos tu responsabilidad
                    en beneficios.
                  </p>
                </div>
              </Slide>
              <Slide>
                <div class="carousel__item">
                  <h1 class="font-logo text-6xl">Cada pago se convierte en puntos acumulables</h1>
                  <p class="">
                    Al pagar tu arriendo puntualmente, acumulas puntos que puedes usar para obtener premios. En Spazio,
                    cada transacción es una oportunidad para ganar.
                  </p>
                </div>
              </Slide>
              <Slide>
                <div class="carousel__item">
                  <h1 class="font-logo text-6xl">Canjea puntos por experiencias y productos exclusivos</h1>
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
          <div class="mt-4 text-center">
            <PVButton class="bg-white"> Crea tu cuenta </PVButton>
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

        <div class="relative flex w-full flex-col items-center justify-evenly overflow-hidden rounded-lg md:w-3/5">
          <!-- Fondo SVG -->
          <SVGShape
            shape="bgPerson"
            color="#FFFFFF"
            class="t-4 absolute inset-0 mx-auto w-3/5" />

          <!-- Imagen del inquilino -->
          <img
            src="@/assets/img/inquilino-feliz.png"
            alt="Inquilino feliz"
            class="relative z-10 w-3/4" />

          <!-- Cuadro de Texto -->
          <div class="z-20 w-10/12 rounded-lg bg-white p-4 text-center text-primary shadow-md">
            <p class="text-sm leading-snug">
              <span class="block text-2xl font-bold">José Luis García</span>
              <span class="text-xl">¡Recibe premios por su pago del arriendo mensual!</span>
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
          En Spazio, creemos que pagar el arriendo no tiene que ser solo un gasto. Con nuestro programa de recompensas,
          cada pago puntual se convierte en puntos acumulables que puedes canjear por productos, servicios y
          experiencias exclusivas.
        </p>

        <div class="flex items-start space-x-6 border-b py-8">
          <div class="icon flex items-center justify-center rounded-full border border-gray-600 p-3 text-secondary">
            <i
              class="pi pi-star"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-semibold">Gana puntos con tus pagos puntuales</h3>
            <p class="text-gray-700"
              >Cada vez que pagas a tiempo, acumulas puntos que puedes usar en experiencias y productos únicos.</p
            >
          </div>
        </div>

        <div class="flex items-start space-x-6 border-b py-8">
          <div class="icon flex items-center justify-center rounded-full border border-gray-600 p-3 text-secondary">
            <i
              class="pi pi-cog"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-semibold">Canjea puntos por beneficios exclusivos</h3>
            <p class="text-gray-700">Transforma tus puntos en productos, servicios o experiencias diseñadas para ti.</p>
          </div>
        </div>

        <div class="flex items-start space-x-6 pt-8">
          <div class="icon flex items-center justify-center rounded-full border border-gray-600 p-3 text-secondary">
            <i
              class="pi pi-share-alt"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-semibold">Controla tus pagos de forma sencilla</h3>
            <p class="text-gray-700">Gestiona tus pagos con nuestra plataforma digital moderna y fácil de usar.</p>
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
.carousel__pagination-button::after {
  background-color: var(--light-surface-500);
}
.carousel__pagination-button--active::after {
  background-color: var(--white-color);
}
.carousel__pagination-button:hover::after {
  background-color: var(--light-surface-800);
}
</style>
