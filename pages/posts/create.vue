<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-form @submit.prevent="addPost">
          <v-text-field v-model="post.title" label="Title" required />
          <v-textarea v-model="post.description" label="Description" required />
          <v-text-field v-model="post.imageUrl" label="Image URL" required />
          <v-btn type="submit" color="primary">Add Post</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { createPost } from '~/api';
import type { Post } from '~/types/post';

definePageMeta({
  middleware: ['auth'],
});

const post = ref<Partial<Post>>({
  title: '',
  description: '',
  imageUrl: '',
});

const addPost = async () => {
  await createPost(post.value);
  navigateTo('/posts');
};
</script>
