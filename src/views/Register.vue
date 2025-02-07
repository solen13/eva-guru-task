<template>
  <div class="w-full flex justify-center items-center h-[70vh]">
    <auth-form :isRegister="true" @submit="handelInput" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authForm from '../components/from/auth-form/auth-form.vue';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const handelInput = (event: any) => {
  store.dispatch('auth/register', event);
};
</script>
