<template>
  <v-toolbar color="primary" dark>
    <v-toolbar-title class="mr-12">My App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="navigateTo('/about')">About</v-btn>
    <v-btn text @click="navigateTo('/account')">Account</v-btn>
    <v-btn text @click="handleLogout">Logout</v-btn>
  </v-toolbar>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const { logout } = useUserStore();

const handleLogout = () => {
  logout();
  navigateTo('/login');
};
</script>
