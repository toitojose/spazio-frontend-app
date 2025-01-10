<template>
  <Auth
    :title="$t('login.title')"
    :subtitle="$t('login.subtitle')">
    <LoginForm @loginSuccess="handleLoginSuccess" />
  </Auth>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Auth from '@/layout/public/auth/Auth.vue';

export default defineComponent({
  name: 'Login',
  components: {
    Auth,
  },
  setup() {
    const handleLoginSuccess = (payload: { user: any; token: any }) => {
      const { user, token } = payload;
      // gestiona el proceso luego de hacer login
      console.log('=>(Login.vue:22) user', user);
      console.log('=>(Login.vue:22) token', token);
    };
    return {
      handleLoginSuccess,
    };
  },
});
</script>

<style scoped>
.p-error {
  color: var(--aura-error);
  font-size: 0.875rem;
}
</style>
