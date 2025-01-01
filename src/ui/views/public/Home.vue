<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-cover bg-center bg-img">
      <div class="h-screen flex items-center">
        <div class="w-1/3 ml-20 text-center p-8 text-black">
          <h1 class="font-logo text-5xl font-bold mb-4">SPAZIO</h1>
          <p class="text-xl mb-4">Llegamos para iluminar el camino<br />hacia tu nuevo hogar</p>
          <p class="text-lg mb-8">
            <span ref="typedText"></span>
          </p>
          <Button label="Ingresar" icon="pi pi-lock" iconPos="right" severity="secondary" @click="goToLogin" />
        </div>
      </div>
    </div>

    <!-- Conexión con el público -->
    <div class="bg-gray-100 py-20">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-8">¿Te has preguntado por qué el arriendo tiene que ser solo un gasto?</h2>
        <p class="text-lg leading-relaxed mb-8">
          En Spazio creemos que tus pagos de arriendo pueden ser mucho más que una simple transacción. Imagina ganar beneficios mientras aseguras tu hogar. No se trata solo de
          pagar, se trata de transformar la manera en que inquilinos y propietarios interactúan. Bienvenido a un sistema que crea valor real para todos.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card class="shadow-md">
            <template #header>
              <h3 class="text-xl font-semibold mb-2">¿Pagas puntualmente?</h3>
            </template>
            <p>Ahora, tus pagos a tiempo te recompensan con experiencias únicas y beneficios exclusivos.</p>
          </Card>
          <Card class="shadow-md">
            <template #header>
              <h3 class="text-xl font-semibold mb-2">¿Eres propietario?</h3>
            </template>
            <p>Con Spazio, recibirás pagos seguros y simplificarás la gestión de tus propiedades.</p>
          </Card>
          <Card class="shadow-md">
            <template #header>
              <h3 class="text-xl font-semibold mb-2">¿Representas una empresa?</h3>
            </template>
            <p>Únete a nuestra red de aliados y conecta con una comunidad comprometida.</p>
          </Card>
        </div>
      </div>
    </div>

    <!-- El poder de transformar -->
    <div class="relative bg-white py-20">
      <div class="parallax bg-parallax-image"></div>
      <div class="relative max-w-6xl mx-auto my-7 px-4 text-center">
        <h2 class="text-4xl font-bold mb-8">Porque creemos en el poder de transformar</h2>
        <p class="text-lg mb-4">
          Creemos que cada pago puede ser un paso hacia una experiencia más rica, que inquilinos y propietarios merecen una relación basada en confianza, y que juntos podemos
          redefinir cómo vemos el mercado inmobiliario.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Card class="shadow-md">
            <template #header>
              <h3 class="text-xl font-semibold mb-2">Incentivamos lo mejor</h3>
            </template>
            <p>Recompensamos la puntualidad para crear hábitos positivos y generar bienestar.</p>
          </Card>
          <Card class="shadow-md">
            <template #header>
              <h3 class="text-xl font-semibold mb-2">Simplificamos lo complejo</h3>
            </template>
            <p>Automatizamos procesos para que puedas enfocarte en lo que realmente importa.</p>
          </Card>
          <Card class="shadow-md">
            <template #header>
              <h3 class="text-xl font-semibold mb-2">Creamos conexiones</h3>
            </template>
            <p>Fomentamos relaciones duraderas y de confianza entre todas las partes.</p>
          </Card>
        </div>
      </div>
    </div>

    <!-- Beneficios -->
    <div class="bg-gray-100 py-20">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-8">Beneficios: Más que solo resultados</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card class="shadow-md">
            <template #header>
              <h3 class="text-xl font-semibold mb-2">Construimos confianza</h3>
            </template>
            <p>Ayudamos a que inquilinos y propietarios vivan una experiencia transparente y sin fricciones.</p>
          </Card>
          <Card class="shadow-md">
            <template #header>
              <h3 class="text-xl font-semibold mb-2">Recompensas que motivan</h3>
            </template>
            <p>Creamos un sistema de recompensas que premia la puntualidad y genera valor real.</p>
          </Card>
          <Card class="shadow-md">
            <template #header>
              <h3 class="text-xl font-semibold mb-2">Impulsamos tu tranquilidad</h3>
            </template>
            <p>Automatizamos procesos para que tengas tiempo para lo importante: disfrutar tu hogar.</p>
          </Card>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-primary text-white py-20">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-8">Únete a Spazio</h2>
        <p class="text-lg mb-8">Sé parte de la revolución del mercado de arriendos. Regístrate gratis y comienza a transformar tus pagos en beneficios hoy mismo.</p>
        <Button label="Regístrate Gratis" class="bg-secondary hover:bg-secondary-dark" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Typed from 'typed.js';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    Card,
    Button,
  },
  setup() {
    const typedText = ref<HTMLElement | null>(null);
    const router = useRouter();

    const goToLogin = () => {
      router.push('/login');
    };

    onMounted(() => {
      new Typed(typedText.value, {
        strings: ['Transformamos espacios en hogares.', 'Un espacio para ti.'],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true,
      });
    });

    return {
      typedText,
      goToLogin,
    };
  },
});
</script>
<style scoped>
.bg-img {
  background-image: url('@/assets/img/luz.jpg');
}
.bg-parallax-image {
  background-image: url('@/assets/img/2.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 400px;
}
.bg-primary {
  background-color: #00ada8;
}
.bg-secondary {
  background-color: #e40085;
}
.bg-secondary-dark {
  background-color: #c2006f;
}
</style>
