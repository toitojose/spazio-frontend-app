<template>
  <Auth
    :title="$t('login.title')"
    :subtitle="$t('login.subtitle')">
    <LoginForm @loginSuccess="handleLoginSuccess" />
  </Auth>
</template>

<script setup lang="ts">
import Auth from '@/layout/public/auth/Auth.vue';
import LoginForm from '@/components/public/auth/LoginForm.vue';

const handleLoginSuccess = (payload: { user: any; token: any }) => {
  const { user, token } = payload;
  // gestiona el proceso luego de hacer login
  console.log('=>(Login.vue:22) user', user);
  console.log('=>(Login.vue:22) token', token);
};
</script>
