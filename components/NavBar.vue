<template>
  <v-toolbar color="primary" dark>
    <v-toolbar-title class="mr-12">My App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="handleMe">ME</v-btn>
    <v-btn @click="navigateTo('/')">Home</v-btn>
    <v-btn @click="navigateTo('/about')">About</v-btn>
    <v-btn @click="navigateTo('/posts')">Posts</v-btn>
    <v-btn @click="navigateTo('/account')">Account</v-btn>
    <v-btn @click="handleLogout">Logout</v-btn>
  </v-toolbar>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { getMeUser } from '~/api';

const { logout } = useUserStore();

const handleMe = async () => {
  const cookieUserId = useCookie('userId');
  const cookieToken = useCookie('token');

  if (cookieUserId.value && cookieToken.value) {
    try {
      await getMeUser({ userId: cookieUserId.value, token: cookieToken.value });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('something went wrong');
    }
  } else {
    // eslint-disable-next-line no-console
    console.error('user is not logged in');
  }
};

const handleLogout = () => {
  logout();
  navigateTo('/login');
};
</script>

<style scoped>
.v-toolbar {
  position: sticky;
  z-index: 1000;
  top: 0;
}
</style>
