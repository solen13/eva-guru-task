<template>
  <div
    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
      >
        {{ isRegister ? 'Kayıt ol' : 'Giriş yap' }}
      </h1>
      <form @submit.prevent="submitForm" class="space-y-4 md:space-y-6">
        <div v-if="isRegister">
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Kullanıcı adı</label
          >
          <input
            type="text"
            v-model="userName"
            :class="{ 'border border-red-900': isUserName }"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="doe jack"
          />
        </div>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email Giriniz</label
          >
          <input
            type="email"
            v-model="email"
            :class="{ 'border border-red-900': isErrEmail }"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Şifre</label
          >
          <input
            type="password"
            v-model="password"
            placeholder="••••••••"
            :class="{ 'border border-red-900': isErrPasw }"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div v-if="!isRegister" class="flex justify-end">
            <a href="/sifreyi-unutum" class="text-[#2530ff] text-sm"
              >Şifreyimi Unutunuz?</a
            >
          </div>
        </div>
        <div v-if="isRegister">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Şifre Tekrar</label
          >
          <input
            type="password"
            v-model="confirmPassword"
            :class="{ 'border border-red-900': isErrConfirmPass }"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p v-if="isErrConfirmPass" class="text-red-500 text-sm mt-1">
            Şifreler uyuşmuyor!
          </p>
        </div>
        <button
          type="submit"
          class="w-full border border-gray-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {{ isRegister ? 'Kayıt' : 'Giriş' }}
        </button>

        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          {{ isRegister ? ' Hesabınız varmı ?' : 'Hesabınız yokmu ?' }}
          <a
            :href="isRegister ? '/' : '/register'"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            {{ isRegister ? ' Giriş yap' : 'Hesap Oluşur' }}</a
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';

const props = defineProps<{ isRegister: boolean }>();

const emit = defineEmits(['submit']);

const email = ref<string | null>(null);
const password = ref<string | null>(null);
const confirmPassword = ref<string | null>(null);
const userName = ref<string | null>(null);

const isEmailTouched = ref(false);
const isUserNameTouched = ref(false);
const isPasswordTouched = ref(false);
const isConfirmPasswordTouched = ref(false);

const isErrEmail = computed(() => isEmailTouched.value && !email.value?.trim());
const isUserName = computed(
  () => isUserNameTouched.value && !userName.value?.trim()
);
const isErrPasw = computed(
  () => isPasswordTouched.value && !password.value?.trim()
);
const isErrConfirmPass = computed(
  () =>
    isConfirmPasswordTouched.value && password.value !== confirmPassword.value
);

const submitForm = () => {
  isEmailTouched.value = true;
  isPasswordTouched.value = true;

  if (props.isRegister) {
    isUserNameTouched.value = true;
    isConfirmPasswordTouched.value = true;

    if (
      !userName.value?.trim() ||
      !email.value?.trim() ||
      !password.value?.trim() ||
      !confirmPassword.value?.trim()
    ) {
      console.log('Lütfen tüm alanları doldurun!');
      return;
    }

    if (password.value !== confirmPassword.value) {
      console.log('Şifreler uyuşmuyor!');
      return;
    }
  } else {
    if (!email.value?.trim() || !password.value?.trim()) {
      console.log('Lütfen tüm alanları doldurun!');
      return;
    }
  }

  emit('submit', {
    userName: userName.value,
    email: email.value,
    password: password.value,
  });
};
</script>

<style></style>
