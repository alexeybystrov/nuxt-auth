<template>
  <v-card class="mx-auto my-12 px-6 py-8 elevation-12" max-width="374">
    <v-form v-model="isFormValid" @submit.prevent="onSubmit">
      <v-text-field
        v-model="username"
        :rules="[required]"
        :readonly="isLoading"
        class="mb-2"
        label="Username"
        type="text"
        placeholder="username"
      />

      <v-text-field
        v-model="password"
        :rules="[required]"
        :readonly="isLoading"
        class="mb-2"
        label="Password"
        type="password"
      />

      <v-text-field
        v-if="isRegister"
        v-model="confirmPassword"
        :rules="[required]"
        :readonly="isLoading"
        label="Confirm Password"
        type="password"
      />

      <div class="text-red">{{ errorMessage }}</div>

      <v-btn
        :disabled="!isFormValid"
        :loading="isLoading"
        class="mt-2"
        color="primary"
        size="large"
        type="submit"
        variant="elevated"
        block
      >
        {{ buttonLabel }}
      </v-btn>

      <div class="text-blue mt-4" @click="isRegister = !isRegister">
        {{ footerMessage }}
      </div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const isFormValid = ref(false);

const username = ref('');

const password = ref('');

const confirmPassword = ref('');

const isRegister = ref(false);

const errorMessage = ref('');

const isLoading = ref(false);

const buttonLabel = computed(() => (isRegister.value ? 'Register' : 'Login'));

const footerMessage = computed(() =>
  isRegister.value ? 'Aleady have an Acoount? login.' : 'Register',
);

const required = (v: any) => !!v || 'Field is required';

const onSubmit = () => {
  if (!isFormValid.value || isLoading.value) return;

  isRegister.value ? register() : login();
};

const login = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    await userStore.login({
      username: username.value,
      password: password.value,
    });
    navigateTo('/account');
  } catch (error) {
    errorMessage.value = (error as Error).message;
  } finally {
    isLoading.value = false;
  }
};

const register = async () => {
  if (password.value === confirmPassword.value) {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      await userStore.register({
        username: username.value,
        password: password.value,
      });
      navigateTo('/account');
    } catch (error) {
      errorMessage.value = (error as Error).message;
    } finally {
      isLoading.value = false;
    }
  } else {
    errorMessage.value = 'password did not match';
  }
};
</script>
