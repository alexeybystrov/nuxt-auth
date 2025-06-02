<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <PostForm :post="post" submit-label="Add Post" @submit="addPost" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import PostForm from '~/components/PostForm.vue';
import { createPost } from '~/api';
import { usePostsStore } from '~/store/posts';
import type { Post } from '~/types/post';

definePageMeta({ middleware: ['auth'] });

const postsStore = usePostsStore();

const post = ref<Partial<Post>>({
  title: '',
  description: '',
  imageUrl: '',
});

const addPost = async (newPost: Partial<Post>) => {
  await createPost(newPost);
  postsStore.clearPosts();
  navigateTo('/posts');
};
</script>
