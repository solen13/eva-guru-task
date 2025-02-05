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

const handelInput = (event) => {
  console.log(event);
  store.dispatch('register', event); // Vuex action çağrılıyor
};
</script>
