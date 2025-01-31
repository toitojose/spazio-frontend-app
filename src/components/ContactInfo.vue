<template>
  <section class="px-6 py-4 text-sm">
    <h2 class="mb-4 text-center text-xl font-bold">¡Hablemos!</h2>
    <p class="mb-8 text-center text-sm">
      Estamos aquí para ayudarte en todo momento. Contáctanos por el medio que prefieras.
    </p>
    <div class="items-left relative flex w-full items-end border-t border-t-gray-300/20 lg:pl-20">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Ubicación -->
        <BlockFooter
          class="!border-r-gray-300"
          title="Nuestra Ubicación"
          icon="pi-map-marker">
          Edificio Suyana,<br />
          Av. República de El Salvador N36-213 y,<br />
          Quito 170102, Ecuador
        </BlockFooter>

        <!-- Teléfono -->
        <BlockFooter
          class="!border-r-gray-300"
          title="Contáctanos"
          icon="pi-phone">
          WhatsApp:
          <a
            href="https://wa.me/593998665209"
            target="_blank"
            class="text-accent hover:underline">
            +593 99 866 5209
          </a>
        </BlockFooter>

        <!-- Correo -->
        <BlockFooter
          title="Correo Electrónico"
          icon="pi-envelope">
          Escríbenos a:
          <a
            href="mailto:info@spazio.com.ec"
            class="text-accent hover:underline">
            info@spazio.com.ec
          </a>
        </BlockFooter>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import BlockFooter from '@/components/public/footer/BlockFooter.vue';
</script>
<style scoped></style>
