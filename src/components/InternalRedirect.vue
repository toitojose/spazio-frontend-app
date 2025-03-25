<template>
    <div>
        <div v-if="isAdmin">
            <Message
                severity="success"
                class="mb-4">
                ¡Hola, <span class="font-semibold">{{ firstName }}!</span> <br />
                Has iniciado sesión, ahora puedes seguir explorando ..........
            </Message>
            <Button
                size="small"
                :label="$t('login.loginGoogle')"
                icon="pi pi-google"
                class="w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                @click="redirect()" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue';
  import { useUserStore } from '@/store/user.ts';
  import { useRouter } from 'vue-router';
  import { Button, Message } from 'primevue';
  
  const userStore = useUserStore();
  const router = useRouter();
  const isAdmin = computed(() => userStore.isAdmin());
  const firstName = computed(() => userStore.userFirstName);

  const redirect = () => {
    router.push('/admin');
    return;
  }
</script>
  
<style scoped></style>
  