<template>
  <footer
    id="footer"
    class="items-left relative flex w-full items-end border-t border-t-gray-300/20 text-white">
    <div class="relative z-10 w-full bg-gray-900/90 p-6 backdrop-blur-sm">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Ubicación -->
        <BlockFooter
          title="Nuestra Ubicación"
          icon="pi-map-marker"
          class="block-footer"
          >Edificio Suyana,<br />
          Av. República de El Salvador N36-213 y,<br />
          Quito 170102, Ecuador</BlockFooter
        >

        <!-- Teléfono -->
        <BlockFooter
          title="Contáctanos"
          icon="pi-phone"
          class="block-footer"
          >WhatsApp:
          <a
            href="https://wa.me/593998665209"
            target="_blank"
            class="text-accent hover:underline"
            >+593 99 866 5209</a
          ></BlockFooter
        >

        <!-- Correo -->
        <BlockFooter
          title="Correo Electrónico"
          icon="pi-envelope"
          class="block-footer"
          >Escríbenos a:
          <a
            href="mailto:info@spazio.com.ec"
            class="text-accent hover:underline"
            >info@spazio.com.ec</a
          ></BlockFooter
        >
      </div>

      <!-- Separador -->
      <hr class="my-4 border-gray-300/20" />

      <!-- Créditos -->
      <div class="text-center">
        &copy; {{ new Date().getFullYear() }} <span class="sp-spazio-text-logo"></span> | Todos los derechos reservados.
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import BlockFooter from '@/components/public/footer/BlockFooter.vue';

export default defineComponent({
  name: 'FooterSpazio',
  components: { BlockFooter },
});
</script>

<style scoped>
.block-footer {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem 1rem;
  border-color: var(--p-primary-400);
}
.block-footer:not(:last-child) {
  border-bottom-width: 1px;
}
@media screen and (min-width: 768px) {
  .block-footer {
    border-bottom: none;
  }

  .block-footer:not(:last-child) {
    border-right: 1px solid var(--p-primary-400);
  }
}
/* border-l border-gray-300/20 pl-4 md:pl-8  */
</style>
