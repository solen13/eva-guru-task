<template>
  <div class="w-full flex justify-center items-center h-[70vh]">
    <auth-form :isRegister="false" @submit="handelInput" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authForm from '../components/from/auth-form/auth-form.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const handelInput = async (event) => {
  console.log('event', event);
  await store.dispatch('auth/login', event);
};
</script>

<style></style>
