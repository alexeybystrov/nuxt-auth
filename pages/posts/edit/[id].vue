<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <PostForm
          :post="post"
          submit-label="Update Post"
          @submit="updatePost"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, navigateTo } from '#imports';
import PostForm from '~/components/PostForm.vue';
import { updatePostById } from '~/api';
import { usePostsStore } from '~/store/posts';
import type { Post } from '~/types/post';

definePageMeta({ middleware: ['auth'] });

const route = useRoute();
const postsStore = usePostsStore();
const post = ref<Partial<Post>>({});

const fetchPost = () => {
  const id = String(route.params.id);
  post.value = postsStore.getPostById(id) || {};
};

const updatePost = async (updatedPost: Partial<Post>) => {
  if (!post.value._id) return;

  await updatePostById(post.value._id, updatedPost);
  postsStore.clearPosts();
  navigateTo('/management');
};

onMounted(fetchPost);
</script>
