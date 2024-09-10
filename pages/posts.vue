<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Posts</h1>
        <p>{{ posts }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const posts = ref('some posts...');
</script>
